
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Shield, Users, BarChart3, Settings, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CidadaoManifestacao } from "@/components/ouvidoria/CidadaoManifestacao";
import { OuvidorDashboard } from "@/components/ouvidoria/OuvidorDashboard";
import { GestaoManifestacoes } from "@/components/ouvidoria/GestaoManifestacoes";
import { RelatoriosOuvidoria } from "@/components/ouvidoria/RelatoriosOuvidoria";
import { PesquisaSatisfacao } from "@/components/ouvidoria/PesquisaSatisfacao";
import { ConfiguracoesOuvidoria } from "@/components/ouvidoria/ConfiguracoesOuvidoria";

const Ouvidoria = () => {
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState("manifestacao");

  // Verificar se o usuário tem acesso ao módulo
  const temAcessoOuvidoria = hasPermission('ouvidoria') || user?.role === 'admin';
  const isOuvidor = user?.perfis?.includes('ouvidor') || user?.role === 'admin';
  const isCidadao = !isOuvidor;

  if (!temAcessoOuvidoria && !isCidadao) {
    return (
      <div className="container mx-auto py-6">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle>Acesso Restrito</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Você não possui permissão para acessar este módulo.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <MessageSquare className="mr-2 h-6 w-6" />
            Ouvidoria SUS
          </h1>
          <p className="text-muted-foreground mt-1">
            Sistema de manifestações, sugestões e atendimento ao cidadão
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            LGPD Compliance
          </Badge>
          {isOuvidor && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              Ouvidor
            </Badge>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {isCidadao ? (
          // Interface para cidadão
          <>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manifestacao">Nova Manifestação</TabsTrigger>
              <TabsTrigger value="acompanhamento">Acompanhar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manifestacao">
              <CidadaoManifestacao />
            </TabsContent>
            
            <TabsContent value="acompanhamento">
              <Card>
                <CardHeader>
                  <CardTitle>Acompanhar Manifestação</CardTitle>
                  <CardDescription>
                    Digite o número do protocolo para acompanhar sua manifestação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Funcionalidade de acompanhamento será implementada...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        ) : (
          // Interface para ouvidor/administrador
          <>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="manifestacoes">Manifestações</TabsTrigger>
              <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
              <TabsTrigger value="pesquisas">Pesquisas</TabsTrigger>
              <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <OuvidorDashboard />
            </TabsContent>
            
            <TabsContent value="manifestacoes">
              <GestaoManifestacoes />
            </TabsContent>
            
            <TabsContent value="relatorios">
              <RelatoriosOuvidoria />
            </TabsContent>
            
            <TabsContent value="pesquisas">
              <PesquisaSatisfacao />
            </TabsContent>
            
            <TabsContent value="configuracoes">
              <ConfiguracoesOuvidoria />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default Ouvidoria;
