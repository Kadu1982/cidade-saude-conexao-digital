
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

interface FormActionsProps {
  onReset: () => void;
  isSubmitting?: boolean;
  hasErrors?: boolean;
  submitText?: string;
  resetText?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onReset, 
  isSubmitting = false,
  hasErrors = false,
  submitText = "Confirmar Agendamento", 
  resetText = "Cancelar"
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
          {resetText}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            submitText
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
