import React, { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

import {
  tituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
  botaoRemover,
} from './labels';

const CHAVE_STORAGE = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // CARREGAR os compromissos salvos
  useEffect(() => {
    const carregarCompromissos = async () => {
      try {
        const dadosSalvos =
          await AsyncStorage.getItem(CHAVE_STORAGE);

        if (dadosSalvos) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        console.error(erro);

        Alert.alert(
          'Erro',
          'Não foi possível carregar os compromissos.'
        );
      } finally {
        setCarregando(false);
      }
    };

    carregarCompromissos();
  }, []);

  // SALVAR os compromissos
  useEffect(() => {
    const salvarCompromissos = async () => {
      if (carregando) {
        return;
      }

      try {
        const dados = JSON.stringify(compromissos);

        await AsyncStorage.setItem(
          CHAVE_STORAGE,
          dados
        );
      } catch (erro) {
        console.error(erro);

        Alert.alert(
          'Erro',
          'Não foi possível salvar os compromissos.'
        );
      }
    };

    salvarCompromissos();
  }, [compromissos, carregando]);

  // ADICIONAR compromisso
  const adicionarCompromisso = () => {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      Alert.alert(
        'Atenção',
        'Digite um compromisso antes de adicionar.'
      );
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    setCompromissos((listaAtual) => [
      ...listaAtual,
      novoCompromisso,
    ]);

    setTexto('');
  };

  // REMOVER compromisso
  const removerCompromisso = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* CABEÇALHO */}
          <View style={styles.header}>
            <Image
              source={require('./assets/icon.png')}
              style={styles.logo}
            />

            <View style={styles.headerTextos}>
              <Text style={styles.titulo}>
                {tituloApp}
              </Text>

              <Text style={styles.subtitulo}>
                Organize sua rotina acadêmica
              </Text>
            </View>
          </View>

          {/* CAMPO DE DIGITAÇÃO */}
          <View style={styles.formulario}>
            <CompromissoInput
              value={texto}
              onChangeText={setTexto}
              onAdd={adicionarCompromisso}
              labels={{
                placeholderCompromisso,
                botaoAdicionar,
              }}
            />
          </View>

          {/* LISTA */}
          <View style={styles.lista}>
            <CompromissoList
              itens={compromissos}
              onDelete={removerCompromisso}
              tituloLista={tituloLista}
              listaVazia={listaVazia}
              botaoRemover={botaoRemover}
            />
          </View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  logo: {
    width: 60,
    height: 60,
    marginRight: 14,
  },

  headerTextos: {
    flex: 1,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  subtitulo: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },

  formulario: {
    marginBottom: 5,
  },

  lista: {
    flex: 1,
  },
});