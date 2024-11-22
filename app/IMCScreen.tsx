import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from 'F:/PROGRAMACIONXD/Javascript/Expo/Sanisimo/constants/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function IMCScreen({ navigation }: { navigation: any }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState<number | null>(null);
  const [categoria, setCategoria] = useState('');

  const calcularIMC = () => {
    const alturaMetros = parseFloat(altura) / 100;
    const resultadoIMC = parseFloat(peso) / (alturaMetros * alturaMetros);
    setImc(parseFloat(resultadoIMC.toFixed(2)));

    if (resultadoIMC < 18.5) setCategoria('Delgado');
    else if (resultadoIMC >= 18.5 && resultadoIMC < 25) setCategoria('Normal');
    else if (resultadoIMC >= 25 && resultadoIMC < 30) setCategoria('Sobrepeso');
    else setCategoria('Obeso');
  };

  const guardarIMC = async () => {
    if (auth.currentUser) {
      const userDoc = doc(collection(db, 'users'), auth.currentUser.uid);
      await setDoc(userDoc, { peso, altura, imc, categoria }, { merge: true });
      navigation.navigate('Recetas', { tipo: categoria });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcula tu IMC</Text>
      <TextInput
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
        style={styles.input}
      />
      <TextInput
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
        style={styles.input}
      />
      <Button title="Calcular" onPress={calcularIMC} />
      {imc && (
        <View>
          <Text style={styles.result}>IMC: {imc}</Text>
          <Text style={styles.result}>Categoría: {categoria}</Text>
          <Button title="Guardar y Continuar" onPress={guardarIMC} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e8f5e9' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#388e3c' },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  result: { fontSize: 18, marginTop: 10 },
});
