"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Image from "next/image";
import {
  Search,
  Filter,
  ExternalLink,
  Star,
  MapPin,
  Users,
} from "lucide-react";
import { CategoryService } from "@/services/category-service";

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
  logotipo?: string;
  imagemCapa: string;
  isActive: boolean;
  criadaEm: string;
  tituloTema: string;
  tituloLayout: string;
}

export default function CatalogoPage() {
  const [lojas, setLojas] = useState<Store[]>([]);
  const [lojasFiltradas, setLojasFiltradas] = useState<Store[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas as Categorias");
  const [termoBusca, setTermoBusca] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Buscar categorias da API ao montar o componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categorias = await CategoryService.listarCategoriasLoja(); // Espera a resposta da API
        const formattedCategories = categorias.map((category) => ({
          value: category.id.toString(),
          label: category.titulo,
        }));
        setCategoryOptions(formattedCategories); // Atualiza o estado com os dados formatados
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  // Buscar lojas da API ao montar o componente
  useEffect(() => {
    fetch("https://vitrineapi.duckdns.org/loja", {
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
          logotipo: loja.logotipo,
          descricao: loja.descricao || "Descrição não disponível",
          rating: loja.avaliacao || 5,
          totalAvaliacoes: loja.totalAvaliacoes || 5,
          cidade: loja.cidade || "Resende",
          estado: loja.estado || "RJ",
          totalProdutos: loja.totalProdutos || 20,
          imagemCapa: loja.logotipo || "/placeholder.svg?height=200&width=300",
          ativo: loja.ativo || true,
          criadaEm: loja.dataCriacao || "2025-01-01",
          tituloTema: loja.tituloTema || "tema-1",
          tituloLayout: loja.tituloLayout || "layout-1",
        }));
        setLojas(lojasData);
      })
      .catch((error) => {
        console.error("Erro ao listar lojas:", error);
      });
  }, []);

  useEffect(() => {
    const filtrarLojas = async () => {
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

      if (JSON.stringify(lojasFiltradas) !== JSON.stringify(resultado)) {
        setLojasFiltradas(resultado);
      }
    };

    filtrarLojas(); // Chama a função assíncrona para filtrar as lojas
  }, [categoriaFiltro, termoBusca, lojas, lojasFiltradas]);

  // Função para abrir a loja com o layout correto
  const abrirLoja = async (
    tituloLayout: string,
    subdominio: string,
    idLoja: string
  ) => {
    const storeUrl = `http://localhost:3000/loja/${tituloLayout}/?subdominio=${subdominio}&idLoja=${idLoja}`;
    window.open(storeUrl, "_blank");
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
              {categoryOptions.map((categoria) => (
                <Button
                  key={categoria.value}
                  variant={
                    categoriaFiltro === categoria.label ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setCategoriaFiltro(categoria.label)}
                  className="text-xs"
                >
                  {categoria.label}
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
        {lojasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lojasFiltradas.map((loja) => (
              <div
                key={loja.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Imagem da Loja */}
                <div className="relative">
                  <Image
                    src={loja.logotipo || "/placeholder.svg"}
                    alt={loja.nome}
                    className="w-full h-48 object-cover"
                    width={500}
                    height={300}
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
                      <Star className="h-4 w-4" />
                      <span>&nbsp;{loja.totalAvaliacoes} avaliações</span>
                    </div>
                  </div>

                  {/* URL da Loja */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">URL da loja:</p>
                    <p className="text-sm text-primary font-medium">
                      {loja.subdomain}.vitrine.com.br
                    </p>
                  </div>

                  {/* Botão de Visitar Loja */}
                  <Button
                    onClick={() => abrirLoja(loja.tituloLayout, loja.subdomain, loja.id)}
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
      </div>
    </div>
  );
}
