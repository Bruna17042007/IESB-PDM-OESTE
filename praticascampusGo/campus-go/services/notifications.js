
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function scheduleReminder(title, seconds) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permissão para notificações não concedida.');
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'CampusGo',
      body: title,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: seconds,
      channelId: 'default',
    },
  });
}

// Mantém compatibilidade com a tela Nova Tarefa.
export async function scheduleTaskNotification() {
  return scheduleReminder(
    'Não se esqueça de conferir suas tarefas!',
    10
  );
}
