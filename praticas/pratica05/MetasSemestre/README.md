# 📚 MetasSemestre

Aplicativo desenvolvido para a disciplina de **Programação para Dispositivos Móveis (React Native / Expo)** do IESB.

O aplicativo permite cadastrar metas acadêmicas, visualizar as metas cadastradas, excluir metas e manter os dados salvos mesmo depois de fechar e abrir novamente o aplicativo.

## 🎯 Objetivo

O objetivo da atividade é aplicar os conceitos de:

- `useState`
- `props`
- Componentização
- `Pressable`
- `useEffect`
- `AsyncStorage`
- `FlatList`
- `Alert`
- `SafeAreaView`

## 📱 Funcionalidades

O aplicativo possui as seguintes funcionalidades:

- Adicionar metas acadêmicas.
- Impedir o cadastro de metas vazias.
- Exibir as metas cadastradas.
- Mostrar a data em que cada meta foi criada.
- Excluir metas cadastradas.
- Salvar as metas no armazenamento local do dispositivo.
- Recuperar as metas ao abrir novamente o aplicativo.
- Utilizar feedback visual nos botões.
- Utilizar `FlatList` para exibir a lista de metas.

## 🗂️ Organização do projeto

```text
MetasSemestre/
├── assets/
│   └── icon.png
│
├── components/
│   ├── MetaInput.js
│   └── MetaList.js
│
├── prints/
│   ├── lista-vazia.png
│   ├── metas-cadastradas.png
│   └── metas-reabertas.png
│
├── App.js
├── app.json
├── package.json
└── README.md
🧩 Componentização
MetaInput.js

O componente MetaInput é responsável pelo campo de texto e pelo botão utilizado para adicionar uma nova meta.

O componente recebe as seguintes props:

value
onChangeText
onAdd

O botão utiliza Pressable para tratar o evento de toque e possui feedback visual quando pressionado.

MetaList.js

O componente MetaList é responsável por exibir todas as metas cadastradas utilizando o componente FlatList.

O componente recebe:

metas
onDelete

Cada meta possui um id único, que é utilizado para identificar corretamente cada item da lista e realizar sua exclusão.

A exclusão utiliza o método filter(), criando uma nova lista sem a meta selecionada.

⚛️ useState

No arquivo App.js, foram utilizados dois estados principais:

const [texto, setTexto] = useState('');
const [metas, setMetas] = useState([]);

O estado texto armazena o conteúdo digitado pelo usuário no campo de texto.

O estado metas armazena a lista de metas cadastradas no aplicativo.

💾 Persistência com AsyncStorage

Foi utilizada a biblioteca AsyncStorage para manter as metas salvas localmente no dispositivo.

A chave utilizada para armazenamento é:

@metas_semestre
🔄 Carregamento das metas

O primeiro useEffect está localizado no arquivo App.js.

Ele é executado uma vez quando o aplicativo é iniciado:

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

Esse useEffect utiliza AsyncStorage.getItem() para buscar as metas que foram salvas anteriormente.

Depois, o JSON.parse() transforma os dados armazenados em texto novamente em uma lista de objetos JavaScript.

O [] faz com que esse efeito seja executado somente quando o aplicativo é montado.

💾 Salvamento das metas

O segundo useEffect é responsável por salvar as metas sempre que a lista for alterada:

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

Nesse processo, o JSON.stringify() transforma a lista de metas em texto para que ela possa ser armazenada no AsyncStorage.

O AsyncStorage.setItem() realiza o salvamento local.

O [metas] faz com que o salvamento seja executado sempre que o estado metas for alterado.

Os dois processos utilizam try/catch para tratar possíveis erros e apresentar uma mensagem amigável ao usuário.

➕ Adicionando uma meta

Antes de adicionar uma meta, o aplicativo verifica se o campo está vazio.

Caso o usuário tente adicionar uma meta sem digitar um texto, um Alert é apresentado:

Atenção

Digite uma meta antes de adicionar.

Quando uma meta válida é adicionada, ela recebe um objeto com três informações:

{
  id: Date.now().toString(),
  texto: textoLimpo,
  criadaEm: new Date().toLocaleDateString('pt-BR')
}

O id é criado utilizando Date.now().toString(), garantindo um identificador para cada meta.

🗑️ Exclusão de metas

Para excluir uma meta, o usuário pressiona o botão Excluir.

O aplicativo apresenta uma confirmação antes da exclusão.

A remoção é realizada utilizando filter():

setMetas((listaAtual) =>
  listaAtual.filter(
    (meta) => meta.id !== id
  )
);

Dessa forma, uma nova lista é criada sem modificar diretamente o array original.

📋 Estrutura de uma meta

Cada meta cadastrada possui a seguinte estrutura:

{
  id: "id-unico",
  texto: "Estudar React Native",
  criadaEm: "13/09/2026"
}
📱 Interface do aplicativo

O aplicativo utiliza:

SafeAreaProvider
SafeAreaView
Image
Text
TextInput
Pressable
FlatList

Também foi utilizada uma imagem local localizada na pasta assets.

🖼️ Prints do aplicativo
1. Lista vazia

Ao iniciar o aplicativo sem nenhuma meta cadastrada, é apresentada a mensagem informando que não existem metas cadastradas.

2. Lista com metas cadastradas

Após adicionar metas acadêmicas, elas são exibidas na lista junto com a data de criação e o botão para exclusão.

3. Metas após reabrir o aplicativo

Após fechar e abrir novamente o aplicativo, as metas permanecem disponíveis.

Isso demonstra que a persistência utilizando AsyncStorage está funcionando corretamente.

🛠️ Tecnologias utilizadas
React Native
Expo
JavaScript
AsyncStorage
React Native Safe Area Context
📦 Bibliotecas utilizadas
@react-native-async-storage/async-storage
react-native-safe-area-context
▶️ Execução do projeto

Para executar o projeto, utilize:

npx expo start

Depois, o aplicativo pode ser aberto utilizando o Expo Go.

🎓 Disciplina

Programação para Dispositivos Móveis

Professor: Marcelo Alves Farias

Instituição: IESB

Aulas relacionadas: 05 e 06

Projeto: MetasSemestre