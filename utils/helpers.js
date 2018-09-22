import { AsyncStorage } from 'react-native'
import { Notifications, Permissions} from 'expo'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
    //debugger
    return {
        title: 'Quiz Reminder',
        body: "Don't forget about your quiz today :)",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
          debugger
          if(data === null) {
              Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if(status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let day = new Date()
                        day.setDate(day.getDate() + 1)
                        day.setHours(10, 0, 0)
                        console.log('time: ', day)

                        Notifications.scheduleLocalNotificationAsync(
                            createNotification(),
                            {
                                time: day,
                                repeat: 'day'
                            }
                        )
                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
           }
        })
}