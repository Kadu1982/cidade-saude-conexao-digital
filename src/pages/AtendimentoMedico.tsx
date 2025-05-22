
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AtendimentoForm } from "@/components/atendimento/AtendimentoForm";
import { ProntuarioEletronico } from "@/components/shared/ProntuarioEletronico";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AtendimentoMedico = () => {
  const { toast } = useToast();
  
  const finalizarAtendimento = () => {
    toast({
      title: "Atendimento finalizado",
      description: "Os dados foram salvos com sucesso",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Atendimento Médico</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Dados do Paciente</CardTitle>
            <CardDescription>
              Informações essenciais do munícipe em atendimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProntuarioEletronico tipo="medico" />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Registro de Atendimento</CardTitle>
            <CardDescription>
              Preencha as informações do atendimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AtendimentoForm tipo="medico" />
            <div className="mt-6 flex justify-end">
              <Button onClick={finalizarAtendimento}>Finalizar Atendimento</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AtendimentoMedico;
