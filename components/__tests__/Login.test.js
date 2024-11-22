import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../app/LoginScreen';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Mock de Firebase Auth
jest.mock('firebase/auth', () => ({
  auth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe('LoginScreen Component', () => {
  const mockedNavigate = jest.fn();

  const renderComponent = () =>
    render(<LoginScreen navigation={{ navigate: mockedNavigate }} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza correctamente los elementos', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Registrarse')).toBeTruthy();
    expect(getByText('Iniciar Sesión')).toBeTruthy();
  });

  test('Muestra un error si falla el registro', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Error de registro'));

    const { getByText, getByPlaceholderText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.press(getByText('Registrarse'));

    await waitFor(() => {
      expect(getByText('Error de registro')).toBeTruthy();
    });
  });

  test('Navega a IMC después de un registro exitoso', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '12345' } });

    const { getByText, getByPlaceholderText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.press(getByText('Registrarse'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('IMC');
    });
  });

  test('Muestra un error si falla el inicio de sesión', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Error de inicio de sesión'));

    const { getByText, getByPlaceholderText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.press(getByText('Iniciar Sesión'));

    await waitFor(() => {
      expect(getByText('Error de inicio de sesión')).toBeTruthy();
    });
  });

  test('Navega a IMC después de un inicio de sesión exitoso', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '12345' } });

    const { getByText, getByPlaceholderText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123456');
    fireEvent.press(getByText('Iniciar Sesión'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('IMC');
    });
  });
});
w