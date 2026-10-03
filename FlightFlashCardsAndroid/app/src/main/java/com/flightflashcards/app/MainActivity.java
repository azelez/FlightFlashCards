package com.flightflashcards.app;

import android.Manifest;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.util.Log;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private static final int PERMISSION_REQ_RECORD_AUDIO = 101;
    private static final int PERMISSION_REQ_POST_NOTIFICATIONS = 102;

    private WebView webView;
    private TextToSpeech textToSpeech;
    private SpeechRecognizer speechRecognizer;
    private Intent speechRecognizerIntent;
    private boolean isListening = false;
    private boolean isCarModeActive = false;
    private boolean isTtsInitialized = false;
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Keep screen on continuously while app is open
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        setContentView(R.layout.activity_main);

        ReminderScheduler.createNotificationChannel(this);

        initTTS();
        initSpeechRecognizer();
        checkAndRequestPermissions();

        webView = findViewById(R.id.webView);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setBuiltInZoomControls(false);
        webSettings.setSupportZoom(true);
        webSettings.setLoadsImagesAutomatically(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                MainActivity.this.runOnUiThread(() -> request.grant(request.getResources()));
            }
        });

        webView.setWebViewClient(new WebViewClient());
        webView.addJavascriptInterface(new WebAppInterface(), "AndroidBridge");
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void checkAndRequestPermissions() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO}, PERMISSION_REQ_RECORD_AUDIO);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.POST_NOTIFICATIONS}, PERMISSION_REQ_POST_NOTIFICATIONS);
            }
        }
    }

    private void initTTS() {
        textToSpeech = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int result = textToSpeech.setLanguage(Locale.US);
                if (result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                    Log.w(TAG, "TTS Language not supported");
                } else {
                    isTtsInitialized = true;
                    textToSpeech.setPitch(1.0f);
                    textToSpeech.setSpeechRate(0.95f);
                    textToSpeech.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                        @Override
                        public void onStart(String utteranceId) {
                            sendJsEvent("onTtsStateChange", "speaking");
                        }

                        @Override
                        public void onDone(String utteranceId) {
                            sendJsEvent("onTtsStateChange", "idle");
                            // Resume voice listening if car mode is active
                            mainHandler.post(() -> {
                                if (isCarModeActive) {
                                    startListeningInternal();
                                }
                            });
                        }

                        @Override
                        public void onError(String utteranceId) {
                            sendJsEvent("onTtsStateChange", "idle");
                            mainHandler.post(() -> {
                                if (isCarModeActive) {
                                    startListeningInternal();
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    private void initSpeechRecognizer() {
        if (!SpeechRecognizer.isRecognitionAvailable(this)) {
            Log.w(TAG, "SpeechRecognizer not available on this device");
            return;
        }

        mainHandler.post(() -> {
            try {
                if (speechRecognizer != null) {
                    speechRecognizer.destroy();
                }
                speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
                speechRecognizerIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.US.toString());
                speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
                speechRecognizerIntent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3);

                speechRecognizer.setRecognitionListener(new RecognitionListener() {
                    @Override
                    public void onReadyForSpeech(Bundle params) {
                        isListening = true;
                        sendJsEvent("onVoiceStateChange", "listening");
                    }

                    @Override
                    public void onBeginningOfSpeech() {
                        sendJsEvent("onVoiceStateChange", "hearing");
                    }

                    @Override
                    public void onRmsChanged(float rmsdB) {}

                    @Override
                    public void onBufferReceived(byte[] buffer) {}

                    @Override
                    public void onEndOfSpeech() {
                        sendJsEvent("onVoiceStateChange", "processing");
                    }

                    @Override
                    public void onError(int error) {
                        isListening = false;
                        Log.d(TAG, "Speech recognition error code: " + error);
                        if (isCarModeActive) {
                            // Automatically restart listening after transient timeout / no match
                            mainHandler.postDelayed(() -> {
                                if (isCarModeActive && (textToSpeech == null || !textToSpeech.isSpeaking())) {
                                    startListeningInternal();
                                }
                            }, 400);
                        } else {
                            sendJsEvent("onVoiceStateChange", "idle");
                        }
                    }

                    @Override
                    public void onResults(Bundle results) {
                        isListening = false;
                        ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                        if (matches != null && !matches.isEmpty()) {
                            boolean handled = false;
                            for (String match : matches) {
                                if (match != null && !match.trim().isEmpty()) {
                                    String recognizedText = match.toLowerCase(Locale.ROOT).trim();
                                    Log.d(TAG, "Speech candidate match: " + recognizedText);
                                    if (handleRecognizedCommand(recognizedText)) {
                                        handled = true;
                                        break;
                                    }
                                }
                            }
                        }

                        if (isCarModeActive) {
                            mainHandler.postDelayed(() -> {
                                if (isCarModeActive && (textToSpeech == null || !textToSpeech.isSpeaking())) {
                                    startListeningInternal();
                                }
                            }, 350);
                        }
                    }

                    @Override
                    public void onPartialResults(Bundle partialResults) {
                        ArrayList<String> matches = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                        if (matches != null && !matches.isEmpty()) {
                            for (String partial : matches) {
                                if (partial != null && !partial.trim().isEmpty()) {
                                    String partialText = partial.toLowerCase(Locale.ROOT).trim();
                                    if (checkQuickPartialCommand(partialText)) {
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    @Override
                    public void onEvent(int eventType, Bundle params) {}
                });
            } catch (Exception e) {
                Log.e(TAG, "Error initializing SpeechRecognizer", e);
            }
        });
    }

    private long lastCommandTimestamp = 0;
    private String lastCommandTriggered = "";

    private boolean checkQuickPartialCommand(String text) {
        String cmd = matchVoiceCommand(text);
        if (cmd != null) {
            return executeCommandDebounced(cmd);
        }
        return false;
    }

    private boolean handleRecognizedCommand(String rawText) {
        String cmd = matchVoiceCommand(rawText);
        if (cmd != null) {
            return executeCommandDebounced(cmd);
        }
        return false;
    }

    private boolean executeCommandDebounced(String cmd) {
        long now = System.currentTimeMillis();
        if (cmd.equals(lastCommandTriggered) && (now - lastCommandTimestamp < 650)) {
            // Debounce duplicate rapid trigger
            return false;
        }
        lastCommandTimestamp = now;
        lastCommandTriggered = cmd;
        sendJsEvent("onVoiceCommand", cmd);
        return true;
    }

    private String matchVoiceCommand(String text) {
        if (text == null || text.isEmpty()) return null;
        String clean = text.toLowerCase(Locale.ROOT).trim().replaceAll("[^a-z0-9\\s]", " ");
        String[] words = clean.split("\\s+");

        // 1. Check FLIP and phonetic/similar variants
        for (String w : words) {
            if (isFlipVariant(w)) return "flip";
        }
        if (clean.contains("flip") || clean.contains("turn") || clean.contains("answer") ||
            clean.contains("show") || clean.contains("reveal") || clean.contains("other side") ||
            clean.contains("back side") || clean.contains("card back") || clean.contains("what is the") ||
            clean.contains("tell me") || clean.contains("what's the") || clean.contains("switch")) {
            return "flip";
        }

        // 2. Check NEXT and synonyms
        for (String w : words) {
            if (isNextVariant(w)) return "next";
        }
        if (clean.contains("next") || clean.contains("forward") || clean.contains("skip") ||
            clean.contains("continue") || clean.contains("advance") || clean.contains("go ahead") ||
            clean.contains("move on") || clean.contains("pass") || clean.contains("next one")) {
            return "next";
        }

        // 3. Check PREVIOUS and synonyms
        for (String w : words) {
            if (isPrevVariant(w)) return "previous";
        }
        if (clean.contains("previous") || clean.contains("back") || clean.contains("prev") ||
            clean.contains("last") || clean.contains("prior") || clean.contains("before") ||
            clean.contains("go back") || clean.contains("rewind") || clean.contains("last one")) {
            return "previous";
        }

        // 4. Check REPEAT and synonyms
        for (String w : words) {
            if (isRepeatVariant(w)) return "repeat";
        }
        if (clean.contains("repeat") || clean.contains("again") || clean.contains("say again") ||
            clean.contains("read again") || clean.contains("one more time") || clean.contains("pardon") ||
            clean.contains("what did you say") || clean.contains("read that")) {
            return "repeat";
        }

        // 5. Check KNOWN / REVIEW
        for (String w : words) {
            if (w.equals("know") || w.equals("knew") || w.equals("known") || w.equals("easy") || w.equals("correct") || w.equals("passed") || w.equals("got")) return "known";
            if (w.equals("review") || w.equals("hard") || w.equals("study") || w.equals("missed") || w.equals("wrong") || w.equals("need")) return "review";
        }
        if (clean.contains("i know") || clean.contains("i knew") || clean.contains("got it") || clean.contains("knew it")) return "known";
        if (clean.contains("need review") || clean.contains("review later") || clean.contains("mark review")) return "review";

        return null;
    }

    private boolean isFlipVariant(String w) {
        if (w.equals("flip") || w.equals("flips") || w.equals("flipping") || w.equals("flipped") ||
            w.equals("clip") || w.equals("clips") || w.equals("slip") || w.equals("slips") ||
            w.equals("flick") || w.equals("flicks") || w.equals("flit") || w.equals("flop") ||
            w.equals("flup") || w.equals("fleep") || w.equals("frip") || w.equals("plip") ||
            w.equals("blip") || w.equals("phlip") || w.equals("lip") || w.equals("whip") ||
            w.equals("drip") || w.equals("trip") || w.equals("strip") || w.equals("slit") ||
            w.equals("fly") || w.equals("fip") || w.equals("flipp")) {
            return true;
        }
        if (w.length() >= 3 && w.length() <= 5) {
            if (w.startsWith("fl") && (w.endsWith("p") || w.endsWith("k") || w.endsWith("t"))) return true;
            if (w.startsWith("f") && w.endsWith("ip")) return true;
            if (levenshteinDistance(w, "flip") <= 1) return true;
        }
        return false;
    }

    private boolean isNextVariant(String w) {
        if (w.equals("next") || w.equals("nex") || w.equals("neck") || w.equals("necks") ||
            w.equals("nest") || w.equals("nicks") || w.equals("nxt") || w.equals("skip") ||
            w.equals("forward") || w.equals("advance") || w.equals("pass") || w.equals("nxt")) {
            return true;
        }
        if (w.length() >= 3 && w.length() <= 5 && levenshteinDistance(w, "next") <= 1) {
            return true;
        }
        return false;
    }

    private boolean isPrevVariant(String w) {
        return w.equals("previous") || w.equals("prev") || w.equals("back") || w.equals("prior") || w.equals("last");
    }

    private boolean isRepeatVariant(String w) {
        return w.equals("repeat") || w.equals("again") || w.equals("replay") || w.equals("reread");
    }

    private int levenshteinDistance(String a, String b) {
        int[] costs = new int[b.length() + 1];
        for (int j = 0; j < costs.length; j++) costs[j] = j;
        for (int i = 1; i <= a.length(); i++) {
            costs[0] = i;
            int nw = i - 1;
            for (int j = 1; j <= b.length(); j++) {
                int cj = Math.min(1 + Math.min(costs[j], costs[j - 1]),
                        a.charAt(i - 1) == b.charAt(j - 1) ? nw : nw + 1);
                nw = costs[j];
                costs[j] = cj;
            }
        }
        return costs[b.length()];
    }

    private void startListeningInternal() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO}, PERMISSION_REQ_RECORD_AUDIO);
            return;
        }

        mainHandler.post(() -> {
            try {
                if (speechRecognizer == null) {
                    initSpeechRecognizer();
                }
                if (speechRecognizer != null && !isListening) {
                    speechRecognizer.cancel();
                    speechRecognizer.startListening(speechRecognizerIntent);
                    isListening = true;
                }
            } catch (Exception e) {
                Log.e(TAG, "Error in startListeningInternal", e);
                isListening = false;
            }
        });
    }

    private void stopListeningInternal() {
        mainHandler.post(() -> {
            try {
                if (speechRecognizer != null) {
                    speechRecognizer.cancel();
                }
            } catch (Exception e) {
                Log.e(TAG, "Error in stopListeningInternal", e);
            }
            isListening = false;
            sendJsEvent("onVoiceStateChange", "idle");
        });
    }

    private void sendJsEvent(String functionName, String arg) {
        mainHandler.post(() -> {
            if (webView != null) {
                String safeArg = arg.replace("'", "\\'");
                webView.evaluateJavascript("if(window." + functionName + ") { window." + functionName + "('" + safeArg + "'); }", null);
            }
        });
    }

    public class WebAppInterface {
        @JavascriptInterface
        public boolean isNativeApp() {
            return true;
        }

        @JavascriptInterface
        public void speak(String text) {
            mainHandler.post(() -> {
                // Pause recognition during speech
                stopListeningInternal();
                if (textToSpeech != null && isTtsInitialized) {
                    Bundle params = new Bundle();
                    params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "card_utterance");
                    textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, params, "card_utterance");
                }
            });
        }

        @JavascriptInterface
        public void stopSpeaking() {
            stopSpeakingInternal();
        }

        @JavascriptInterface
        public void setCarMode(boolean active) {
            isCarModeActive = active;
            if (active) {
                mainHandler.post(() -> startListeningInternal());
            } else {
                mainHandler.post(() -> {
                    stopListeningInternal();
                    stopSpeakingInternal();
                });
            }
        }

        @JavascriptInterface
        public void startVoiceRecognition() {
            isCarModeActive = true;
            mainHandler.post(() -> startListeningInternal());
        }

        @JavascriptInterface
        public void stopVoiceRecognition() {
            isCarModeActive = false;
            mainHandler.post(() -> stopListeningInternal());
        }

        @JavascriptInterface
        public void scheduleReminder(int hour, int minute, String daysJson, String title, String message, boolean enabled) {
            ReminderScheduler.saveAndSchedule(MainActivity.this, hour, minute, daysJson, title, message, enabled);
            MainActivity.this.runOnUiThread(() -> {
                String status = enabled ? "Reminder scheduled successfully!" : "Reminders disabled.";
                Toast.makeText(MainActivity.this, status, Toast.LENGTH_SHORT).show();
            });
        }

        @JavascriptInterface
        public String getReminderSettings() {
            return ReminderScheduler.getSettingsJson(MainActivity.this);
        }

        @JavascriptInterface
        public void sendTestNotification(String title, String message) {
            MainActivity.this.runOnUiThread(() -> {
                ReminderScheduler.createNotificationChannel(MainActivity.this);

                Intent clickIntent = new Intent(MainActivity.this, MainActivity.class);
                clickIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

                PendingIntent pendingIntent = PendingIntent.getActivity(
                        MainActivity.this,
                        3001,
                        clickIntent,
                        PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_IMMUTABLE : 0)
                );

                NotificationCompat.Builder builder = new NotificationCompat.Builder(MainActivity.this, ReminderScheduler.CHANNEL_ID)
                        .setSmallIcon(R.mipmap.ic_launcher)
                        .setContentTitle(title != null && !title.isEmpty() ? title : "Flight Flashcards Test ✈️")
                        .setContentText(message != null && !message.isEmpty() ? message : "Study session reminder! Tap to open flashcards.")
                        .setStyle(new NotificationCompat.BigTextStyle().bigText(message != null && !message.isEmpty() ? message : "Study session reminder! Tap to open flashcards."))
                        .setPriority(NotificationCompat.PRIORITY_HIGH)
                        .setAutoCancel(true)
                        .setContentIntent(pendingIntent)
                        .setDefaults(NotificationCompat.DEFAULT_ALL);

                NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
                if (manager != null) {
                    manager.notify(101, builder.build());
                    Toast.makeText(MainActivity.this, "Test notification sent! Check your notification shade.", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQ_RECORD_AUDIO) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                if (isCarModeActive) {
                    startListeningInternal();
                }
            } else {
                Toast.makeText(this, "Microphone permission is needed for Car Mode voice controls.", Toast.LENGTH_LONG).show();
            }
        }
    }

    private void stopSpeakingInternal() {
        mainHandler.post(() -> {
            if (textToSpeech != null) {
                textToSpeech.stop();
            }
        });
    }

    private void shutdownSpeechAndVoice() {
        isCarModeActive = false;
        mainHandler.post(() -> {
            stopListeningInternal();
            stopSpeakingInternal();
            sendJsEvent("onTtsStateChange", "idle");
            sendJsEvent("onVoiceStateChange", "idle");
        });
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            // When exiting via back button, stop listening and speaking immediately
            shutdownSpeechAndVoice();
            super.onBackPressed();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        // Automatically stop listening and speaking if app goes to background
        shutdownSpeechAndVoice();
    }

    @Override
    protected void onStop() {
        super.onStop();
        shutdownSpeechAndVoice();
    }

    @Override
    protected void onDestroy() {
        shutdownSpeechAndVoice();
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        if (speechRecognizer != null) {
            speechRecognizer.destroy();
        }
        super.onDestroy();
    }
}
