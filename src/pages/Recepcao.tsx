
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NovoCadastro } from "@/components/recepcao/NovoCadastro";
import { ConfiguracaoRecepcao } from "@/components/recepcao/ConfiguracaoRecepcao";
import { DirecionamentoAtendimento } from "@/components/recepcao/DirecionamentoAtendimento";

const Recepcao = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Recepção da Unidade</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Sistema de Recepção Integrado</CardTitle>
          <CardDescription>
            Atendimento, cadastro e direcionamento de munícipes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="atendimento" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
              <TabsTrigger value="novo-cadastro">Cadastrar</TabsTrigger>
              <TabsTrigger value="configuracao">Configurações</TabsTrigger>
            </TabsList>
            <TabsContent value="atendimento">
              <DirecionamentoAtendimento />
            </TabsContent>
            <TabsContent value="novo-cadastro">
              <NovoCadastro />
            </TabsContent>
            <TabsContent value="configuracao">
              <ConfiguracaoRecepcao />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recepcao;
