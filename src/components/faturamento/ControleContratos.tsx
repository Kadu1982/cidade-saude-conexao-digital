
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  DollarSign, 
  Calendar, 
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Settings,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CONTRATOS = [
  {
    id: "sus-ambulatorial",
    nome: "SUS Ambulatorial",
    tipo: "Federal",
    vigencia: "01/01/2024 - 31/12/2024",
    valorTotal: 1250000.00,
    valorExecutado: 623500.50,
    percentualExecutado: 49.88,
    limiteMensal: 104166.67,
    executadoMes: 87450.25,
    status: "ativo",
    ppi: "0234.567.890"
  },
  {
    id: "sus-hospitalar",
    nome: "SUS Hospitalar",
    tipo: "Federal",
    vigencia: "01/01/2024 - 31/12/2024",
    valorTotal: 850000.00,
    valorExecutado: 445200.30,
    percentualExecutado: 52.38,
    limiteMensal: 70833.33,
    executadoMes: 72100.15,
    status: "alerta",
    ppi: "0234.567.891"
  },
  {
    id: "mac-especializado",
    nome: "MAC Especializado",
    tipo: "Estadual",
    vigencia: "01/03/2024 - 28/02/2025",
    valorTotal: 320000.00,
    valorExecutado: 89600.40,
    percentualExecutado: 28.00,
    limiteMensal: 26666.67,
    executadoMes: 24800.20,
    status: "ativo",
    ppi: "0234.567.892"
  }
];

const ALERTAS_CONTRATOS = [
  {
    contrato: "SUS Hospitalar",
    tipo: "limite_mensal",
    descricao: "Limite mensal ultrapassado em 1.8%",
    valor: 1266.82,
    urgencia: "media"
  },
  {
    contrato: "SUS Ambulatorial",
    tipo: "projecao_anual",
    descricao: "Projeção indica possível extrapolação do limite anual",
    valor: 24500.00,
    urgencia: "alta"
  }
];

export const ControleContratos = () => {
  const { toast } = useToast();
  const [contratoSelecionado, setContratoSelecionado] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ativo":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "alerta":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case "bloqueado":
        return <Shield className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      ativo: "bg-green-100 text-green-800",
      alerta: "bg-amber-100 text-amber-800",
      bloqueado: "bg-red-100 text-red-800"
    };

    return (
      <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {status === "ativo" ? "Ativo" : status === "alerta" ? "Alerta" : "Bloqueado"}
      </Badge>
    );
  };

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case "alta":
        return "border-l-red-500";
      case "media":
        return "border-l-amber-500";
      case "baixa":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  const handleConfigurarContrato = (contratoId: string) => {
    setContratoSelecionado(contratoId);
    toast({
      title: "Abrindo configurações",
      description: `Configurações do contrato ${contratoId} carregadas.`,
    });
  };

  const valorTotalContratos = CONTRATOS.reduce((sum, c) => sum + c.valorTotal, 0);
  const valorTotalExecutado = CONTRATOS.reduce((sum, c) => sum + c.valorExecutado, 0);
  const percentualGeralExecutado = (valorTotalExecutado / valorTotalContratos) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Contratos Ativos</p>
                <p className="text-2xl font-bold">{CONTRATOS.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Valor Total</p>
                <p className="text-2xl font-bold">R$ {(valorTotalContratos / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Executado</p>
                <p className="text-2xl font-bold">R$ {(valorTotalExecutado / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">% Executado</p>
                <p className="text-2xl font-bold">{percentualGeralExecutado.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {ALERTAS_CONTRATOS.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Alertas e Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ALERTAS_CONTRATOS.map((alerta, index) => (
              <Alert key={index} className={`border-l-4 ${getUrgenciaColor(alerta.urgencia)}`}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex justify-between items-start">
                    <div>
                      <strong>{alerta.contrato}:</strong> {alerta.descricao}
                      <div className="text-sm text-muted-foreground mt-1">
                        Valor: R$ {alerta.valor.toLocaleString()}
                      </div>
                    </div>
                    <Badge variant={alerta.urgencia === "alta" ? "destructive" : "secondary"}>
                      {alerta.urgencia}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contratos e Limites</h3>
        
        {CONTRATOS.map((contrato) => (
          <Card key={contrato.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(contrato.status)}
                  <div>
                    <CardTitle className="text-lg">{contrato.nome}</CardTitle>
                    <CardDescription>
                      {contrato.tipo} • PPI: {contrato.ppi} • {contrato.vigencia}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(contrato.status)}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleConfigurarContrato(contrato.id)}
                  >
                    <Settings className="h-3 w-3 mr-1" /> Configurar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="font-semibold">R$ {contrato.valorTotal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Executado</p>
                  <p className="font-semibold">R$ {contrato.valorExecutado.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Limite Mensal</p>
                  <p className="font-semibold">R$ {contrato.limiteMensal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Executado Mês</p>
                  <p className="font-semibold">R$ {contrato.executadoMes.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Execução Anual</span>
                  <span>{contrato.percentualExecutado.toFixed(1)}%</span>
                </div>
                <Progress value={contrato.percentualExecutado} className="w-full" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Execução Mensal</span>
                  <span>{((contrato.executadoMes / contrato.limiteMensal) * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={(contrato.executadoMes / contrato.limiteMensal) * 100} 
                  className="w-full" 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Controle Automático:</strong> O sistema monitora continuamente os limites contratuais
          e gera alertas preventivos antes de ultrapassar os valores estabelecidos. Bloqueios automáticos
          são aplicados conforme configuração da unidade.
        </AlertDescription>
      </Alert>
    </div>
  );
};
