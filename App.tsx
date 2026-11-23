import { Text, ScrollView, StyleSheet } from 'react-native';

import AudioComponent from './components/AudioComponent';
import CameraComponent from './components/CameraComponent';
import GaleriaComponent from './components/GaleriaComponent';
import LocalizacaoComponent from './components/LocalizacaoComponent';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>App Recursos Smart</Text>

      <CameraComponent />
      <GaleriaComponent />
      <LocalizacaoComponent />
      <AudioComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 25,
  },
});
