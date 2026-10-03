package com.flightflashcards.app;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import org.json.JSONArray;

import java.util.Calendar;

public class ReminderReceiver extends BroadcastReceiver {
    private static final String TAG = "ReminderReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Reminder alarm received");

        SharedPreferences prefs = context.getSharedPreferences(ReminderScheduler.PREFS_NAME, Context.MODE_PRIVATE);
        boolean enabled = prefs.getBoolean(ReminderScheduler.KEY_ENABLED, false);
        if (!enabled) {
            return;
        }

        String daysJson = prefs.getString(ReminderScheduler.KEY_DAYS, "[1,2,3,4,5,6,7]");
        int currentDayOfWeek = Calendar.getInstance().get(Calendar.DAY_OF_WEEK);

        boolean dayMatches = false;
        try {
            JSONArray daysArray = new JSONArray(daysJson);
            for (int i = 0; i < daysArray.length(); i++) {
                if (daysArray.getInt(i) == currentDayOfWeek) {
                    dayMatches = true;
                    break;
                }
            }
        } catch (Exception e) {
            dayMatches = true;
        }

        if (dayMatches) {
            showNotification(context, prefs);
        }

        // Schedule next occurrence
        ReminderScheduler.scheduleNextAlarm(context);
    }

    private void showNotification(Context context, SharedPreferences prefs) {
        ReminderScheduler.createNotificationChannel(context);

        String title = prefs.getString(ReminderScheduler.KEY_TITLE, "Flight Flashcards ✈️");
        String message = prefs.getString(ReminderScheduler.KEY_MESSAGE, "Time for your daily flight checkride review! Tap to practice.");

        Intent clickIntent = new Intent(context, MainActivity.class);
        clickIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pendingIntent = PendingIntent.getActivity(
                context,
                2001,
                clickIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_IMMUTABLE : 0)
        );

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, ReminderScheduler.CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle(title)
                .setContentText(message)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(message))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true)
                .setContentIntent(pendingIntent)
                .setDefaults(NotificationCompat.DEFAULT_ALL);

        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager != null) {
            manager.notify(100, builder.build());
        }
    }
}
