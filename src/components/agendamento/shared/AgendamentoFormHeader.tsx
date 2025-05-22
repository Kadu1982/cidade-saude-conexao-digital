
import React from "react";
import { FormField, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PatientSearch from "@/components/shared/PatientSearch";
import { UseFormReturn } from "react-hook-form";

interface AgendamentoFormHeaderProps {
  form: UseFormReturn<any>;
  handlePatientSelect: (patient: { name: string, cartaoSus: string }) => void;
  isSubmitting?: boolean;
}

const AgendamentoFormHeader: React.FC<AgendamentoFormHeaderProps> = ({
  form,
  handlePatientSelect,
  isSubmitting = false
}) => {
  return (
    <div className="md:col-span-2">
      <FormLabel>Nome do Paciente</FormLabel>
      <PatientSearch 
        onSelectPatient={handlePatientSelect}
        placeholder="Digite o nome do paciente..."
        className="mb-2"
      />
      <FormField
        control={form.control}
        name="paciente"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default AgendamentoFormHeader;
