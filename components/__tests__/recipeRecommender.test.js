import React from 'react';
import { render } from '@testing-library/react-native';
import RecetasScreen from '../../app/RecetasScreen';

describe('RecetasScreen Component', () => {
  test('Muestra las recetas correctas para la categoría "Delgado"', () => {
    const { getByText } = render(<RecetasScreen route={{ params: { tipo: 'Delgado' } }} />);

    expect(getByText('Recetas para: Delgado')).toBeTruthy();
    expect(getByText('Batidos de proteínas')).toBeTruthy();
    expect(getByText('Pasta integral con pollo')).toBeTruthy();
    expect(getByText('Frutos secos')).toBeTruthy();
  });

  test('Muestra las recetas correctas para la categoría "Normal"', () => {
    const { getByText } = render(<RecetasScreen route={{ params: { tipo: 'Normal' } }} />);

    expect(getByText('Recetas para: Normal')).toBeTruthy();
    expect(getByText('Ensaladas variadas')).toBeTruthy();
    expect(getByText('Filete de pescado')).toBeTruthy();
    expect(getByText('Smoothie verde')).toBeTruthy();
  });

  test('Muestra las recetas correctas para la categoría "Sobrepeso"', () => {
    const { getByText } = render(<RecetasScreen route={{ params: { tipo: 'Sobrepeso' } }} />);

    expect(getByText('Recetas para: Sobrepeso')).toBeTruthy();
    expect(getByText('Sopas de vegetales')).toBeTruthy();
    expect(getByText('Pechuga de pollo a la plancha')).toBeTruthy();
    expect(getByText('Tortilla de espinaca')).toBeTruthy();
  });

  test('Muestra las recetas correctas para la categoría "Obeso"', () => {
    const { getByText } = render(<RecetasScreen route={{ params: { tipo: 'Obeso' } }} />);

    expect(getByText('Recetas para: Obeso')).toBeTruthy();
    expect(getByText('Caldos ligeros')).toBeTruthy();
    expect(getByText('Vegetales al vapor')).toBeTruthy();
    expect(getByText('Frutas frescas')).toBeTruthy();
  });

  test('No muestra recetas si la categoría no es válida', () => {
    const { getByText, queryByText } = render(<RecetasScreen route={{ params: { tipo: 'Invalido' } }} />);

    expect(getByText('Recetas para: Invalido')).toBeTruthy();
    expect(queryByText('Batidos de proteínas')).toBeNull();
    expect(queryByText('Ensaladas variadas')).toBeNull();
    expect(queryByText('Caldos ligeros')).toBeNull();
  });
});
