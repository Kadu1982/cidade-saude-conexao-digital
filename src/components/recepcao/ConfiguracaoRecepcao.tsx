
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Settings, 
  Monitor, 
  Users, 
  Fingerprint, 
  Shield, 
  Clock,
  AlertTriangle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConfigRecepcao {
  modoTotem: boolean;
  biometriaObrigatoria: boolean;
  validacaoDuplicatas: boolean;
  alertaRecemNascidos: boolean;
  tempoSessao: number;
  identificacaoEmergencia: boolean;
}

export const ConfiguracaoRecepcao: React.FC = () => {
  const [config, setConfig] = useState<ConfigRecepcao>({
    modoTotem: false,
    biometriaObrigatoria: true,
    validacaoDuplicatas: true,
    alertaRecemNascidos: true,
    tempoSessao: 30,
    identificacaoEmergencia: true,
  });

  const { toast } = useToast();

  const handleConfigChange = (key: keyof ConfigRecepcao, value: boolean | number) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveConfig = () => {
    // Aqui você salvaria as configurações
    toast({
      title: "Configurações Salvas",
      description: "As configurações da recepção foram atualizadas.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Modo de Operação
          </CardTitle>
          <CardDescription>
            Configure como a recepção irá operar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="modo-totem">Modo Totem</Label>
              <p className="text-sm text-gray-600">
                Habilita interface para totem de autoatendimento
              </p>
            </div>
            <Switch
              id="modo-totem"
              checked={config.modoTotem}
              onCheckedChange={(checked) => handleConfigChange('modoTotem', checked)}
            />
          </div>

          {config.modoTotem && (
            <Alert>
              <Monitor className="h-4 w-4" />
              <AlertDescription>
                No modo totem, apenas identificação de munícipes estará disponível. 
                Cadastros e atualizações requerem atendimento presencial.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5" />
            Configurações de Biometria
          </CardTitle>
          <CardDescription>
            Defina como a biometria será utilizada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="biometria-obrigatoria">Biometria Obrigatória</Label>
              <p className="text-sm text-gray-600">
                Torna a biometria obrigatória para validação de cadastros
              </p>
            </div>
            <Switch
              id="biometria-obrigatoria"
              checked={config.biometriaObrigatoria}
              onCheckedChange={(checked) => handleConfigChange('biometriaObrigatoria', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="identificacao-emergencia">Identificação de Emergência</Label>
              <p className="text-sm text-gray-600">
                Permite identificação biométrica para pacientes inconscientes
              </p>
            </div>
            <Switch
              id="identificacao-emergencia"
              checked={config.identificacaoEmergencia}
              onCheckedChange={(checked) => handleConfigChange('identificacaoEmergencia', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Validações e Controles
          </CardTitle>
          <CardDescription>
            Configure as validações do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="validacao-duplicatas">Validação de Duplicatas</Label>
              <p className="text-sm text-gray-600">
                Sempre validar duplicatas em novos cadastros
              </p>
            </div>
            <Switch
              id="validacao-duplicatas"
              checked={config.validacaoDuplicatas}
              onCheckedChange={(checked) => handleConfigChange('validacaoDuplicatas', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="alerta-recem-nascidos">Alertas de Recém-Nascidos</Label>
              <p className="text-sm text-gray-600">
                Exibir alertas para atualização de cadastros de recém-nascidos
              </p>
            </div>
            <Switch
              id="alerta-recem-nascidos"
              checked={config.alertaRecemNascidos}
              onCheckedChange={(checked) => handleConfigChange('alertaRecemNascidos', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Segurança e Sessão
          </CardTitle>
          <CardDescription>
            Configure tempos e segurança do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tempo-sessao">Tempo de Sessão (minutos)</Label>
            <div className="flex items-center gap-2">
              <input
                id="tempo-sessao"
                type="number"
                min="5"
                max="120"
                value={config.tempoSessao}
                onChange={(e) => handleConfigChange('tempoSessao', parseInt(e.target.value))}
                className="w-20 px-3 py-1 border rounded"
              />
              <span className="text-sm text-gray-600">
                Tempo limite para sessões de recepcionistas
              </span>
            </div>
          </div>

          {config.tempoSessao < 15 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Tempos muito baixos podem causar interrupções no atendimento.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveConfig}>
          <Settings className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
