
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { 
  Stethoscope, 
  TestTube, 
  Pill, 
  Calendar, 
  User, 
  ArrowRight,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  Fingerprint,
  Search,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { BiometricLogin } from "../auth/BiometricLogin";
import PatientSearch from "../shared/PatientSearch";

interface ServicoDisponivel {
  id: string;
  nome: string;
  icon: React.ReactNode;
  disponivel: boolean;
  fila: number;
  tempoEspera: string;
  sala?: string;
}

interface MunicipeIdentificado {
  id: string;
  nome: string;
  cpf: string;
  cartaoSus: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  ultimoAtendimento?: string;
}

export const DirecionamentoAtendimento: React.FC = () => {
  const [municipeIdentificado, setMunicipeIdentificado] = useState<MunicipeIdentificado | null>(null);
  const [servicoSelecionado, setServicoSelecionado] = useState<string | null>(null);
  const [showBiometric, setShowBiometric] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  console.log("DirecionamentoAtendimento: user =", user);
  console.log("DirecionamentoAtendimento: municipeIdentificado =", municipeIdentificado);

  // Serviços disponíveis baseados na unidade e permissões do usuário
  const servicosDisponiveis: ServicoDisponivel[] = [
    {
      id: "consulta-medica",
      nome: "Consulta Médica",
      icon: <Stethoscope className="h-5 w-5" />,
      disponivel: true,
      fila: 3,
      tempoEspera: "25 min",
      sala: "Consultório 1"
    },
    {
      id: "consulta-enfermagem",
      nome: "Consulta de Enfermagem",
      icon: <User className="h-5 w-5" />,
      disponivel: true,
      fila: 1,
      tempoEspera: "10 min",
      sala: "Sala de Enfermagem"
    },
    {
      id: "exames",
      nome: "Coleta de Exames",
      icon: <TestTube className="h-5 w-5" />,
      disponivel: true,
      fila: 2,
      tempoEspera: "15 min",
      sala: "Laboratório"
    },
    {
      id: "farmacia",
      nome: "Farmácia/Dispensação",
      icon: <Pill className="h-5 w-5" />,
      disponivel: true,
      fila: 0,
      tempoEspera: "Imediato",
      sala: "Farmácia"
    },
    {
      id: "agendamento",
      nome: "Agendamentos",
      icon: <Calendar className="h-5 w-5" />,
      disponivel: true,
      fila: 1,
      tempoEspera: "5 min",
      sala: "Recepção"
    }
  ];

  console.log("DirecionamentoAtendimento: servicosDisponiveis =", servicosDisponiveis);

  const handlePatientIdentified = (patientData: any) => {
    console.log("handlePatientIdentified: patientData =", patientData);
    
    if (!patientData) {
      console.error("handlePatientIdentified: patientData is undefined");
      return;
    }

    const patient: MunicipeIdentificado = {
      id: patientData.id || "default-id",
      nome: patientData.nome || patientData.name || "Nome não informado",
      cpf: patientData.cpf || "123.456.789-00",
      cartaoSus: patientData.cartaoSus || "000000000000000",
      dataNascimento: patientData.dataNascimento || "1985-05-15",
      endereco: patientData.endereco || "Rua das Flores, 123",
      telefone: patientData.telefone || "(11) 98765-4321",
      ultimoAtendimento: patientData.ultimoAtendimento || "2024-05-20"
    };
    
    setMunicipeIdentificado(patient);
    setShowBiometric(false);
    
    toast({
      title: "Munícipe Identificado",
      description: `${patient.nome} foi identificado com sucesso!`,
    });
  };

  const handlePatientSearch = (patient: any) => {
    console.log("handlePatientSearch: patient =", patient);
    
    if (!patient) {
      console.error("handlePatientSearch: patient is undefined");
      return;
    }

    const patientData: MunicipeIdentificado = {
      id: patient.id || "default-id",
      nome: patient.name || "Nome não informado",
      cpf: "123.456.789-00",
      cartaoSus: patient.cartaoSus || "000000000000000",
      dataNascimento: "1985-05-15",
      endereco: "Rua das Flores, 123",
      telefone: "(11) 98765-4321",
      ultimoAtendimento: "2024-05-18"
    };
    
    setMunicipeIdentificado(patientData);
  };

  const handleSelecionarServico = (servicoId: string) => {
    console.log("handleSelecionarServico: servicoId =", servicoId);
    
    setServicoSelecionado(servicoId);
    const servico = servicosDisponiveis.find(s => s.id === servicoId);
    
    if (servico && municipeIdentificado) {
      toast({
        title: "Direcionamento Realizado",
        description: `${municipeIdentificado.nome} foi direcionado para ${servico.nome} - ${servico.sala}`,
      });
      
      // Aqui você implementaria a lógica para adicionar à fila do serviço
      setTimeout(() => {
        setMunicipeIdentificado(null);
        setServicoSelecionado(null);
        setModoEdicao(false);
      }, 2000);
    }
  };

  const handleSalvarEdicao = () => {
    setModoEdicao(false);
    toast({
      title: "Dados Atualizados",
      description: `Os dados de ${municipeIdentificado?.nome} foram atualizados com sucesso!`,
    });
  };

  const novaIdentificacao = () => {
    setMunicipeIdentificado(null);
    setServicoSelecionado(null);
    setModoEdicao(false);
  };

  if (!municipeIdentificado) {
    return (
      <div className="space-y-6">
        <Alert>
          <User className="h-4 w-4" />
          <AlertDescription>
            <strong>Unidade:</strong> {user?.unidadeSaude || 'UBS Centro'} - 
            <strong> Recepcionista:</strong> {user?.name || 'Usuário'}
          </AlertDescription>
        </Alert>

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
  }

  return (
    <div className="space-y-6">
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Munícipe:</strong> {municipeIdentificado?.nome} - 
          <strong> Cartão SUS:</strong> {municipeIdentificado?.cartaoSus}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-green-600">
              <User className="h-5 w-5" />
              Dados do Munícipe
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setModoEdicao(!modoEdicao)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {modoEdicao ? 'Cancelar' : 'Editar'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label className="font-semibold">Nome</Label>
              <p>{municipeIdentificado.nome}</p>
            </div>
            <div>
              <Label className="font-semibold">CPF</Label>
              <p>{municipeIdentificado.cpf}</p>
            </div>
            <div>
              <Label className="font-semibold">Cartão SUS</Label>
              <p>{municipeIdentificado.cartaoSus}</p>
            </div>
            <div>
              <Label className="font-semibold">Data de Nascimento</Label>
              <p>{new Date(municipeIdentificado.dataNascimento).toLocaleDateString()}</p>
            </div>
            <div>
              <Label className="font-semibold">Telefone</Label>
              <p>{municipeIdentificado.telefone}</p>
            </div>
            <div>
              <Label className="font-semibold">Último Atendimento</Label>
              <p>{municipeIdentificado.ultimoAtendimento ? new Date(municipeIdentificado.ultimoAtendimento).toLocaleDateString() : 'Primeiro atendimento'}</p>
            </div>
          </div>
          
          {modoEdicao && (
            <div className="flex gap-3 mb-6">
              <Button onClick={handleSalvarEdicao} className="flex-1">
                Salvar Alterações
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {!modoEdicao && (
        <Card>
          <CardHeader>
            <CardTitle>Serviços Disponíveis</CardTitle>
            <CardDescription>
              Selecione o serviço que o munícipe necessita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(servicosDisponiveis || []).map((servico) => (
                <Card 
                  key={servico.id}
                  className={`cursor-pointer transition-all ${
                    servicoSelecionado === servico.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                  } ${!servico.disponivel ? 'opacity-50' : ''}`}
                  onClick={() => servico.disponivel && handleSelecionarServico(servico.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {servico.icon}
                      <h3 className="font-semibold">{servico.nome}</h3>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Tempo: {servico.tempoEspera}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>Fila: {servico.fila} pessoas</span>
                      </div>
                      
                      {servico.sala && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{servico.sala}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3">
                      {servico.disponivel ? (
                        <Badge className="bg-green-500">Disponível</Badge>
                      ) : (
                        <Badge variant="destructive">Indisponível</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={novaIdentificacao}
        >
          Nova Identificação
        </Button>
        
        {servicoSelecionado && !modoEdicao && (
          <Button className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Confirmar Direcionamento
          </Button>
        )}
      </div>
    </div>
  );
};
