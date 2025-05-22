
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AtendimentoForm } from "@/components/atendimento/AtendimentoForm";
import { OdontogramaDigital } from "@/components/odontologico/OdontogramaDigital";
import { ProntuarioEletronico } from "@/components/shared/ProntuarioEletronico";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Stethoscope } from "lucide-react";

const AtendimentoOdontologico = () => {
  const { toast } = useToast();
  
  const finalizarAtendimento = () => {
    toast({
      title: "Atendimento finalizado",
      description: "Os dados foram salvos com sucesso",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Stethoscope className="mr-2 h-6 w-6" />
        Atendimento Odontológico
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Odontograma</CardTitle>
              <CardDescription>
                Visualize e edite o odontograma do paciente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OdontogramaDigital />
            </CardContent>
          </Card>
        </div>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Dados do Paciente</CardTitle>
            <CardDescription>
              Informações essenciais do munícipe em atendimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProntuarioEletronico tipo="odontologico" />
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
            <AtendimentoForm tipo="odontologico" />
            <div className="mt-6 flex justify-end">
              <Button onClick={finalizarAtendimento}>Finalizar Atendimento</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AtendimentoOdontologico;
