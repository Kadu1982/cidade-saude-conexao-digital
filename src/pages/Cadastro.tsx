
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CadastroForm } from "@/components/cadastro/CadastroForm";
import { DadosClinicos } from "@/components/cadastro/DadosClinicos";
import { HistoricoAtendimentos } from "@/components/shared/HistoricoAtendimentos";

const Cadastro = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Cadastro do Munícipe</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Cadastros</CardTitle>
          <CardDescription>
            Cadastre novos munícipes ou atualize informações existentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dados-pessoais" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="dados-pessoais">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="dados-clinicos">Dados Clínicos</TabsTrigger>
              <TabsTrigger value="historico">Histórico de Atendimentos</TabsTrigger>
            </TabsList>
            <TabsContent value="dados-pessoais">
              <CadastroForm />
            </TabsContent>
            <TabsContent value="dados-clinicos">
              <DadosClinicos />
            </TabsContent>
            <TabsContent value="historico">
              <HistoricoAtendimentos tipo="municipe" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastro;
