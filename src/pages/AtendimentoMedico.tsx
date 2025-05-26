
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
      queixaPrincipal: 'Dor de cabeça e tontura'
    },
    {
      id: '2',
      nome: 'Carlos Eduardo Lima',
      cartaoSus: '987654321098765',
      prioridade: 'alta',
      horarioTriagem: '10:15',
      queixaPrincipal: 'Dor no peito'
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
        return <Badge className="bg-orange-500">Alta</Badge>;
      case 'média':
        return <Badge className="bg-yellow-500">Média</Badge>;
      default:
        return <Badge className="bg-green-500">Baixa</Badge>;
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
                    className="cursor-pointer hover:shadow-md transition-all p-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{paciente.nome}</h4>
                        {getPrioridadeBadge(paciente.prioridade)}
                      </div>
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Triagem: {paciente.horarioTriagem}</span>
                        </div>
                        <p className="mt-1">{paciente.queixaPrincipal}</p>
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
                Registro completo do atendimento médico
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoMedico;
