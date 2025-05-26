
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { IdentificacaoMunicipe } from "./IdentificacaoMunicipe";

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
  cartaoSus: string;
  agendamentos?: any[];
}

export const DirecionamentoAtendimento: React.FC = () => {
  const [municipeIdentificado, setMunicipeIdentificado] = useState<MunicipeIdentificado | null>(null);
  const [servicoSelecionado, setServicoSelecionado] = useState<string | null>(null);
  const [showIdentificacao, setShowIdentificacao] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

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

  const handleMunicipeIdentificado = (municipe: any) => {
    setMunicipeIdentificado({
      id: municipe.id,
      nome: municipe.nome,
      cartaoSus: municipe.cartaoSus,
      agendamentos: [] // Aqui viriam os agendamentos do dia
    });
    setShowIdentificacao(false);
    
    toast({
      title: "Munícipe Identificado",
      description: `${municipe.nome} foi identificado. Selecione o serviço desejado.`,
    });
  };

  const handleSelecionarServico = (servicoId: string) => {
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
        setShowIdentificacao(true);
      }, 2000);
    }
  };

  if (showIdentificacao) {
    return (
      <div className="space-y-6">
        <Alert>
          <User className="h-4 w-4" />
          <AlertDescription>
            <strong>Unidade:</strong> {user?.unidadeSaude || 'UBS Centro'} - 
            <strong> Recepcionista:</strong> {user?.name}
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Identificação do Munícipe</CardTitle>
            <CardDescription>
              Identifique o munícipe para direcioná-lo ao serviço adequado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IdentificacaoMunicipe onMunicipeIdentificado={handleMunicipeIdentificado} />
          </CardContent>
        </Card>
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
          <CardTitle>Serviços Disponíveis</CardTitle>
          <CardDescription>
            Selecione o serviço que o munícipe necessita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servicosDisponiveis.map((servico) => (
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

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => {
            setShowIdentificacao(true);
            setMunicipeIdentificado(null);
            setServicoSelecionado(null);
          }}
        >
          Nova Identificação
        </Button>
        
        {servicoSelecionado && (
          <Button className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Confirmar Direcionamento
          </Button>
        )}
      </div>
    </div>
  );
};
