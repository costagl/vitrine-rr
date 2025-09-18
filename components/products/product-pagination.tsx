"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import type { ProductPaginationType } from "@/types/product"

interface ProductPaginationProps {
  pagination: ProductPaginationType
  onPageChange: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function ProductPagination({ pagination, onPageChange, onLimitChange }: ProductPaginationProps) {
  const { total, paginas, paginaAtual, limite } = pagination

  // Gerar array de páginas para exibição
  const getPageNumbers = () => {
    const maxPagesToShow = 5
    const pages = []

    // Sempre mostrar a primeira página
    if (paginas > 0) {
      pages.push(1)
    }

    // Calcular o intervalo de páginas a mostrar
    let startPage = Math.max(2, paginaAtual - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(paginas - 1, startPage + maxPagesToShow - 3)

    // Ajustar se estiver próximo do início
    if (startPage <= 2) {
      startPage = 2
      endPage = Math.min(paginas - 1, startPage + maxPagesToShow - 3)
    }

    // Ajustar se estiver próximo do fim
    if (endPage >= paginas - 1) {
      endPage = paginas - 1
      startPage = Math.max(2, endPage - (maxPagesToShow - 3))
    }

    // Adicionar elipses se necessário
    if (startPage > 2) {
      pages.push("ellipsis-start")
    }

    // Adicionar páginas do intervalo
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Adicionar elipses se necessário
    if (endPage < paginas - 1) {
      pages.push("ellipsis-end")
    }

    // Sempre mostrar a última página se houver mais de uma
    if (paginas > 1) {
      pages.push(paginas)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-gray-500">
        Mostrando {Math.min(limite * (paginaAtual - 1) + 1, total)} a {Math.min(limite * paginaAtual, total)} de {total}{" "}
        produtos
      </div>

      <div className="flex items-center gap-2">
        {/* Botões de navegação */}
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={paginaAtual === 1}
            className="h-8 w-8"
            aria-label="Primeira página"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            className="h-8 w-8 ml-1"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Números das páginas */}
          <div className="flex items-center mx-2">
            {pageNumbers.map((page, index) => {
              if (page === "ellipsis-start" || page === "ellipsis-end") {
                return (
                  <span key={`ellipsis-${index}`} className="px-2">
                    ...
                  </span>
                )
              }

              return (
                <Button
                  key={`page-${page}`}
                  variant={paginaAtual === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className="h-8 w-8 mx-0.5"
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(paginaAtual + 1)}
            disabled={paginaAtual === paginas}
            className="h-8 w-8 mr-1"
            aria-label="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(paginas)}
            disabled={paginaAtual === paginas}
            className="h-8 w-8"
            aria-label="Última página"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Seletor de itens por página */}
        {onLimitChange && (
          <div className="flex items-center ml-4">
            <span className="text-sm text-gray-500 mr-2">Itens por página:</span>
            <Select value={limite.toString()} onValueChange={(value) => onLimitChange(Number.parseInt(value))}>
              <SelectTrigger className="h-8 w-20">
                <SelectValue placeholder={limite.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}
