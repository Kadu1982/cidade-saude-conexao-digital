
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onReset: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onReset }) => {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" type="button" onClick={onReset}>
        Cancelar
      </Button>
      <Button type="submit">Confirmar Agendamento</Button>
    </div>
  );
};

export default FormActions;
