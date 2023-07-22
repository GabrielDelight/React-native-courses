import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import notifee from '@notifee/react-native';

function NotificationScreen() {
  const [notificationId, setNotificationId] = useState(null);

  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    console.log('Channel ID', channelId);

    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();

    const notiID = await notifee.displayNotification({
      id: '123',
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576; nonso',
      subtitle: '&#129395;',
      body: 'Main body content of the notification',
      android: {
        channelId,
        color: '#6194e5',
        largeIcon: 'https://logos.flamingtext.com/City-Logos/Todo-Logo.png',
        timestamp: Date.now() - 800, // 8 minutes ago
        showTimestamp: true,
        // chronometerDirection: 'up',
        // showChronometer: true,
        groupSummary: true,
        groupId: '123',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
        ],
      },
    });

    setNotificationId(notiID); // from useState

    // Grouping
    await notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576; nonso',
      subtitle: '&#129395;',
      body: 'Main body content of the notification',
      android: {
        channelId,
        groupId: '123',
        color: '#6194e5',
        largeIcon: 'https://logos.flamingtext.com/City-Logos/Todo-Logo.png',
        timestamp: Date.now() - 800, // 8 minutes ago
        showTimestamp: true,
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
        ],
      },
    });
  }

  const cancelNotification = async () => {
    await notifee.cancelNotification(notificationId);
  };

  return (
    <View style={styles.body}>
      <View style={styles.button}>
        <Button
          title="Display Notification"
          color={'green'}
          onPress={() => onDisplayNotification()}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Cancel notification"
          color={'red'}
          onPress={() => cancelNotification()}
        />
      </View>
    </View>
  );
}
export default NotificationScreen;

const styles = StyleSheet.create({
  body: {backgroundColor: 'black', flex: 1},
  button: {
    margin: 20,
  },
});
