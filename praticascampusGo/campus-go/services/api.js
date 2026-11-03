
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getNotices() {
  if (!API_URL) {
    throw new Error('URL da API não configurada no arquivo .env.');
  }

  const response = await fetch(`${API_URL}/posts?_limit=10`);

  if (!response.ok) {
    throw new Error('Não foi possível carregar os avisos.');
  }

  return await response.json();
}
