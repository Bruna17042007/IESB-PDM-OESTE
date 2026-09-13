import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Switch,
} from 'react-native';

import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  TITULO_APP,
  PLACEHOLDER_INPUT,
  TEXTO_BOTAO,
  TITULO_LISTA,
} from './labels';

export default function App() {

  // Array fixo apenas para demonstrar a lista nesta atividade.
  const disciplinas = [
    'Programação para Dispositivos Móveis',
    'Banco de Dados',
    'Engenharia de Software',
    'Desenvolvimento Web',
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <StatusBar style="auto" />

        {/* Cabeçalho do aplicativo */}
        <Text style={styles.titulo}>
          {TITULO_APP}
        </Text>

        {/*
          flexDirection: 'row' coloca o input e o botão lado a lado.
          justifyContent: 'space-between' distribui o espaço entre eles.
          alignItems: 'center' alinha os elementos verticalmente.
        */}
        <View style={styles.linha}>

          <TextInput
            style={styles.input}
            placeholder={PLACEHOLDER_INPUT}
          />

          {/* Botão usando Pressable para permitir efeito ao pressionar */}
          <Pressable
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.botaoPressionado,
            ]}
            onPress={() => {}}
          >
            <Text style={styles.textoBotao}>
              {TEXTO_BOTAO}
            </Text>
          </Pressable>

        </View>

        {/* Switch do desafio opcional */}
        <View style={styles.switchContainer}>
          <Text>
            Mostrar apenas obrigatórias
          </Text>

          <Switch
            value={false}
            onValueChange={() => {}}
          />
        </View>

        {/* Título da lista */}
        <Text style={styles.tituloLista}>
          {TITULO_LISTA}
        </Text>

        {/* Lista de disciplinas */}
        <View style={styles.lista}>
          {disciplinas.map((disciplina, index) => (
            <Text
              key={index}
              style={styles.item}
            >
              {disciplina}
            </Text>
          ))}
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  // flex: 1 faz o container ocupar toda a tela.
  // padding cria espaço entre o conteúdo e as bordas.
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },

  // Organiza o input e o botão horizontalmente.
  linha: {
    flexDirection: 'row',

    // Distribui o espaço entre os elementos.
    justifyContent: 'space-between',

    // Alinha os elementos verticalmente no centro.
    alignItems: 'center',
  },

  input: {
    // flex ocupa o espaço disponível da linha.
    flex: 1,

    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,

    // Cria espaço entre o input e o botão.
    marginRight: 10,
  },

  botao: {
    // Uso de porcentagem solicitado na atividade.
    width: '28%',

    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ec70dc',

    // Centraliza o texto dentro do botão.
    alignItems: 'center',
  },

  // Altera a aparência do botão enquanto ele está sendo pressionado.
  botaoPressionado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Organiza o texto e o Switch na mesma linha.
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },

  lista: {
    // Faz a lista ocupar o espaço restante da tela.
    flex: 1,

    // Os itens começam no topo da área disponível.
    justifyContent: 'flex-start',
  },

  item: {
    marginVertical: 5,
    padding: 15,
    backgroundColor: '#eeeeee',
    borderRadius: 8,
  },

});