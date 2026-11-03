
import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Share,
} from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses } = useExpenses();

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => {
      return total + Number(expense.amount || 0);
    }, 0);
  }, [expenses]);

  async function shareExpenses() {
    try {
      await Share.share({
        message: `Minhas despesas cadastradas no CampusGo totalizam R$ ${totalExpenses.toFixed(2)}.`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar despesas:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Bolso</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Total de despesas</Text>

        <Text style={styles.amount}>
          R$ {totalExpenses.toFixed(2)}
        </Text>

        <Text style={styles.description}>
          Soma de todas as despesas cadastradas.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={shareExpenses}>
        <Text style={styles.buttonText}>
          Compartilhar despesas
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
