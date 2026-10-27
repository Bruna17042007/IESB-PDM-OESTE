import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DespesaSaida from './components/DespesaSaida';
import GerenciarDespesa from './screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();

const DESPESAS_INICIAIS = [
  {
    id: '1',
    descricao: 'Almoço',
    valor: 35.5,
    data: '2026-10-01',
    categoria: 'Alimentação',
  },
  {
    id: '2',
    descricao: 'Uber',
    valor: 25,
    data: '2026-10-02',
    categoria: 'Transporte',
  },
  {
    id: '3',
    descricao: 'Cinema',
    valor: 40,
    data: '2026-10-03',
    categoria: 'Lazer',
  },
  {
    id: '4',
    descricao: 'Internet',
    valor: 100,
    data: '2026-10-04',
    categoria: 'Contas',
  },
  {
    id: '5',
    descricao: 'Jantar',
    valor: 55,
    data: '2026-10-05',
    categoria: 'Alimentação',
  },
];

const CATEGORIAS = [
  'Todas',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

function TelaPrincipal({ navigation }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);
  function adicionarDespesa(novaDespesa) {
  setDespesas((despesasAtuais) => [
    ...despesasAtuais,
    novaDespesa,
  ]);
}

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState('Todas');

  const despesasFiltradas =
    categoriaSelecionada === 'Todas'
      ? despesas
      : despesas.filter(
          (despesa) =>
            despesa.categoria === categoriaSelecionada
        );

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Gerenciador de Despesas
        </Text>

        <Pressable
          style={styles.botaoNova}
          onPress={() =>
  navigation.navigate('GerenciarDespesa', {
    onSalvar: adicionarDespesa,
  })
}
        >
          <Text style={styles.textoBotaoNova}>+ Nova</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitulo}>
        Filtrar por categoria:
      </Text>

      <View style={styles.filtros}>
        {CATEGORIAS.map((categoria) => (
          <Pressable
            key={categoria}
            style={[
              styles.filtro,
              categoriaSelecionada === categoria &&
                styles.filtroSelecionado,
            ]}
            onPress={() => setCategoriaSelecionada(categoria)}
          >
            <Text
              style={[
                styles.textoFiltro,
                categoriaSelecionada === categoria &&
                  styles.textoFiltroSelecionado,
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </View>

      <DespesaSaida despesas={despesasFiltradas} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Despesas"
          component={TelaPrincipal}
          options={{ title: 'Despesas' }}
        />

        <Stack.Screen
          name="GerenciarDespesa"
          component={GerenciarDespesa}
          options={{ title: 'Nova Despesa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
  },

  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },

  botaoNova: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  textoBotaoNova: {
    color: '#fff',
    fontWeight: 'bold',
  },

  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 8,
  },

  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
    marginBottom: 10,
  },

  filtro: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },

  filtroSelecionado: {
    backgroundColor: '#333',
    borderColor: '#333',
  },

  textoFiltro: {
    fontSize: 13,
  },

  textoFiltroSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
});