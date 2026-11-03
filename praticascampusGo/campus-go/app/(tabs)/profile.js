
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  pickImageFromGallery,
  takeProfilePhoto,
} from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const savedPhoto = await AsyncStorage.getItem(PHOTO_KEY);
        if (savedPhoto) setPhoto(savedPhoto);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar sua foto.');
      }
    }

    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;

    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
      setPhoto(uri);
      Alert.alert('Sucesso', 'Foto de perfil salva!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a foto.');
    }
  }

  async function handleGallery() {
    try {
      const uri = await pickImageFromGallery();
      await savePhoto(uri);
    } catch (error) {
      Alert.alert('Permissão necessária', error.message, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
      ]);
    }
  }

  async function handleCamera() {
    try {
      const uri = await takeProfilePhoto();
      await savePhoto(uri);
    } catch (error) {
      Alert.alert('Permissão necessária', error.message, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      <Text style={styles.subtitle}>
        Bem-vinda ao seu perfil acadêmico!
      </Text>

      {photo ? (
        <Image source={{ uri: photo }} style={styles.photo} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sem foto</Text>
        </View>
      )}

      <Pressable style={styles.button} onPress={handleGallery}>
        <Text style={styles.buttonText}>Escolher da galeria</Text>
      </Pressable>

      <Pressable style={styles.buttonSecondary} onPress={handleCamera}>
        <Text style={styles.buttonText}>Tirar foto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 25,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 25,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  placeholderText: {
    color: '#64748B',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: '#0F172A',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
