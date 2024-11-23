import React from 'react';
import { act, render, waitFor, fireEvent } from '@testing-library/react-native';
import IMCScreen from '../../app/IMCScreen';
import { auth, db } from 'F:/PROGRAMACIONXD/Javascript/Expo/Sanisimo/constants/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

// Mock de Firestore y autenticación
jest.mock('F:/PROGRAMACIONXD/Javascript/Expo/Sanisimo/constants/firebaseConfig', () => ({
  auth: { currentUser: { uid: 'test-user-id' } },
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(() => ({ id: 'mockDoc' })),
  setDoc: jest.fn(() => Promise.resolve()),
}));

describe('IMCScreen Component', () => {
  test('Calcula correctamente el IMC y la categoría', () => {
    const { getByPlaceholderText, getByText } = render(<IMCScreen navigation={{ navigate: jest.fn() }} />);

    // Simula ingreso de datos
    const pesoInput = getByPlaceholderText('Peso (kg)');
    const alturaInput = getByPlaceholderText('Altura (cm)');
    fireEvent.changeText(pesoInput, '70'); // 70 kg
    fireEvent.changeText(alturaInput, '175'); // 175 cm

    // Simula el cálculo
    fireEvent.press(getByText('Calcular'));

    // Verifica resultados
    expect(getByText('IMC: 22.86')).toBeTruthy();
    expect(getByText('Categoría: Normal')).toBeTruthy();
  });

  test('Guarda correctamente los datos del usuario en Firestore', async () => {
    const navigateMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<IMCScreen navigation={{ navigate: navigateMock }} />);
  
    // Simula ingreso de datos
    const pesoInput = getByPlaceholderText('Peso (kg)');
    const alturaInput = getByPlaceholderText('Altura (cm)');
    fireEvent.changeText(pesoInput, '70');
    fireEvent.changeText(alturaInput, '175');
  
    // Valida que los valores se ingresaron correctamente
    expect(pesoInput.props.value).toBe('70');
    expect(alturaInput.props.value).toBe('175');
  
    // Simula el cálculo
    await act(async () => {
      fireEvent.press(getByText('Calcular'));
    });
  
    // Espera que navigate sea llamado con los argumentos correctos
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('Recetas', { tipo: 'Normal' });
    });
  
    


    // Simula guardar y continuar
    fireEvent.press(getByText('Guardar y Continuar'));

    // Verifica que setDoc se llame con los datos correctos
    expect(setDoc).toHaveBeenCalledWith(
      { id: 'mockDoc' },
      {
        peso: '70',
        altura: '175',
        imc: 22.86,
        categoria: 'Normal',
      },
      { merge: true }
    );

    // Verifica navegación
    expect(navigateMock).toHaveBeenCalledWith('Recetas', { tipo: 'Normal' });
  });

  test('No permite guardar datos si el usuario no está autenticado', async () => {
    // Simula que no hay usuario autenticado
    Object.defineProperty(auth, 'currentUser', {
        get: jest.fn(() => null),
      });
      

    const navigateMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<IMCScreen navigation={{ navigate: navigateMock }} />);

    // Simula ingreso de datos
    const pesoInput = getByPlaceholderText('Peso (kg)');
    const alturaInput = getByPlaceholderText('Altura (cm)');
    fireEvent.changeText(pesoInput, '70');
    fireEvent.changeText(alturaInput, '175');

    // Simula el cálculo
    fireEvent.press(getByText('Calcular'));

    // Intenta guardar los datos
    fireEvent.press(getByText('Guardar y Continuar'));

    // Verifica que setDoc no fue llamado
    expect(setDoc).not.toHaveBeenCalled();

    // Verifica que no hubo navegación
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
