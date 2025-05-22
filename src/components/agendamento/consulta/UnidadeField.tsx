
import React from "react";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { UNIDADES } from "../utils/mockData";

interface UnidadeFieldProps {
  form: UseFormReturn<any>;
}

const UnidadeField: React.FC<UnidadeFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="unidade"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Unidade de Saúde</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
