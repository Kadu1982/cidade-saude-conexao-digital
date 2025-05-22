
import React from "react";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface PrioridadeFieldProps {
  form: UseFormReturn<any>;
  isSubmitting?: boolean;
}

const PrioridadeField: React.FC<PrioridadeFieldProps> = ({ form, isSubmitting = false }) => {
  return (
    <FormField
      control={form.control}
      name="prioridade"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Prioridade</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a prioridade" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="urgente">Urgente</SelectItem>
              <SelectItem value="emergencia">Emergência</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PrioridadeField;
