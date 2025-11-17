// Função para formatar CPF ou CNPJ
export const formatCPFOrCNPJ = (value: string) => {
  const numbers = value.replace(/\D/g, "")  // Remove caracteres não numéricos

  if (numbers.length <= 11) {
    // Formata como CPF
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
    }
  } else {
    // Formata como CNPJ
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
  }
}

// Função para formatar celular: (99) 9 9999-9999
export const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, "")

  if (numbers.length <= 2) {
    return `(${numbers}`
  } else if (numbers.length <= 3) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }
}
