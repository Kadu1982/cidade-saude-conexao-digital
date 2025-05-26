
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, Fingerprint, AlertCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CadastroForm } from "../cadastro/CadastroForm";
import { BiometricLogin } from "../auth/BiometricLogin";

export const NovoCadastro: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'auth' | 'form'>('auth');
  const [authenticatedUser, setAuthenticatedUser] = useState<any>(null);
  const [showBiometric, setShowBiometric] = useState(false);
  const { toast } = useToast();

  const handleReceptionistAuth = (userData: any) => {
    setAuthenticatedUser(userData);
    setCurrentStep('form');
    setShowBiometric(false);
    
    toast({
      title: "Recepcionista Autenticado",
      description: `${userData.nome} autorizado para realizar cadastros.`,
    });
  };

  const handleStartAuth = () => {
    setShowBiometric(true);
  };

  const handleCadastroCompleto = () => {
    toast({
      title: "Cadastro Realizado",
      description: "Novo munícipe cadastrado com sucesso!",
    });
    
    // Reset para permitir novo cadastro
    setCurrentStep('auth');
    setAuthenticatedUser(null);
  };

  if (currentStep === 'auth') {
    return (
      <div className="space-y-6">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Autorização Necessária:</strong> Para realizar cadastros é necessário 
            autenticação biométrica do recepcionista autorizado.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              Novo Cadastro de Munícipe
            </CardTitle>
            <CardDescription>
              Autentique-se para iniciar um novo cadastro
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button 
              onClick={handleStartAuth}
              size="lg"
              className="w-full"
            >
              <Fingerprint className="mr-2 h-5 w-5" />
              Autenticar Recepcionista
            </Button>
            
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                <div className="text-left">
                  <p className="font-medium text-blue-800">Requisitos para Cadastro</p>
                  <ul className="text-blue-700 mt-1 space-y-1">
                    <li>• Autenticação biométrica do recepcionista</li>
                    <li>• Documento com foto do munícipe</li>
                    <li>• Dados completos e atualizados</li>
                    <li>• Captura biométrica do munícipe</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {showBiometric && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <BiometricLogin
                mode="login"
                onLoginSuccess={handleReceptionistAuth}
              />
              <Button 
                variant="outline" 
                onClick={() => setShowBiometric(false)}
                className="w-full mt-4"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Recepcionista Autenticado:</strong> {authenticatedUser?.nome} - {authenticatedUser?.unidade}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Formulário de Cadastro</CardTitle>
          <CardDescription>
            Preencha todos os dados do munícipe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CadastroForm />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={() => {
            setCurrentStep('auth');
            setAuthenticatedUser(null);
          }}
        >
          Encerrar Sessão
        </Button>
      </div>
    </div>
  );
};
