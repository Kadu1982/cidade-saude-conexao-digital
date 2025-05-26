
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fingerprint, User, Search, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BiometricLogin } from "../auth/BiometricLogin";
import PatientSearch from "../shared/PatientSearch";

interface PatientData {
  id: string;
  nome: string;
  cpf: string;
  cartaoSus: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  ultimoAtendimento?: string;
}

interface IdentificacaoMunicipeProps {
  onMunicipeIdentificado?: (patient: PatientData) => void;
}

export const IdentificacaoMunicipe: React.FC<IdentificacaoMunicipeProps> = ({ 
  onMunicipeIdentificado 
}) => {
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [showBiometric, setShowBiometric] = useState(false);
  const { toast } = useToast();

  const handlePatientIdentified = (patientData: any) => {
    const patient: PatientData = {
      id: patientData.id,
      nome: patientData.nome,
      cpf: patientData.cpf,
      cartaoSus: patientData.cartaoSus,
      dataNascimento: patientData.dataNascimento,
      endereco: patientData.endereco,
      telefone: patientData.telefone,
      ultimoAtendimento: "2024-05-20"
    };
    
    setSelectedPatient(patient);
    setShowBiometric(false);
    
    toast({
      title: "Munícipe Identificado",
      description: `${patient.nome} foi identificado com sucesso!`,
    });

    // Se há callback, chama automaticamente
    if (onMunicipeIdentificado) {
      onMunicipeIdentificado(patient);
    }
  };

  const handlePatientSearch = (patient: any) => {
    const patientData: PatientData = {
      id: patient.id,
      nome: patient.name,
      cpf: "123.456.789-00",
      cartaoSus: patient.cartaoSus,
      dataNascimento: "1985-05-15",
      endereco: "Rua das Flores, 123",
      telefone: "(11) 98765-4321",
      ultimoAtendimento: "2024-05-18"
    };
    
    setSelectedPatient(patientData);
    
    // Se há callback, chama automaticamente
    if (onMunicipeIdentificado) {
      onMunicipeIdentificado(patientData);
    }
  };

  const handleConfirmarAtendimento = () => {
    if (selectedPatient && onMunicipeIdentificado) {
      onMunicipeIdentificado(selectedPatient);
    } else if (selectedPatient) {
      toast({
        title: "Atendimento Confirmado",
        description: `${selectedPatient.nome} foi direcionado para o atendimento.`,
      });
      setSelectedPatient(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5" />
              Identificação por Biometria
            </CardTitle>
            <CardDescription>
              Método recomendado para identificação rápida e segura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowBiometric(true)}
              className="w-full"
              size="lg"
            >
              <Fingerprint className="mr-2 h-5 w-5" />
              Identificar por Biometria
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Busca Manual
            </CardTitle>
            <CardDescription>
              Para casos onde a biometria não esteja disponível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PatientSearch 
                onSelectPatient={handlePatientSearch}
                placeholder="Buscar por nome ou cartão SUS..."
              />
              
              <div className="text-sm text-amber-600 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <span>
                  A busca manual deve ser usada apenas quando a biometria não estiver disponível.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedPatient && !onMunicipeIdentificado && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <User className="h-5 w-5" />
              Munícipe Identificado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="font-semibold">Nome</Label>
                <p>{selectedPatient.nome}</p>
              </div>
              <div>
                <Label className="font-semibold">CPF</Label>
                <p>{selectedPatient.cpf}</p>
              </div>
              <div>
                <Label className="font-semibold">Cartão SUS</Label>
                <p>{selectedPatient.cartaoSus}</p>
              </div>
              <div>
                <Label className="font-semibold">Data de Nascimento</Label>
                <p>{new Date(selectedPatient.dataNascimento).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="font-semibold">Telefone</Label>
                <p>{selectedPatient.telefone}</p>
              </div>
              <div>
                <Label className="font-semibold">Último Atendimento</Label>
                <p>{selectedPatient.ultimoAtendimento ? new Date(selectedPatient.ultimoAtendimento).toLocaleDateString() : 'Primeiro atendimento'}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleConfirmarAtendimento} className="flex-1">
                Confirmar Atendimento
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedPatient(null)}
              >
                Nova Identificação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showBiometric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <BiometricLogin
              mode="patient_identification"
              onPatientIdentified={handlePatientIdentified}
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
};
