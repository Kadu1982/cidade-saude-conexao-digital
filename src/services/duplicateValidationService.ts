import { pacientes } from '@/data/mockData';

export interface PatientData {
  nome: string;
  nomeMae: string;
  cpfMae: string;
}

export interface ValidationResult {
  isDuplicate: boolean;
  possibleDuplicates: any[];
  aiAnalysis: string;
}

export interface ValidationConfig {
  enableValidation: boolean;
  validateNewborns: boolean;
  validateWithoutCPF: boolean;
}

// Simulação de uma API de IA para validação de duplicatas
const simulateAIValidation = async (newPatient: PatientData, possibleDuplicates: any[]): Promise<string> => {
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Lógica de validação baseada nos critérios definidos
  for (const existing of possibleDuplicates) {
    // Comparação de CPF da mãe (critério mais forte)
    if (existing.cpfMae && newPatient.cpfMae && existing.cpfMae === newPatient.cpfMae) {
      // Se CPF da mãe é igual, verifica similaridade dos nomes
      const namesSimilar = isNamesSimilar(newPatient.nome, existing.nome);
      const motherNamesSimilar = isNamesSimilar(newPatient.nomeMae, existing.nomeMae);
      
      if (namesSimilar && motherNamesSimilar) {
        return "DUPLICADO";
      }
    }
    
    // Comparação mais rigorosa para nomes muito similares
    const exactNameMatch = normalizeString(newPatient.nome) === normalizeString(existing.nome);
    const exactMotherNameMatch = normalizeString(newPatient.nomeMae) === normalizeString(existing.nomeMae);
    
    if (exactNameMatch && exactMotherNameMatch) {
      return "DUPLICADO";
    }
  }
  
  return "ÚNICO";
};

// Função para normalizar strings para comparação
const normalizeString = (str: string): string => {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
    .trim();
};

// Função para verificar similaridade entre nomes
const isNamesSimilar = (name1: string, name2: string): boolean => {
  const normalized1 = normalizeString(name1);
  const normalized2 = normalizeString(name2);
  
  // Verifica se um nome está contido no outro (para casos como "João" vs "João Silva")
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) {
    return true;
  }
  
  // Calcula similaridade por distância de edição simplificada
  const similarity = calculateSimilarity(normalized1, normalized2);
  return similarity > 0.8; // 80% de similaridade
};

// Função simplificada para calcular similaridade
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

// Implementação da distância de Levenshtein
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

export const validatePatientDuplicate = async (
  newPatient: PatientData, 
  config: ValidationConfig = { enableValidation: true, validateNewborns: true, validateWithoutCPF: true }
): Promise<ValidationResult> => {
  console.log('Iniciando validação de duplicatas para:', newPatient);
  console.log('Configuração de validação:', config);
  
  // Validação sempre ativa, exceto para recém-nascidos quando o toggle estiver desabilitado
  // Não há mais verificação de enableValidation pois sempre deve validar
  
  // Busca possíveis duplicatas na base de dados
  const possibleDuplicates = pacientes.filter(patient => {
    const nameMatch = isNamesSimilar(newPatient.nome, patient.nome);
    const motherNameMatch = patient.nomeMae ? isNamesSimilar(newPatient.nomeMae, patient.nomeMae) : false;
    
    return nameMatch || motherNameMatch;
  });
  
  console.log('Possíveis duplicatas encontradas:', possibleDuplicates.length);
  
  if (possibleDuplicates.length === 0) {
    return {
      isDuplicate: false,
      possibleDuplicates: [],
      aiAnalysis: "ÚNICO"
    };
  }
  
  // Analisa com IA
  const aiAnalysis = await simulateAIValidation(newPatient, possibleDuplicates);
  
  return {
    isDuplicate: aiAnalysis === "DUPLICADO",
    possibleDuplicates,
    aiAnalysis
  };
};
