
import React from "react";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PROFISSIONAIS } from "../utils/mockData";

interface ProfissionalFieldProps {
  form: UseFormReturn<any>;
}

const ProfissionalField: React.FC<ProfissionalFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="profissional"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profissional</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o profissional" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {PROFISSIONAIS.map((prof) => (
                <SelectItem key={prof} value={prof}>{prof}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProfissionalField;
