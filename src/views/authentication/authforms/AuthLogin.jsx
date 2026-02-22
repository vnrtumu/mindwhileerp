import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { api } from 'src/lib/api-client';

const AuthLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/super-admin/login', {
        username,
        password
      });

      localStorage.setItem('auth_token', response.access_token);

      // Try to fetch super admin profile to verify success
      try {
        const profile = await api.get('/super-admin/me');
        localStorage.setItem('auth_user', JSON.stringify(profile));
        navigate('/dashboard');
      } catch (profileError) {
        console.error("Failed to fetch profile", profileError);
        localStorage.removeItem('auth_token');
        setError('Failed to fetch user profile. Please try again.');
      }

    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.status === 401) {
        setError('Incorrect username or password');
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="mt-6" onSubmit={handleLogin}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd">Password</Label>
          </div>
          <Input
            id="userpwd"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" className="checkbox" />
            <Label htmlFor="accept" className="opacity-90 font-normal cursor-pointer">
              Remeber this Device
            </Label>
          </div>
          <Link to={'/auth/auth2/forgot-password'} className="text-primary text-sm font-medium">
            Forgot Password ?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
