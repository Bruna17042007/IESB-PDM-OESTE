import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function GerenciarDespesa({ navigation, route }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarData, setMostrarData] = useState(false);

  function alterarValor(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      setValor(texto);
    }
  }

  function salvarDespesa() {
    if (!descricao.trim() || !valor || !categoria) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha a descrição, o valor e a categoria.'
      );
      return;
    }

    const novaDespesa = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: Number(valor),
      data: data.toISOString(),
      categoria: categoria,
    };

    route.params.onSalvar(novaDespesa);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Despesa</Text>

      <Text style={styles.label}>Descrição</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Almoço"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 25.50"
        value={valor}
        onChangeText={alterarValor}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Categoria</Text>

      <View style={styles.categorias}>
        {['Alimentação', 'Transporte', 'Lazer', 'Contas'].map(
          (item) => (
            <Pressable
              key={item}
              style={[
                styles.categoria,
                categoria === item &&
                  styles.categoriaSelecionada,
              ]}
              onPress={() => setCategoria(item)}
            >
              <Text
                style={[
                  styles.textoCategoria,
                  categoria === item &&
                    styles.textoCategoriaSelecionada,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Text style={styles.label}>Data</Text>

      <Pressable
        style={styles.botaoData}
        onPress={() => setMostrarData(true)}
      >
        <Text>{data.toLocaleDateString('pt-BR')}</Text>
      </Pressable>

      {mostrarData && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarData(false);

            if (selectedDate) {
              setData(selectedDate);
            }
          }}
        />
      )}

      <Pressable
        style={styles.botaoSalvar}
        onPress={salvarDespesa}
      >
        <Text style={styles.textoBotao}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  categoria: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },

  categoriaSelecionada: {
    backgroundColor: '#333',
    borderColor: '#333',
  },

  textoCategoria: {
    fontSize: 14,
  },

  textoCategoriaSelecionada: {
    color: '#fff',
    fontWeight: 'bold',
  },

  botaoData: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },

  botaoSalvar: {
    marginTop: 25,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});