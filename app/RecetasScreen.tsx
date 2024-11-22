import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const recetasPorIMC: { [key: string]: string[] } = {
  Delgado: ['Batidos de proteínas', 'Pasta integral con pollo', 'Frutos secos'],
  Normal: ['Ensaladas variadas', 'Filete de pescado', 'Smoothie verde'],
  Sobrepeso: ['Sopas de vegetales', 'Pechuga de pollo a la plancha', 'Tortilla de espinaca'],
  Obeso: ['Caldos ligeros', 'Vegetales al vapor', 'Frutas frescas'],
};

export default function RecetasScreen({ route }: { route: any }) {
  const { tipo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas para: {tipo}</Text>
      <FlatList
        data={recetasPorIMC[tipo]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text style={styles.recipe}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e8f5e9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#388e3c' },
  recipe: { fontSize: 18, marginVertical: 5 },
});
