interface User {
  id: string;
  nome: string;
  email: string;
  cpfCnpj: string;          
  telefone?: string;        
  dataNascimento?: string;  
  loja?: {
    id: string;
    nomeLoja: string;       
    idCategoria: number;
    categoria: string;    
    subdominio: string;
    descricao?: string;     
    avaliacao?: number;     
    logo?: string;          
  };
}