
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import FadeIn from '../../components/FadeIn';
import useNotices from '../../hooks/useNotices';

export default function HomeScreen() {
  const {
    notices,
    loading,
    error,
    refreshing,
    retry,
    refresh,
  } = useNotices();

  function renderNotice({ item }) {
    return (
      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>
          {item.title}
        </Text>

        <Text style={styles.noticeBody}>
          {item.body}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FadeIn>
        <Text style={styles.title}>CampusGo</Text>
        <Text style={styles.subtitle}>
          Mural de avisos acadêmicos
        </Text>
      </FadeIn>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text>Carregando avisos...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>

          <Pressable style={styles.button} onPress={retry}>
            <Text style={styles.buttonText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderNotice}
          refreshing={refreshing}
          onRefresh={refresh}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text>Nenhum aviso encontrado.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  noticeBody: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 21,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  error: {
    color: '#DC2626',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
