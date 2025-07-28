import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

const Login = ({ onSuccess }) => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!keyword.trim()) {
      setError('Please enter the magic word ✨');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post('https://birthday-y5nz.onrender.com/api/auth/keyword-check', { keyword });
      if (res.data.success) {
        onSuccess();
      } else {
        setError('Incorrect keyword 💔 Try again!');
      }
    } catch (err) {
      setError('Error connecting to server 🚫');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-100 to-yellow-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center animate-fade-in">
        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center justify-center">
          <Sparkles className="mr-2 animate-spin-slow" />💕 Enter The Magic Word 💕
        </h1>

        <p className="mb-4 text-gray-700 leading-relaxed">
          What’s the one word that perfectly captures who means the world to me? <br />
          Beyond beautiful, <br />
          Caring like no other, <br />
          Holding my heart always... <br />
          Always my favorite person? 💖
        </p>

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-2 border-pink-300 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center"
          placeholder="Her cute nickname or secret"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`bg-gradient-to-r from-pink-400 to-red-400 text-white px-6 py-2 rounded-full shadow-md transition-transform ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          {loading ? '🔒 Checking...' : '💝 Unlock Surprise'}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
