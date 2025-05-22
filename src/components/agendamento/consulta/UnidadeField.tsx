
import React from "react";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { UNIDADES } from "../utils/mockData";

interface UnidadeFieldProps {
  form: UseFormReturn<any>;
  isSubmitting?: boolean;
}

const UnidadeField: React.FC<UnidadeFieldProps> = ({ form, isSubmitting = false }) => {
  return (
    <FormField
      control={form.control}
      name="unidade"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Unidade de Saúde</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {UNIDADES.map((unidade) => (
                <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UnidadeField;
