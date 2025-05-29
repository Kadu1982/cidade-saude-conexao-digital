
import React, { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { baseCadastro, Paciente } from "@/services/baseCadastro";

interface PatientSearchProps {
  onSelectPatient: (patient: { name: string, cartaoSus: string, id?: string }) => void;
  className?: string;
  placeholder?: string;
}

const PatientSearch: React.FC<PatientSearchProps> = ({
  onSelectPatient,
  className,
  placeholder = "Buscar paciente por nome..."
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Paciente[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  console.log("PatientSearch: searchTerm =", searchTerm);
  console.log("PatientSearch: filteredPatients =", filteredPatients);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setIsSearching(true);
      try {
        // Usar a base única de cadastro para buscar pacientes
        const results = baseCadastro.buscarPacientesPorNome(searchTerm) || [];
        console.log("PatientSearch: search results =", results);
        setFilteredPatients(results);
      } catch (error) {
        console.error("PatientSearch: error searching patients =", error);
        setFilteredPatients([]);
      }
      setIsSearching(false);
    } else {
      setFilteredPatients([]);
      setIsSearching(false);
    }
  }, [searchTerm]);

  const handleSelect = (patient: Paciente) => {
    console.log("PatientSearch: handleSelect =", patient);
    if (patient && patient.nome) {
      onSelectPatient({ 
        name: patient.nome, 
        cartaoSus: patient.cartaoSus || "",
        id: patient.id
      });
      setSearchTerm(patient.nome);
    }
  };

  const handleValueChange = (value: string) => {
    console.log("PatientSearch: handleValueChange =", value);
    setSearchTerm(value);
  };

  return (
    <div className={cn("relative", className)}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder={placeholder}
          value={searchTerm}
          onValueChange={handleValueChange}
          className="h-10"
        />
        {searchTerm.length > 1 && (
          <CommandGroup className="max-h-64 overflow-auto">
            <CommandEmpty>
              {isSearching ? "Buscando..." : "Nenhum paciente encontrado."}
            </CommandEmpty>
            {Array.isArray(filteredPatients) && filteredPatients.length > 0 && 
              filteredPatients.map((patient) => (
                <CommandItem
                  key={patient.id || patient.nome}
                  value={patient.nome}
                  onSelect={() => handleSelect(patient)}
                  className="flex justify-between py-3 px-2 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-gray-500" />
                    <div>
                      <span className="font-medium">{patient.nome}</span>
                      <div className="text-xs text-gray-500">
                        CPF: {patient.cpf || "Não informado"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      SUS: {patient.cartaoSus || "Não informado"}
                    </span>
                    {patient.prioridade === 'prioritario' && (
                      <div className="text-xs text-amber-600 font-medium">Prioritário</div>
                    )}
                  </div>
                </CommandItem>
              ))
            }
          </CommandGroup>
        )}
      </Command>
    </div>
  );
};

export default PatientSearch;
