
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao SaúdeGov!"
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <LogIn className="h-6 w-6" />
            SaúdeGov - PNAB
          </CardTitle>
          <CardDescription>
            Sistema de Gestão da Atenção Primária à Saúde
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          
          <div className="mt-6 text-sm text-gray-600">
            <p className="font-semibold mb-2">Usuários de demonstração (PNAB):</p>
            <div className="space-y-1">
              <p><strong>Admin:</strong> admin@saude.gov / 123456</p>
              <p><strong>Médico 1:</strong> medico1@saude.gov / 123456</p>
              <p><strong>Médico 2:</strong> medico2@saude.gov / 123456</p>
              <p><strong>Enfermeiro:</strong> enfermeiro@saude.gov / 123456</p>
              <p><strong>Farmacêutico:</strong> farmaceutico@saude.gov / 123456</p>
            </div>
            <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
              <p><strong>Base Legal:</strong> Sistema desenvolvido conforme PNAB 2017 e Programa Previne Brasil</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
