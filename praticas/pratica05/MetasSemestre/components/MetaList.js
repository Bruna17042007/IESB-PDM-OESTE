import React from 'react';
import {
  FlatList,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function MetaList({ metas, onDelete }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.vazio}>
          Nenhuma meta cadastrada.
        </Text>
      }
      renderItem={({ item }) => (
        <View style={styles.meta}>
          <View style={styles.info}>
            <Text style={styles.texto}>
              {item.texto}
            </Text>

            <Text style={styles.data}>
              Criada em: {item.criadaEm}
            </Text>
          </View>

          <Pressable
            onPress={() => onDelete(item.id)}
            style={({ pressed }) => [
              styles.botaoExcluir,
              pressed && styles.botaoPressionado,
            ]}
            android_ripple={{ color: '#ffffff55' }}
          >
            <Text style={styles.textoExcluir}>
              Excluir
            </Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  vazio: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#666',
  },

  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  info: {
    flex: 1,
    marginRight: 10,
  },

  texto: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  data: {
    fontSize: 12,
    color: '#777',
  },

  botaoExcluir: {
    backgroundColor: '#dc2626',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 7,
  },

  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
  },

  botaoPressionado: {
    opacity: 0.7,
  },
});