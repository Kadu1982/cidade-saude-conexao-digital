
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, Scan, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BiometricCaptureProps {
  onBiometricCaptured?: (biometricData: string) => void;
  mode?: 'capture' | 'verify';
  patientId?: string;
}

export const BiometricCapture: React.FC<BiometricCaptureProps> = ({
  onBiometricCaptured,
  mode = 'capture',
  patientId
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [biometricData, setBiometricData] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCapture = async () => {
    setIsCapturing(true);
    
    try {
      // Simulação da captura biométrica
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simula dados biométricos capturados
      const mockBiometricData = `BIO_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setBiometricData(mockBiometricData);
      
      if (onBiometricCaptured) {
        onBiometricCaptured(mockBiometricData);
      }
      
      toast({
        title: mode === 'capture' ? "Biometria Capturada" : "Biometria Verificada",
        description: mode === 'capture' 
          ? "Digital capturada com sucesso!" 
          : "Munícipe identificado com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro na Biometria",
        description: "Não foi possível capturar/verificar a biometria. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Fingerprint className="h-5 w-5" />
          {mode === 'capture' ? 'Captura Biométrica' : 'Verificação Biométrica'}
        </CardTitle>
        <CardDescription>
          {mode === 'capture' 
            ? 'Posicione o dedo no leitor biométrico'
            : 'Identifique o munícipe através da biometria'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          {isCapturing ? (
            <div className="flex flex-col items-center space-y-2">
              <Scan className="h-16 w-16 text-blue-500 animate-pulse" />
              <p className="text-sm text-gray-600">Capturando biometria...</p>
            </div>
          ) : biometricData ? (
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-sm text-green-600 font-medium">
                {mode === 'capture' ? 'Capturada com sucesso!' : 'Verificação concluída!'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Fingerprint className="h-16 w-16 text-gray-400" />
              <p className="text-sm text-gray-600">Aguardando captura</p>
            </div>
          )}
          
          <Button 
            onClick={handleCapture}
            disabled={isCapturing}
            className="w-full"
          >
            {isCapturing ? (
              <>
                <Scan className="mr-2 h-4 w-4 animate-spin" />
                Capturando...
              </>
            ) : (
              <>
                <Fingerprint className="mr-2 h-4 w-4" />
                {mode === 'capture' ? 'Capturar Biometria' : 'Verificar Identidade'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
