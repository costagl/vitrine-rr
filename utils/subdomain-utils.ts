// Função para normalizar subdomínio
export const normalizeSubdomain = (value: string): string => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9-]/g, "") // Remove caracteres especiais, mantém apenas letras, números e hífens
    .replace(/^-+|-+$/g, "") // Remove hífens no início e fim
    .replace(/-+/g, "-") // Remove hífens duplicados
    .substring(0, 30) // Limita a 30 caracteres
}

// Função para validar subdomínio
export const validateSubdomain = (subdomain: string): string | null => {
  if (!subdomain) {
    return "Subdomínio é obrigatório"
  }

  if (subdomain.length < 3) {
    return "Subdomínio deve ter pelo menos 3 caracteres"
  }

  if (subdomain.length > 30) {
    return "Subdomínio deve ter no máximo 30 caracteres"
  }

  if (!/^[a-z0-9-]+$/.test(subdomain)) {
    return "Subdomínio deve conter apenas letras minúsculas, números e hífens"
  }

  if (subdomain.startsWith("-") || subdomain.endsWith("-")) {
    return "Subdomínio não pode começar ou terminar com hífen"
  }

  if (subdomain.includes("--")) {
    return "Subdomínio não pode conter hífens consecutivos"
  }

  // Lista de subdomínios reservados
  const reservedSubdomains = [
    "www",
    "api",
    "admin",
    "app",
    "mail",
    "ftp",
    "blog",
    "shop",
    "store",
    "help",
    "support",
    "docs",
    "dev",
    "test",
    "staging",
    "prod",
    "production",
    "vitrine",
    "dashboard",
    "panel",
    "control"
  ]

  if (reservedSubdomains.includes(subdomain)) {
    return "Este subdomínio está reservado e não pode ser usado"
  }

  return null
}

// TODO:
// Função para gerar sugestões de subdomínio
// export const generateSubdomainSuggestions = (baseName: string): string[] => {
//   const normalized = normalizeSubdomain(baseName)
//   const suggestions: string[] = []

//   if (normalized) {
//     suggestions.push(`${normalized}-loja`)
//     suggestions.push(`${normalized}-store`)
//     suggestions.push(`loja-${normalized}`)
//     suggestions.push(`${normalized}123`)
//     suggestions.push(`${normalized}-oficial`)

//     // Adicionar números aleatórios
//     for (let i = 0; i < 3; i++) {
//       const randomNum = Math.floor(Math.random() * 999) + 1
//       suggestions.push(`${normalized}${randomNum}`)
//     }
//   }

//   return suggestions.slice(0, 5) // Retorna apenas 5 sugestões
// }

// // Função para gerar subdomínio a partir do nome da loja
// export const generateSubdomainFromStoreName = (storeName: string): string => {
//   return normalizeSubdomain(storeName)
// }
