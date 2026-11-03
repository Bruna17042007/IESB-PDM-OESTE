
import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reminderLoading, setReminderLoading] = useState(false);

  async function handleCheckIn() {
    try {
      setLoading(true);

      const place = await getCurrentPlace();

      if (!place) {
        Alert.alert(
          'Permissão necessária',
          'Permita o acesso à localização para realizar o check-in.'
        );
        return;
      }

      setLocation(place);

      Alert.alert('Check-in realizado!', place.label);
    } catch (error) {
      Alert.alert(
        'Atenção',
        'Não foi possível obter sua localização. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCompleteTask() {
    try {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    } catch (error) {
      console.log('Feedback tátil indisponível:', error);
    }

    Alert.alert('Sucesso', 'Tarefa concluída!');
  }

  async function handleReminder() {
    try {
      setReminderLoading(true);

      await scheduleReminder(
        'Não se esqueça de conferir suas tarefas!',
        10
      );

      Alert.alert(
        'Lembrete agendado',
        'Você receberá uma notificação em 10 segundos.'
      );
    } catch (error) {
      Alert.alert('Atenção', error.message);
    } finally {
      setReminderLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <Text style={styles.subtitle}>
        Organize sua rotina acadêmica!
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/new-task')}
      >
        <Text style={styles.buttonText}>+ Nova tarefa</Text>
      </Pressable>

      <Pressable
        style={styles.buttonSecondary}
        onPress={() => router.push('/task/42')}
      >
        <Text style={styles.buttonText}>Ver tarefa 42</Text>
      </Pressable>

      <Pressable
        style={styles.completeButton}
        onPress={handleCompleteTask}
      >
        <Text style={styles.buttonText}>Concluir</Text>
      </Pressable>

      <Pressable
        style={styles.reminderButton}
        onPress={handleReminder}
        disabled={reminderLoading}
      >
        <Text style={styles.buttonText}>
          {reminderLoading ? 'Agendando...' : 'Lembrar em 10 s'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.locationButton}
        onPress={handleCheckIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Obtendo localização...' : 'Estudei aqui'}
        </Text>
      </Pressable>

      {location && (
        <Text style={styles.locationText}>
          Check-in registrado!
          {'\n'}Local: {location.label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#0F172A',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  completeButton: {
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderButton: {
    backgroundColor: '#D97706',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationButton: {
    backgroundColor: '#059669',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationText: {
    color: '#334155',
    marginTop: 20,
    textAlign: 'center',
  },
});
