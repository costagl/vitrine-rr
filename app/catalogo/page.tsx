"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import {
  Search,
  Filter,
  ExternalLink,
  Star,
  MapPin,
  Users,
} from "lucide-react";

// CONTROLE DE SIMULAÇÃO
const ENABLE_SIMULATION = false;

interface Store {
  id: string;
  nome: string;
  categoria: string;
  subdomain: string;
  descricao: string;
  rating: number;
  totalAvaliacoes: number;
  cidade: string;
  estado: string;
  totalProdutos: number;
  imagemCapa: string;
  isActive: boolean;
  criadaEm: string;
}

const categorias = [
  "Todas as Categorias",
  "Roupas e Moda",
  "Eletrônicos",
  "Beleza e Cuidados Pessoais",
  "Casa e Decoração",
  "Esportes e Lazer",
  "Brinquedos e Jogos",
  "Alimentos e Bebidas",
  "Livros",
  "Papelaria e Escritório",
  "Pet Shop",
  "Saúde e Bem-Estar",
];

// Dados simulados de lojas
const lojasMock: Store[] = [
  {
    id: "1",
    nome: "Moda Elegante",
    categoria: "Roupas e Moda",
    subdomain: "moda-elegante",
    descricao:
      "Roupas femininas e masculinas com estilo e qualidade. Tendências da moda nacional e internacional.",
    rating: 4.8,
    totalAvaliacoes: 127,
    cidade: "São Paulo",
    estado: "SP",
    totalProdutos: 245,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-01-15",
  },
  {
    id: "2",
    nome: "TechWorld",
    categoria: "Eletrônicos",
    subdomain: "techworld",
    descricao:
      "Os melhores produtos eletrônicos com preços competitivos. Smartphones, notebooks, acessórios e muito mais.",
    rating: 4.6,
    totalAvaliacoes: 89,
    cidade: "Rio de Janeiro",
    estado: "RJ",
    totalProdutos: 156,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-02-20",
  },
  {
    id: "3",
    nome: "Beleza Natural",
    categoria: "Beleza e Cuidados Pessoais",
    subdomain: "beleza-natural",
    descricao:
      "Produtos de beleza e cuidados pessoais com ingredientes naturais. Cosméticos, perfumes e tratamentos.",
    rating: 4.9,
    totalAvaliacoes: 203,
    cidade: "Belo Horizonte",
    estado: "MG",
    totalProdutos: 189,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-03-10",
  },
  {
    id: "4",
    nome: "Casa & Estilo",
    categoria: "Casa e Decoração",
    subdomain: "casa-estilo",
    descricao:
      "Móveis, decoração e utensílios para deixar sua casa ainda mais bonita e funcional.",
    rating: 4.5,
    totalAvaliacoes: 76,
    cidade: "Curitiba",
    estado: "PR",
    totalProdutos: 312,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-01-28",
  },
  {
    id: "5",
    nome: "Esporte Total",
    categoria: "Esportes e Lazer",
    subdomain: "esporte-total",
    descricao:
      "Equipamentos esportivos, roupas fitness e acessórios para todos os tipos de esporte e atividade física.",
    rating: 4.7,
    totalAvaliacoes: 154,
    cidade: "Porto Alegre",
    estado: "RS",
    totalProdutos: 278,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-02-14",
  },
  {
    id: "6",
    nome: "Mundo dos Brinquedos",
    categoria: "Brinquedos e Jogos",
    subdomain: "mundo-brinquedos",
    descricao:
      "Brinquedos educativos, jogos e diversão para crianças de todas as idades. Qualidade e segurança garantidas.",
    rating: 4.8,
    totalAvaliacoes: 92,
    cidade: "Salvador",
    estado: "BA",
    totalProdutos: 167,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-03-05",
  },
  {
    id: "7",
    nome: "Sabores & Delícias",
    categoria: "Alimentos e Bebidas",
    subdomain: "sabores-delicias",
    descricao:
      "Produtos gourmet, bebidas especiais e alimentos selecionados para os paladares mais exigentes.",
    rating: 4.6,
    totalAvaliacoes: 118,
    cidade: "Fortaleza",
    estado: "CE",
    totalProdutos: 134,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-01-22",
  },
  {
    id: "8",
    nome: "Livraria Conhecimento",
    categoria: "Livros",
    subdomain: "livraria-conhecimento",
    descricao:
      "Livros de todos os gêneros, literatura nacional e internacional, livros técnicos e educacionais.",
    rating: 4.9,
    totalAvaliacoes: 167,
    cidade: "Brasília",
    estado: "DF",
    totalProdutos: 892,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-02-08",
  },
  {
    id: "9",
    nome: "Papelaria Criativa",
    categoria: "Papelaria e Escritório",
    subdomain: "papelaria-criativa",
    descricao:
      "Material escolar, produtos de escritório e artigos criativos para estudantes e profissionais.",
    rating: 4.4,
    totalAvaliacoes: 83,
    cidade: "Recife",
    estado: "PE",
    totalProdutos: 456,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-03-12",
  },
  {
    id: "10",
    nome: "Pet Amigo",
    categoria: "Pet Shop",
    subdomain: "pet-amigo",
    descricao:
      "Tudo para seu pet: ração, brinquedos, acessórios e produtos de higiene para cães, gatos e outros animais.",
    rating: 4.7,
    totalAvaliacoes: 145,
    cidade: "Goiânia",
    estado: "GO",
    totalProdutos: 223,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-01-30",
  },
  {
    id: "11",
    nome: "Vida Saudável",
    categoria: "Saúde e Bem-Estar",
    subdomain: "vida-saudavel",
    descricao:
      "Suplementos, produtos naturais e equipamentos para uma vida mais saudável e equilibrada.",
    rating: 4.5,
    totalAvaliacoes: 98,
    cidade: "Florianópolis",
    estado: "SC",
    totalProdutos: 187,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-02-25",
  },
  {
    id: "12",
    nome: "Fashion Kids",
    categoria: "Roupas e Moda",
    subdomain: "fashion-kids",
    descricao:
      "Moda infantil com estilo e conforto. Roupas para bebês, crianças e adolescentes.",
    rating: 4.8,
    totalAvaliacoes: 112,
    cidade: "Campinas",
    estado: "SP",
    totalProdutos: 198,
    imagemCapa: "/placeholder.svg?height=200&width=300",
    isActive: true,
    criadaEm: "2023-03-01",
  },
];

