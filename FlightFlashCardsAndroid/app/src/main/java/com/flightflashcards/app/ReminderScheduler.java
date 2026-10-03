package com.flightflashcards.app;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Calendar;

public class ReminderScheduler {
    private static final String TAG = "ReminderScheduler";
    public static final String PREFS_NAME = "FlightReminderPrefs";
    public static final String KEY_ENABLED = "reminder_enabled";
    public static final String KEY_HOUR = "reminder_hour";
    public static final String KEY_MINUTE = "reminder_minute";
    public static final String KEY_DAYS = "reminder_days"; // JSON array of day ints [1..7] where 1=Sunday
    public static final String KEY_TITLE = "reminder_title";
    public static final String KEY_MESSAGE = "reminder_message";

    public static final String CHANNEL_ID = "flight_flashcards_reminders";
    public static final String CHANNEL_NAME = "Study Reminders";

    public static void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("Daily flight review and checkride study reminders");
            channel.enableVibration(true);
            NotificationManager manager = context.getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    public static void saveAndSchedule(Context context, int hour, int minute, String daysJson, String title, String message, boolean enabled) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putBoolean(KEY_ENABLED, enabled);
        editor.putInt(KEY_HOUR, hour);
        editor.putInt(KEY_MINUTE, minute);
        editor.putString(KEY_DAYS, daysJson);
        editor.putString(KEY_TITLE, title != null && !title.isEmpty() ? title : "Flight Flashcards ✈️");
        editor.putString(KEY_MESSAGE, message != null && !message.isEmpty() ? message : "Time for your daily flight checkride review! Tap to practice.");
        editor.apply();

        scheduleNextAlarm(context);
    }

    public static void scheduleNextAlarm(Context context) {
        createNotificationChannel(context);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) return;

        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        boolean enabled = prefs.getBoolean(KEY_ENABLED, false);

        // Cancel any pending alarm first
        Intent intent = new Intent(context, ReminderReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                1001,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        if (!enabled) {
            alarmManager.cancel(pendingIntent);
            Log.d(TAG, "Reminders disabled, cancelled alarm.");
            return;
        }

        int targetHour = prefs.getInt(KEY_HOUR, 9);
        int targetMinute = prefs.getInt(KEY_MINUTE, 0);
        String daysJson = prefs.getString(KEY_DAYS, "[1,2,3,4,5,6,7]");

        long nextTriggerTime = calculateNextTriggerTime(targetHour, targetMinute, daysJson);
        if (nextTriggerTime <= 0) {
            Log.d(TAG, "No valid trigger days selected.");
            return;
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                if (alarmManager.canScheduleExactAlarms()) {
                    alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, nextTriggerTime, pendingIntent);
                } else {
                    alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, nextTriggerTime, pendingIntent);
                }
            } else {
                alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, nextTriggerTime, pendingIntent);
            }
        } else {
            alarmManager.setExact(AlarmManager.RTC_WAKEUP, nextTriggerTime, pendingIntent);
        }

        Log.d(TAG, "Next reminder scheduled for timestamp: " + nextTriggerTime);
    }

    private static long calculateNextTriggerTime(int hour, int minute, String daysJson) {
        try {
            JSONArray daysArray = new JSONArray(daysJson);
            if (daysArray.length() == 0) return -1;

            boolean[] activeDays = new boolean[8]; // 1 = Sunday, 7 = Saturday
            for (int i = 0; i < daysArray.length(); i++) {
                int day = daysArray.getInt(i);
                if (day >= 1 && day <= 7) {
                    activeDays[day] = true;
                }
            }

            Calendar now = Calendar.getInstance();

            for (int dayOffset = 0; dayOffset < 8; dayOffset++) {
                Calendar candidate = Calendar.getInstance();
                candidate.add(Calendar.DAY_OF_YEAR, dayOffset);
                candidate.set(Calendar.HOUR_OF_DAY, hour);
                candidate.set(Calendar.MINUTE, minute);
                candidate.set(Calendar.SECOND, 0);
                candidate.set(Calendar.MILLISECOND, 0);

                int dayOfWeek = candidate.get(Calendar.DAY_OF_WEEK);
                if (activeDays[dayOfWeek]) {
                    if (candidate.after(now)) {
                        return candidate.getTimeInMillis();
                    }
                }
            }

            // If none found within 7 days, fallback to next week same time
            Calendar candidate = Calendar.getInstance();
            candidate.add(Calendar.DAY_OF_YEAR, 7);
            candidate.set(Calendar.HOUR_OF_DAY, hour);
            candidate.set(Calendar.MINUTE, minute);
            candidate.set(Calendar.SECOND, 0);
            candidate.set(Calendar.MILLISECOND, 0);
            return candidate.getTimeInMillis();

        } catch (Exception e) {
            Log.e(TAG, "Error calculating trigger time", e);
            Calendar candidate = Calendar.getInstance();
            candidate.set(Calendar.HOUR_OF_DAY, hour);
            candidate.set(Calendar.MINUTE, minute);
            candidate.set(Calendar.SECOND, 0);
            candidate.set(Calendar.MILLISECOND, 0);
            if (candidate.before(Calendar.getInstance())) {
                candidate.add(Calendar.DAY_OF_YEAR, 1);
            }
            return candidate.getTimeInMillis();
        }
    }

    public static String getSettingsJson(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        try {
            JSONObject obj = new JSONObject();
            obj.put("enabled", prefs.getBoolean(KEY_ENABLED, false));
            obj.put("hour", prefs.getInt(KEY_HOUR, 9));
            obj.put("minute", prefs.getInt(KEY_MINUTE, 0));
            obj.put("days", new JSONArray(prefs.getString(KEY_DAYS, "[1,2,3,4,5,6,7]")));
            obj.put("title", prefs.getString(KEY_TITLE, "Flight Flashcards ✈️"));
            obj.put("message", prefs.getString(KEY_MESSAGE, "Time for your daily flight checkride review! Tap to practice."));
            return obj.toString();
        } catch (Exception e) {
            return "{\"enabled\":false,\"hour\":9,\"minute\":0,\"days\":[1,2,3,4,5,6,7]}";
        }
    }
}
