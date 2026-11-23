import { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function GaleriaComponent() {
  const [imagem, setImagem] = useState<string | null>(null);

  async function escolherImagem() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Galeria</Text>
      <Button title="Escolher imagem" onPress={escolherImagem} />
      {imagem && <Image source={{ uri: imagem }} style={styles.imagem} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 20 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  imagem: { height: 250, marginTop: 10, borderRadius: 8 },
});
