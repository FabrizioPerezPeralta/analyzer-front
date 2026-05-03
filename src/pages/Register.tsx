import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

const Register = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await registerUser({ username, password });
      setAuth(response.token, response.userId, username);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-parchment px-6">
      <Card className="w-full max-w-md rounded-lg border-hairline">
        <CardHeader className="space-y-2">
          <p className="text-[40px] font-semibold leading-tight">Create your account</p>
          <p className="text-[17px] text-ink-muted-48">
            Access the Analyzer workspace with a new login.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[14px] text-ink-muted-48">Username</label>
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[14px] text-ink-muted-48">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="P@ssw0rd!"
                required
              />
            </div>
            {error ? <p className="text-[14px] text-primary">{error}</p> : null}
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create account"}
            </Button>
            <p className="text-[14px] text-ink-muted-48">
              Already registered? <Link to="/login" className="text-primary">Sign in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
