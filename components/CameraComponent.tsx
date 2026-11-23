import { useRef, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraComponent() {
  const [permissao, solicitarPermissao] = useCameraPermissions();
  const [abrirCamera, setAbrirCamera] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  async function abrir() {
    if (!permissao?.granted) {
      const resposta = await solicitarPermissao();
      if (!resposta.granted) return;
    }
    setAbrirCamera(true);
  }

  async function tirarFoto() {
    const resultado = await cameraRef.current?.takePictureAsync();
    if (resultado) {
      setFoto(resultado.uri);
      setAbrirCamera(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Câmera</Text>

      {abrirCamera ? (
        <>
          <CameraView ref={cameraRef} style={styles.camera} facing="back" />
          <Button title="Tirar foto" onPress={tirarFoto} />
        </>
      ) : (
        <Button title="Abrir câmera" onPress={abrir} />
      )}

      {foto && <Image source={{ uri: foto }} style={styles.imagem} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 20 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  camera: { height: 300, marginBottom: 10 },
  imagem: { height: 250, marginTop: 10, borderRadius: 8 },
});