export default function CatalogoPage() {
  const [lojas, setLojas] = useState<Store[]>(ENABLE_SIMULATION ? lojasMock : []);
  const [lojasFiltradas, setLojasFiltradas] = useState<Store[]>(ENABLE_SIMULATION ? lojasMock : []);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas as Categorias");
  const [termoBusca, setTermoBusca] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    if (!ENABLE_SIMULATION) {
      fetch("https://localhost:7083/lojas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta da requisição");
          }
          return response.json();
        })
        .then((data) => {
          const lojasData = data.lojas.map((loja: any) => ({
            id: loja.id.toString(),
            nome: loja.nomeLoja,
            categoria: loja.categoriaLoja,
            subdomain: loja.subdominio,
            descricao: "Descrição não disponível", // Você pode adicionar descrições específicas, caso necessário
            rating: 0, // A avaliação pode vir de algum dado extra, ou você pode adicionar lógica para calcular isso
            totalAvaliacoes: 0, // A mesma coisa para avaliações
            cidade: "Resende",
            estado: "RJ",
            totalProdutos: 0, // Também pode ser fornecido de alguma outra maneira
            imagemCapa: "/placeholder.svg?height=200&width=300", // Ou você pode definir uma URL de imagem
            isActive: true, // Baseado na lógica de seu sistema
            criadaEm: "2023-01-01", // Data de criação fictícia ou real
          }));

          setLojas(lojasData);
        })
        .catch((error) => {
          console.error("Erro ao listar lojas:", error); // Trata erros
        });
    }

    let resultado = lojas;

    // Filtrar por categoria
    if (categoriaFiltro !== "Todas as Categorias") {
      resultado = resultado.filter(
        (loja) => loja.categoria === categoriaFiltro
      );
    }

    // Filtrar por termo de busca
    if (termoBusca) {
      resultado = resultado.filter(
        (loja) =>
          loja.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
          loja.descricao.toLowerCase().includes(termoBusca.toLowerCase()) ||
          loja.categoria.toLowerCase().includes(termoBusca.toLowerCase()) ||
          loja.cidade.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }

    setLojasFiltradas(resultado);
  }, [categoriaFiltro, termoBusca, lojas]);

  const abrirLoja = (subdomain: string) => {
    const lojaUrl = `https://${subdomain}.vitrine.com.br`;

    if (ENABLE_SIMULATION) {
      // Modo simulação - mostra alert
      alert(`Abrindo loja: ${lojaUrl}`);
    } else {
      // Modo real - apenas abre a URL
      window.open(lojaUrl, "_blank");
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Catálogo de Lojas</h1>
          <p className="text-gray-600">
            Descubra lojas incríveis e encontre exatamente o que você procura
          </p>
        </div>

        {/* Indicador de Simulação */}
        {ENABLE_SIMULATION && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                Modo Simulação Ativo - Os links das lojas mostrarão alertas em
                vez de abrir as páginas reais
              </span>
            </div>
          </div>
        )}

        {/* Barra de Busca e Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Campo de Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar lojas por nome, categoria ou cidade..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Botão de Filtros Mobile */}
            <Button
              variant="outline"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="lg:hidden flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          {/* Filtros de Categoria */}
          <div
            className={`mt-4 ${mostrarFiltros ? "block" : "hidden lg:block"}`}
          >
            <p className="text-sm font-medium text-gray-700 mb-3">
              Filtrar por categoria:
            </p>
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <Button
                  key={categoria}
                  variant={
                    categoriaFiltro === categoria ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setCategoriaFiltro(categoria)}
                  className="text-xs"
                >
                  {categoria}
                </Button>
              ))}
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {lojasFiltradas.length} loja
              {lojasFiltradas.length !== 1 ? "s" : ""} encontrada
              {lojasFiltradas.length !== 1 ? "s" : ""}
              {categoriaFiltro !== "Todas as Categorias" &&
                ` em "${categoriaFiltro}"`}
              {termoBusca && ` para "${termoBusca}"`}
            </p>
          </div>
        </div>

        {/* Grid de Lojas */}
        {!ENABLE_SIMULATION && lojasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lojasFiltradas.map((loja) => (
              <div
                key={loja.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Imagem da Loja */}
                <div className="relative">
                  <img
                    src={loja.imagemCapa || "/placeholder.svg"}
                    alt={loja.nome}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white/90">
                      {loja.categoria}
                    </Badge>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {loja.nome}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      {renderStars(loja.rating)}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {loja.descricao}
                  </p>

                  {/* Informações da Loja */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {loja.cidade}, {loja.estado}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{loja.totalProdutos} produtos</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>{loja.rating}</span>
                      <span>({loja.totalAvaliacoes} avaliações)</span>
                    </div>
                  </div>

                  {/* URL da Loja */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">URL da loja:</p>
                    <p className="text-sm text-primary font-medium">
                      {loja.subdomain}.vitrine.com.br
                    </p>
                  </div>

                  {/* Botão de Visitar */}
                  <Button
                    onClick={() => abrirLoja(loja.subdomain)}
                    className="w-full flex items-center justify-center gap-2"
                    size="sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visitar Loja
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma loja encontrada
            </h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os filtros ou termo de busca para encontrar mais
              resultados.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setCategoriaFiltro("Todas as Categorias");
                setTermoBusca("");
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Estatísticas do Catálogo */}
        {ENABLE_SIMULATION && (
          <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Estatísticas do Catálogo
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {lojas.length}
                </p>
                <p className="text-sm text-gray-500">Total de Lojas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {categorias.length - 1}
                </p>
                <p className="text-sm text-gray-500">Categorias</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {lojas.reduce((total, loja) => total + loja.totalProdutos, 0)}
                </p>
                <p className="text-sm text-gray-500">Total de Produtos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {(
                    lojas.reduce((total, loja) => total + loja.rating, 0) /
                    lojas.length
                  ).toFixed(1)}
                </p>
                <p className="text-sm text-gray-500">Avaliação Média</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
