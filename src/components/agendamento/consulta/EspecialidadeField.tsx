
import React from "react";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ESPECIALIDADES } from "../utils/mockData";

interface EspecialidadeFieldProps {
  form: UseFormReturn<any>;
  isSubmitting?: boolean;
}

const EspecialidadeField: React.FC<EspecialidadeFieldProps> = ({ form, isSubmitting = false }) => {
  return (
    <FormField
      control={form.control}
      name="especialidade"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Especialidade</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a especialidade" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {ESPECIALIDADES.map((esp) => (
                <SelectItem key={esp} value={esp}>{esp}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EspecialidadeField;
