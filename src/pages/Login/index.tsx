import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './LoginForm';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}