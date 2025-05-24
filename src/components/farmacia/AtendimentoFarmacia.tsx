
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, User } from "lucide-react";

export const AtendimentoFarmacia = () => {
  const [cartaoSus, setCartaoSus] = useState("");
  const [pacienteEncontrado, setPacienteEncontrado] = useState(false);
  const [orientacoes, setOrientacoes] = useState("");
  const { toast } = useToast();

  const buscarPaciente = () => {
    if (cartaoSus.length >= 15) {
      setPacienteEncontrado(true);
      toast({
        title: "Paciente encontrado",
        description: "Dados do paciente carregados com sucesso"
      });
    }
  };

  const finalizarAtendimento = () => {
    toast({
      title: "Atendimento finalizado",
      description: "Orientações farmacêuticas registradas com sucesso"
    });
    setCartaoSus("");
    setPacienteEncontrado(false);
    setOrientacoes("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Identificação do Paciente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="cartao-sus">Cartão SUS</Label>
              <Input
                id="cartao-sus"
                placeholder="000 0000 0000 0000"
                value={cartaoSus}
                onChange={(e) => setCartaoSus(e.target.value)}
              />
            </div>
            <Button onClick={buscarPaciente} className="mt-6">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          {pacienteEncontrado && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-4">
                <h4 className="font-semibold">Maria Silva Santos</h4>
                <p className="text-sm text-gray-600">CPF: 123.456.789-00</p>
                <p className="text-sm text-gray-600">Data Nascimento: 15/03/1980</p>
                <p className="text-sm text-gray-600">Telefone: (11) 99999-9999</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {pacienteEncontrado && (
        <Card>
          <CardHeader>
            <CardTitle>Atendimento Farmacêutico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="orientacoes">Orientações e Intervenções Farmacêuticas</Label>
              <Textarea
                id="orientacoes"
                placeholder="Descreva as orientações fornecidas ao paciente, interações medicamentosas identificadas, orientações sobre uso correto, etc."
                value={orientacoes}
                onChange={(e) => setOrientacoes(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={finalizarAtendimento}>
                Finalizar Atendimento
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
