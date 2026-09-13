import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
} from 'react-native';

import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const CHAVE_METAS = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);

  // CARREGAR AS METAS QUANDO O APLICATIVO ABRIR
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos =
          await AsyncStorage.getItem(CHAVE_METAS);

        if (dadosSalvos !== null) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar as metas salvas.'
        );
      }
    }

    carregarMetas();
  }, []);

  // SALVAR AS METAS SEMPRE QUE A LISTA MUDAR
  useEffect(() => {
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(
          CHAVE_METAS,
          JSON.stringify(metas)
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar as metas.'
        );
      }
    }

    salvarMetas();
  }, [metas]);

  // ADICIONAR UMA NOVA META
  function handleAdd() {
    const textoLimpo = texto.trim();

    if (textoLimpo === '') {
      Alert.alert(
        'Atenção',
        'Digite uma meta antes de adicionar.'
      );
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toLocaleDateString('pt-BR'),
    };

    setMetas((listaAtual) => [
      ...listaAtual,
      novaMeta,
    ]);

    setTexto('');
  }

  // EXCLUIR UMA META
  function handleDelete(id) {
    Alert.alert(
      'Excluir meta',
      'Deseja realmente excluir esta meta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setMetas((listaAtual) =>
              listaAtual.filter(
                (meta) => meta.id !== id
              )
            );
          },
        },
      ]
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
          />

          <View>
            <Text style={styles.titulo}>
              MetasSemestre
            </Text>

            <Text style={styles.subtitulo}>
              Minhas metas acadêmicas
            </Text>
          </View>
        </View>

        {/* CAMPO PARA DIGITAR A META */}
        <MetaInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdd}
        />

        {/* TÍTULO DA LISTA */}
        <Text style={styles.tituloLista}>
          Minhas metas
        </Text>

        {/* LISTA DE METAS */}
        <MetaList
          metas={metas}
          onDelete={handleDelete}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 10,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});