
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ValidationConfig } from '@/services/duplicateValidationService';

interface ValidationSettingsProps {
  config: ValidationConfig;
  onConfigChange: (config: ValidationConfig) => void;
}

export const ValidationSettings: React.FC<ValidationSettingsProps> = ({
  config,
  onConfigChange
}) => {
  const handleToggle = (field: keyof ValidationConfig) => {
    onConfigChange({
      ...config,
      [field]: !config[field]
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Configurações de Validação</CardTitle>
        <CardDescription>
          Configure quando a validação de duplicatas deve ser executada
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="enableValidation"
            checked={config.enableValidation}
            onCheckedChange={() => handleToggle('enableValidation')}
          />
          <Label htmlFor="enableValidation">
            Habilitar validação de duplicatas
          </Label>
        </div>
        
        {config.enableValidation && (
          <>
            <div className="flex items-center space-x-2">
              <Switch
                id="validateNewborns"
                checked={config.validateNewborns}
                onCheckedChange={() => handleToggle('validateNewborns')}
              />
              <Label htmlFor="validateNewborns">
                Validar recém-nascidos (menos de 1 ano)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="validateWithoutCPF"
                checked={config.validateWithoutCPF}
                onCheckedChange={() => handleToggle('validateWithoutCPF')}
              />
              <Label htmlFor="validateWithoutCPF">
                Validar pacientes sem CPF
              </Label>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
