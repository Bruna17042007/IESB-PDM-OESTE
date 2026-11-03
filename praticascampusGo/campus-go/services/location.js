
import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    return null;
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const addresses = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  const address = addresses[0];

  const label = address
    ? [
        address.name,
        address.street,
        address.district,
        address.city,
      ]
        .filter(Boolean)
        .filter((item, index, array) => array.indexOf(item) === index)
        .join(', ')
    : 'Localização identificada pelas coordenadas';

  return {
    label,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}
