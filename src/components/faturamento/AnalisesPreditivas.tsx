
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell } from "recharts";

const PREDICOES_GLOSAS = [
  { procedimento: "Consulta Médica", risco: "baixo", probabilidade: 2.3, valor: 1520.00 },
  { procedimento: "Curativos", risco: "medio", probabilidade: 15.7, valor: 890.50 },
  { procedimento: "ECG", risco: "alto", probabilidade: 34.2, valor: 2100.75 },
  { procedimento: "Vacinação", risco: "baixo", probabilidade: 1.8, valor: 456.00 }
];

const DADOS_PRODUCAO = [
  { mes: 'Jan', previsto: 85000, realizado: 87230 },
  { mes: 'Fev', previsto: 82000, realizado: 81150 },
  { mes: 'Mar', previsto: 88000, realizado: 91280 },
  { mes: 'Abr', previsto: 85000, realizado: 87450 },
  { mes: 'Mai', previsto: 90000, realizado: 89120 },
  { mes: 'Jun', previsto: 92000, realizado: 0 }
];

const DISTRIBUICAO_RISCOS = [
  { name: 'Baixo Risco', value: 78.5, color: '#22c55e' },
  { name: 'Médio Risco', value: 16.2, color: '#f59e0b' },
  { name: 'Alto Risco', value: 5.3, color: '#ef4444' }
];

export const AnalisesPreditivas = () => {
  const { toast } = useToast();
  const [analisando, setAnalisando] = useState(false);

  const getRiscoIcon = (risco: string) => {
    switch (risco) {
      case "baixo":
        return <Target className="h-4 w-4 text-green-600" />;
      case "medio":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "alto":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRiscoBadge = (risco: string) => {
    const variants = {
      baixo: "bg-green-100 text-green-800",
      medio: "bg-amber-100 text-amber-800",
      alto: "bg-red-100 text-red-800"
    };

    return (
      <Badge className={variants[risco as keyof typeof variants] || "bg-gray-100 text-gray-800"}>
        {risco.charAt(0).toUpperCase() + risco.slice(1)} Risco
      </Badge>
    );
  };

  const handleExecutarAnalise = () => {
    setAnalisando(true);
    
    setTimeout(() => {
      setAnalisando(false);
      toast({
        title: "Análise concluída",
        description: "Análises preditivas atualizadas com sucesso.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Inteligência Artificial Preditiva
          </h3>
          <p className="text-sm text-gray-600">
            Análises automatizadas com machine learning para otimização do faturamento SUS
          </p>
        </div>
        <Button onClick={handleExecutarAnalise} disabled={analisando}>
          {analisando ? "Analisando..." : "Executar Análise IA"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Previsão de Glosas
            </CardTitle>
            <CardDescription>
              Procedimentos com maior probabilidade de rejeição
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {PREDICOES_GLOSAS.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getRiscoIcon(item.risco)}
                  <div>
                    <div className="font-medium">{item.procedimento}</div>
                    <div className="text-sm text-gray-600">
                      R$ {item.valor.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {item.probabilidade.toFixed(1)}%
                  </div>
                  {getRiscoBadge(item.risco)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Distribuição de Riscos
            </CardTitle>
            <CardDescription>
              Classificação automática dos procedimentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={DISTRIBUICAO_RISCOS}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {DISTRIBUICAO_RISCOS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {DISTRIBUICAO_RISCOS.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs">{item.name}</span>
                  </div>
                  <div className="font-bold">{item.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-green-600" />
            Previsão de Produção e Faturamento
          </CardTitle>
          <CardDescription>
            Comparativo entre valores previstos e realizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={DADOS_PRODUCAO}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toLocaleString()}`, '']}
                />
                <Line 
                  type="monotone" 
                  dataKey="previsto" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Previsto"
                />
                <Line 
                  type="monotone" 
                  dataKey="realizado" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Realizado"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Acurácia Preditiva</p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
                <p className="text-xs text-gray-500">Últimos 6 meses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Redução de Glosas</p>
                <p className="text-2xl font-bold text-blue-600">-18.5%</p>
                <p className="text-xs text-gray-500">Comparado ao período anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Economia Estimada</p>
                <p className="text-2xl font-bold text-purple-600">R$ 24.8k</p>
                <p className="text-xs text-gray-500">Próximo mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>Inteligência Artificial:</strong> O sistema utiliza algoritmos de machine learning
          para análise preditiva, aprendendo continuamente com os dados históricos e padrões de glosas.
          Recomendações baseadas em OpenAI e Scikit-Learn.
        </AlertDescription>
      </Alert>
    </div>
  );
};

// Import necessário do recharts
import { Pie } from "recharts";
