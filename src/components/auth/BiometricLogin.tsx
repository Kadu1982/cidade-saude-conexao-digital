
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BiometricCapture } from '../biometria/BiometricCapture';

interface BiometricLoginProps {
  onLoginSuccess?: (userData: any) => void;
  onPatientIdentified?: (patientData: any) => void;
  mode?: 'login' | 'patient_identification';
}

export const BiometricLogin: React.FC<BiometricLoginProps> = ({
  onLoginSuccess,
  onPatientIdentified,
  mode = 'login'
}) => {
  const [showBiometric, setShowBiometric] = useState(false);
  const [identifiedUser, setIdentifiedUser] = useState<any>(null);
  const { toast } = useToast();

  const handleBiometricVerified = async (biometricData: string) => {
    try {
      // Simulação de verificação biométrica
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (mode === 'login') {
        // Simula dados do usuário autenticado
        const userData = {
          id: 'user_123',
          nome: 'Dr. João Silva',
          cargo: 'Médico',
          unidade: 'UBS Central',
          biometricId: biometricData
        };
        
        setIdentifiedUser(userData);
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
        
        toast({
          title: "Login Realizado",
          description: `Bem-vindo, ${userData.nome}!`,
        });
      } else {
        // Simula identificação de paciente
        const patientData = {
          id: 'patient_456',
          nome: 'Maria Santos',
          cpf: '123.456.789-00',
          cartaoSus: '123456789012345',
          dataNascimento: '1985-05-15',
          endereco: 'Rua das Flores, 123',
          telefone: '(11) 98765-4321',
          biometricId: biometricData
        };
        
        setIdentifiedUser(patientData);
        if (onPatientIdentified) {
          onPatientIdentified(patientData);
        }
        
        toast({
          title: "Paciente Identificado",
          description: `Paciente: ${patientData.nome} - CPF: ${patientData.cpf}`,
        });
      }
    } catch (error) {
      toast({
        title: "Erro na Identificação",
        description: "Não foi possível identificar através da biometria. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setShowBiometric(false);
    }
  };

  if (identifiedUser) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            {mode === 'login' ? 'Login Realizado' : 'Paciente Identificado'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <User className="h-16 w-16 mx-auto text-green-500" />
            <h3 className="font-semibold text-lg">{identifiedUser.nome}</h3>
            {mode === 'login' ? (
              <div className="text-sm text-gray-600">
                <p>{identifiedUser.cargo}</p>
                <p>{identifiedUser.unidade}</p>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                <p>CPF: {identifiedUser.cpf}</p>
                <p>Cartão SUS: {identifiedUser.cartaoSus}</p>
                <p>Nascimento: {new Date(identifiedUser.dataNascimento).toLocaleDateString()}</p>
              </div>
            )}
          </div>
          
          <Button 
            onClick={() => setIdentifiedUser(null)}
            variant="outline"
            className="w-full"
          >
            Nova Identificação
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Fingerprint className="h-5 w-5" />
          {mode === 'login' ? 'Login Biométrico' : 'Identificação de Paciente'}
        </CardTitle>
        <CardDescription>
          {mode === 'login' 
            ? 'Faça login usando sua impressão digital'
            : 'Identifique o paciente através da biometria'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Button 
            onClick={() => setShowBiometric(true)}
            className="w-full"
            size="lg"
          >
            <Fingerprint className="mr-2 h-5 w-5" />
            {mode === 'login' ? 'Fazer Login' : 'Identificar Paciente'}
          </Button>
        </div>
        
        {mode === 'patient_identification' && (
          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Identificação de Emergência</p>
                <p className="text-blue-700">
                  Use esta função para identificar pacientes inconscientes ou 
                  que não conseguem fornecer informações.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      {showBiometric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <BiometricCapture
              mode="verify"
              onBiometricCaptured={handleBiometricVerified}
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
    </Card>
  );
};
