import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simple password check (in production, this would be server-side)
    if (password === 'atelie2024') {
      onLogin();
    } else {
      setError('Invalid password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAF8]">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-[14px] shadow-sm border border-[#E6E6E2]/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#F1F1EE] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-[#5B8DEF]" />
            </div>
            <h1 className="text-xl font-medium text-[#1C1C1C]">Admin Access</h1>
            <p className="text-sm text-[#9A9A9A] mt-1">
              Enter your password to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={`
                  w-full px-4 py-3 
                  bg-[#FAFAF8] 
                  border rounded-xl
                  text-[#1C1C1C] placeholder:text-[#9A9A9A]
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-[#5B8DEF]/20 focus:border-[#5B8DEF]
                  ${error ? 'border-red-300' : 'border-[#E6E6E2]'}
                `}
                disabled={isLoading}
              />
              {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full 
                bg-[#1C1C1C] text-white
                py-3 rounded-xl 
                font-medium text-sm
                transition-all duration-200
                hover:bg-[#3D3D3D]
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
