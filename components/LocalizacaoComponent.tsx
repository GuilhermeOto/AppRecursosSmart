import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function LocalizacaoComponent() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function obterLocalizacao() {
    setErro(null);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErro('Permissão de localização negada.');
      return;
    }

    try {
      const posicao = await Location.getCurrentPositionAsync({});
      setLatitude(posicao.coords.latitude);
      setLongitude(posicao.coords.longitude);
    } catch {
      setErro('Não foi possível obter a localização.');
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Geolocalização</Text>
      <Button title="Obter localização" onPress={obterLocalizacao} />
      {latitude !== null && longitude !== null && (
        <Text style={styles.texto}>
          Latitude: {latitude}
          {'\n'}Longitude: {longitude}
        </Text>
      )}
      {erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 20 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  texto: { marginTop: 10, fontSize: 16 },
  erro: { marginTop: 10, color: 'red' },
});
