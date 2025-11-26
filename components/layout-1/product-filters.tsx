"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import type { ProductFilters } from "@/types/cart"

interface ProductFiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  categories: { idCategoriaProduto: number; tituloCategoriaProduto: string }[]; // Array de categorias
}

export function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const handlegeneroChange = (value: string) => {
    onFilterChange({ ...filters, genero: value as any })
  }

  const handletipoRoupaChange = (value: string) => {
    onFilterChange({ ...filters, tipoRoupa: value as any })
  }

  const handleSortChange = (value: string) => {
    onFilterChange({ ...filters, ordemClassificacao: value as any })
  }

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, pesquisaConsulta: value })
  }

  const clearFilters = () => {
    onFilterChange({
      genero: "todos",
      tipoRoupa: "todos",
      ordemClassificacao: "lancamentos",
      pesquisaConsulta: "",
    })
  }

  const hasActiveFilters =
    filters.genero !== "todos" ||
    filters.tipoRoupa !== "todos" ||
    filters.ordemClassificacao !== "lancamentos" ||
    filters.pesquisaConsulta !== ""

    

  return (
    <div className="space-y-4">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Buscar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produtos..."
              value={filters.pesquisaConsulta || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Filtros Ativos</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar
            </Button>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {filters.genero !== "todos" && (
              <Badge variant="secondary" className="gap-1">
                {filters.genero}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handlegeneroChange("todos")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.tipoRoupa !== "todos" && (
              <Badge variant="secondary" className="gap-1">
                {filters.tipoRoupa}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handletipoRoupaChange("todos")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.pesquisaConsulta && (
              <Badge variant="secondary" className="gap-1">
                &quot{filters.pesquisaConsulta}&quot
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleSearchChange("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* genero Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gênero</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.genero || "todos"} onValueChange={handlegeneroChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="todos" id="genero-all" />
              <Label htmlFor="genero-all" className="font-normal cursor-pointer">
                Todos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="masculino" id="genero-male" />
              <Label htmlFor="genero-male" className="font-normal cursor-pointer">
                Masculino
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="feminino" id="genero-female" />
              <Label htmlFor="genero-female" className="font-normal cursor-pointer">
                Feminino
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unissex" id="genero-unisex" />
              <Label htmlFor="genero-unisex" className="font-normal cursor-pointer">
                Unissex
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Clothing Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tipo de Roupa</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.tipoRoupa || "todos"} onValueChange={handletipoRoupaChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="todos" id="type-all" />
              <Label htmlFor="type-all" className="font-normal cursor-pointer">
                Todos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="camiseta" id="type-shirt" />
              <Label htmlFor="type-shirt" className="font-normal cursor-pointer">
                Camiseta
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bermuda" id="type-shorts" />
              <Label htmlFor="type-shorts" className="font-normal cursor-pointer">
                Bermuda
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="calca" id="type-pants" />
              <Label htmlFor="type-pants" className="font-normal cursor-pointer">
                Calça
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vestido" id="type-dress" />
              <Label htmlFor="type-dress" className="font-normal cursor-pointer">
                Vestido
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="saia" id="type-skirt" />
              <Label htmlFor="type-skirt" className="font-normal cursor-pointer">
                Saia
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="jaqueta" id="type-jacket" />
              <Label htmlFor="type-jacket" className="font-normal cursor-pointer">
                Jaqueta
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blusa" id="type-blouse" />
              <Label htmlFor="type-blouse" className="font-normal cursor-pointer">
                Blusa
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Sort Order */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ordenar Por</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.ordemClassificacao || "lancamentos"} onValueChange={handleSortChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lancamentos" id="sort-newest" />
              <Label htmlFor="sort-newest" className="font-normal cursor-pointer">
                Lançamentos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="menor-preco" id="sort-price-asc" />
              <Label htmlFor="sort-price-asc" className="font-normal cursor-pointer">
                Menor Preço
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maior-preco" id="sort-price-desc" />
              <Label htmlFor="sort-price-desc" className="font-normal cursor-pointer">
                Maior Preço
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mais-vendidos" id="sort-popular" />
              <Label htmlFor="sort-popular" className="font-normal cursor-pointer">
                Mais Vendidos
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
