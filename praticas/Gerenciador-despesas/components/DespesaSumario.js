import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + item.valor,
    0
  );

  const valorUltrapassouLimite = somaDespesas > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Total das despesas</Text>

      <Text
        style={[
          styles.valor,
          valorUltrapassouLimite && styles.valorAlto,
        ]}
      >
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  valor: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  valorAlto: {
    color: 'red',
  },
});