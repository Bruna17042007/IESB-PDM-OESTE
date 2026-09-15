import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native';

export default function CompromissoList({
  itens,
  onDelete,
  tituloLista,
  listaVazia,
  botaoRemover,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        {tituloLista}
      </Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}

        ListEmptyComponent={
          <Text style={styles.vazio}>
            {listaVazia}
          </Text>
        }

        renderItem={({ item }) => (
          <View style={styles.item}>

            <View style={styles.textos}>
              <Text style={styles.texto}>
                {item.texto}
              </Text>

              <Text style={styles.data}>
                Criado em: {item.criadoEm}
              </Text>
            </View>

            <Pressable
              onPress={() => onDelete(item.id)}
              style={({ pressed }) => [
                styles.botaoRemover,
                pressed && styles.botaoPressionado,
              ]}
              android_ripple={{
                color: '#ffffff55',
              }}
            >
              <Text style={styles.textoRemover}>
                {botaoRemover}
              </Text>
            </Pressable>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  vazio: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 30,
    fontSize: 16,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },

  textos: {
    flex: 1,
    marginRight: 10,
  },

  texto: {
    fontSize: 16,
    fontWeight: '600',
  },

  data: {
    marginTop: 5,
    fontSize: 12,
    color: '#777777',
  },

  botaoRemover: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },

  botaoPressionado: {
    opacity: 0.7,
  },

  textoRemover: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});