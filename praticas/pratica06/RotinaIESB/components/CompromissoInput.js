import React from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={labels.placeholderCompromisso}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressionado,
        ]}
        onPress={onAdd}
        android_ripple={{ color: '#ffffff55' }}
      >
        <Text style={styles.textoBotao}>
          {labels.botaoAdicionar}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },

  botao: {
    width: '28%',
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    overflow: 'hidden',
  },

  botaoPressionado: {
    opacity: 0.7,
  },

  textoBotao: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});