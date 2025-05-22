
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface FormActionsProps {
  onReset: () => void;
  isSubmitting?: boolean;
  hasErrors?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onReset, 
  isSubmitting = false,
  hasErrors = false 
}) => {
  return (
    <div className="space-y-4">
      {hasErrors && (
        <Alert variant="destructive" className="mb-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Por favor, corrija os erros no formulário antes de prosseguir.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onReset} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processando..." : "Confirmar Agendamento"}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
