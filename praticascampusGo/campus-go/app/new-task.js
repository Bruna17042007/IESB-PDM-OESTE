
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { scheduleTaskNotification } from '../services/notifications';

export default function NewTaskScreen() {
  const [taskName, setTaskName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSchedule() {
    if (!taskName.trim()) {
      Alert.alert('Atenção', 'Digite o nome da tarefa.');
      return;
    }

    try {
      setLoading(true);
      await scheduleTaskNotification(taskName.trim());

      Alert.alert(
        'Lembrete agendado!',
        'Você receberá uma notificação em 10 segundos.'
      );
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Tarefa</Text>

      <Text style={styles.subtitle}>
        Organize sua rotina acadêmica!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da tarefa"
        value={taskName}
        onChangeText={setTaskName}
      />

      <Pressable
        style={styles.button}
        onPress={handleSchedule}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Agendando...' : 'Agendar lembrete'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.buttonSecondary}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Fechar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
