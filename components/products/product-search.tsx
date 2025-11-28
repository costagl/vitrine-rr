"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import type { ProductSearchParams } from "@/types/product";
import { CategoryProduct } from "@/types/category";
import { useDebounce } from "@/hooks/use-debounce";

interface ProductSearchProps {
  searchParams: ProductSearchParams;
  onSearchChange: (params: Partial<ProductSearchParams>) => void;
  categories: CategoryProduct[];
}

export function ProductSearch({
  searchParams,
  onSearchChange,
  categories,
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState(searchParams.busca || "");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const categoryTitles = useMemo(() => {
    if (categories.length === 0) return {};
    const titles: { [key: string]: string } = {};
    for (const category of categories) {
      titles[category.id] = category.titulo;
    }
    return titles;
  }, [categories]);

  // Atualizar busca quando o termo digitado for alterado (com debounce)
  useEffect(() => {
    if (debouncedSearchTerm !== searchParams.busca) {
      onSearchChange({ busca: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, onSearchChange, searchParams.busca]);
 // A dependência agora é o tamanho do array de categorias

  // Manipuladores de mudança nos filtros
  const handleCategoryChange = (value: string) => {
    onSearchChange({
      idCategoriaProduto: value === "all" ? undefined : value,
    });
  };

  // Manipulador de mudança no filtro de ativo/inativo
  const handleActiveChange = (value: string) => {
    const activeMap: Record<string, number | null> = {
      todos: null,
      ativos: 1,
      inativos: 0,
    };

    onSearchChange({ ativo: activeMap[value] });
  };

  // Limpar campo de busca
  const handleClearSearch = () => {
    setSearchTerm("");
    onSearchChange({ busca: "" });
  };

  // Obter valor atual do filtro de ativo/inativo
  const getActiveValue = () => {
    if (searchParams.ativo === 1) return "ativos";
    if (searchParams.ativo === 0) return "inativos";
    return "todos";
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campo de busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar produtos por título, SKU ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filtro por categoria */}
          <Select
            value={searchParams.idCategoriaProduto?.toString() || "all"}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.titulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtro por status (ativo/inativo) */}
          <Select value={getActiveValue()} onValueChange={handleActiveChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status do produto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os produtos</SelectItem>
              <SelectItem value="ativos">Produtos ativos</SelectItem>
              <SelectItem value="inativos">Produtos inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Indicadores de filtros ativos */}
        <div className="flex flex-wrap gap-2 mt-3">
          {searchParams.busca && (
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center">
              Busca: {searchParams.busca}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  onSearchChange({ busca: "" });
                }}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {searchParams.idCategoriaProduto && (
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center">
              {/* Usando o título da categoria diretamente da prop */}
              Categoria: {
                categories.find(c => c.id.toString() === searchParams.idCategoriaProduto)?.titulo || "Carregando..."
              }
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  onSearchChange({ idCategoriaProduto: undefined })
                }
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {searchParams.ativo !== null && searchParams.ativo !== undefined && (
            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center">
              Status: {searchParams.ativo === 1 ? "Ativos" : "Inativos"}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange({ ativo: null })}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
