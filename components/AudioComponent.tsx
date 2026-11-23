import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
} from 'expo-audio';

export default function AudioComponent() {
  const gravador = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [gravando, setGravando] = useState(false);
  const [uri, setUri] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const player = useAudioPlayer(uri);

  async function iniciarGravacao() {
    setErro(null);
    const permissao = await AudioModule.requestRecordingPermissionsAsync();
    if (!permissao.granted) {
      setErro('Permissão do microfone negada.');
      return;
    }

    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    await gravador.prepareToRecordAsync();
    gravador.record();
    setGravando(true);
  }

  async function pararGravacao() {
    await gravador.stop();
    setGravando(false);
    setUri(gravador.uri);
    await setAudioModeAsync({ allowsRecording: false });
  }

  function reproduzir() {
    player.seekTo(0);
    player.play();
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Áudio</Text>

      {gravando ? (
        <Button title="Parar gravação" onPress={pararGravacao} color="red" />
      ) : (
        <Button title="Iniciar gravação" onPress={iniciarGravacao} />
      )}

      {uri && !gravando && (
        <View style={styles.espaco}>
          <Button title="Reproduzir" onPress={reproduzir} />
          <View style={styles.espaco}>
            <Button title="Pausar" onPress={() => player.pause()} />
          </View>
        </View>
      )}

      {erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 20 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  espaco: { marginTop: 10 },
  erro: { marginTop: 10, color: 'red' },
});
