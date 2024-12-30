import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import RegisterForm from './RegisterForm';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (email: string, password: string) => {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            is_admin: false // By default, users are not admins
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        navigate('/login');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <RegisterForm onSubmit={handleRegister} error={error} />
    </div>
  );
}