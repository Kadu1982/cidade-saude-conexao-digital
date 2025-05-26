
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdentificacaoMunicipe } from "@/components/recepcao/IdentificacaoMunicipe";
import { NovoCadastro } from "@/components/recepcao/NovoCadastro";
import { AtualizacaoCadastro } from "@/components/recepcao/AtualizacaoCadastro";
import { ConfiguracaoRecepcao } from "@/components/recepcao/ConfiguracaoRecepcao";

const Recepcao = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Recepção</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Atendimento na Recepção</CardTitle>
          <CardDescription>
            Identificação e cadastro de munícipes com biometria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="identificacao" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="identificacao">Identificar Munícipe</TabsTrigger>
              <TabsTrigger value="novo-cadastro">Novo Cadastro</TabsTrigger>
              <TabsTrigger value="atualizacao">Atualizar Cadastro</TabsTrigger>
              <TabsTrigger value="configuracao">Configurações</TabsTrigger>
            </TabsList>
            <TabsContent value="identificacao">
              <IdentificacaoMunicipe />
            </TabsContent>
            <TabsContent value="novo-cadastro">
              <NovoCadastro />
            </TabsContent>
            <TabsContent value="atualizacao">
              <AtualizacaoCadastro />
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
