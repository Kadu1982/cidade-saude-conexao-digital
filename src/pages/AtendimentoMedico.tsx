
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtendimentoForm } from "@/components/atendimento/AtendimentoForm";
import { ProntuarioEletronico } from "@/components/shared/ProntuarioEletronico";
import { DocumentosMedicos } from "@/components/atendimento/DocumentosMedicos";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  FileText, 
  CheckCircle,
  Clock
} from "lucide-react";

const AtendimentoMedico = () => {
  const { toast } = useToast();
  const [atendimentoFinalizado, setAtendimentoFinalizado] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<string | null>(null);
  const [dadosAtendimento] = useState({
    pacienteNome: "Maria Silva Santos",
    cartaoSus: "123456789012345",
    diagnostico: "Hipertensão Arterial Sistêmica - CID I10",
    medicoProfissional: "Dr. João Carlos Oliveira",
    crm: "12345-SP"
  });

  // Pacientes aguardando atendimento (simulado)
  const pacientesAguardando = [
    {
      id: '1',
      nome: 'Maria Silva Santos',
      cartaoSus: '123456789012345',
      prioridade: 'média',
      horarioTriagem: '09:30',
      queixaPrincipal: 'Dor de cabeça e tontura',
      status: 'recepcionado'
    },
    {
      id: '2',
      nome: 'Carlos Eduardo Lima',
      cartaoSus: '987654321098765',
      prioridade: 'alta',
      horarioTriagem: '10:15',
      queixaPrincipal: 'Dor no peito',
      status: 'triagem'
    },
    {
      id: '3',
      nome: 'Ana Paula Costa',
      cartaoSus: '456789123456789',
      prioridade: 'baixa',
      horarioTriagem: '11:00',
      queixaPrincipal: 'Consulta de rotina',
      status: 'aguardando'
    }
  ];

  const finalizarAtendimento = () => {
    setAtendimentoFinalizado(true);
    toast({
      title: "Atendimento finalizado",
      description: "Os dados foram salvos com sucesso. Agora você pode gerar documentos médicos.",
    });
  };

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return (
          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
        );
      case 'média':
        return (
          <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
        );
      default:
        return (
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'recepcionado':
        return <Badge className="bg-blue-500 text-xs">Recepcionado</Badge>;
      case 'triagem':
        return <Badge className="bg-orange-500 text-xs">Triagem</Badge>;
      case 'aguardando':
        return <Badge className="bg-gray-500 text-xs">Aguardando</Badge>;
      default:
        return <Badge className="bg-gray-500 text-xs">Aguardando</Badge>;
    }
  };

  const selecionarPaciente = (pacienteId: string) => {
    setPacienteSelecionado(pacienteId);
    const paciente = pacientesAguardando.find(p => p.id === pacienteId);
    if (paciente) {
      toast({
        title: "Paciente Selecionado",
        description: `${paciente.nome} foi selecionado para atendimento.`,
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Atendimento Médico</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lista de Pacientes Aguardando */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fila de Atendimento</CardTitle>
              <CardDescription>
                Pacientes aguardando consulta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pacientesAguardando.map((paciente) => (
                  <Card 
                    key={paciente.id}
                    className={`cursor-pointer hover:shadow-md transition-all p-3 ${
                      pacienteSelecionado === paciente.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => selecionarPaciente(paciente.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getPrioridadeBadge(paciente.prioridade)}
                          <h4 className="font-bold text-sm text-black">{paciente.nome}</h4>
                        </div>
                        {getStatusBadge(paciente.status)}
                      </div>
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="font-semibold">Triagem: {paciente.horarioTriagem}</span>
                        </div>
                        <p className="mt-1 font-medium text-gray-800">{paciente.queixaPrincipal}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área Principal de Atendimento */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Consulta Médica
                {atendimentoFinalizado && (
                  <Badge className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Finalizado
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {pacienteSelecionado ? 
                  `Atendimento: ${pacientesAguardando.find(p => p.id === pacienteSelecionado)?.nome}` :
                  "Selecione um paciente da fila para iniciar o atendimento"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pacienteSelecionado ? (
                <Tabs defaultValue="prontuario" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="prontuario">Prontuário</TabsTrigger>
                    <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
                    <TabsTrigger 
                      value="documentos" 
                      disabled={!atendimentoFinalizado}
                    >
                      Documentos
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="prontuario">
                    <ProntuarioEletronico tipo="medico" />
                  </TabsContent>

                  <TabsContent value="atendimento">
                    <div className="space-y-6">
                      <AtendimentoForm tipo="medico" />
                      
                      {!atendimentoFinalizado && (
                        <div className="flex justify-end">
                          <Button onClick={finalizarAtendimento}>
                            Finalizar Atendimento
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="documentos">
                    {atendimentoFinalizado && (
                      <DocumentosMedicos dadosAtendimento={dadosAtendimento} />
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12">
                  <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Selecione um paciente da fila para iniciar o atendimento</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoMedico;
