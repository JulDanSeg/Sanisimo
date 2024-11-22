import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from 'F:/PROGRAMACIONXD/Javascript/Expo/Sanisimo/constants/firebaseConfig';

export default function PerfilScreen({ navigation }: { navigation: any }) {
  const cerrarSesion = () => {
    auth.signOut().then(() => navigation.navigate('Login'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.info}>Correo: {auth.currentUser?.email}</Text>
      <Button title="Cerrar Sesión" onPress={cerrarSesion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e8f5e9' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#388e3c' },
  info: { fontSize: 18, marginBottom: 20 },
});
