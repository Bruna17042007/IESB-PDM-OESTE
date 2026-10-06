import { View, Text, StyleSheet } from 'react-native';

function getDataFormatada(data) {
  return new Date(data).toLocaleDateString('pt-BR');
}

export default function DespesaItem({
  descricao,
  valor,
  data,
  categoria,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.informacoes}>
        <Text style={styles.descricao}>{descricao}</Text>

        <Text style={styles.data}>
          {getDataFormatada(data)}
        </Text>

        <View style={styles.tagCategoria}>
          <Text style={styles.textoCategoria}>
            {categoria}
          </Text>
        </View>
      </View>

      <Text style={styles.valor}>
        R$ {Number(valor).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  informacoes: {
    flex: 1,
  },

  descricao: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  data: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },

  tagCategoria: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },

  textoCategoria: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});