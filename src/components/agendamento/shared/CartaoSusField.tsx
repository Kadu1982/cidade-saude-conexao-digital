
import React from "react";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CartaoSusFieldProps {
  form: UseFormReturn<any>;
}

const CartaoSusField: React.FC<CartaoSusFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="cartaoSus"
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>Cartão SUS</FormLabel>
          <FormControl>
            <Input 
              placeholder="000 0000 0000 0000" 
              className={form.formState.errors.cartaoSus && "border-destructive focus-visible:ring-destructive"} 
              {...field} 
            />
          </FormControl>
          <FormMessage className="text-destructive" />
        </FormItem>
      )}
    />
  );
};

export default CartaoSusField;
