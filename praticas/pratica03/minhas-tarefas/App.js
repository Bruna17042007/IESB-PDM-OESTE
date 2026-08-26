import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './util';
import titulo_default from './util';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{titulo}</Text>
      <Text style={{margin: 20}}>{titulo_default}</Text>
      <Button title="Clique aqui..." />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    margin: 20,
    color: 'purple',
  },
});
