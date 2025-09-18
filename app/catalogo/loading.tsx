import { Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CatalogoLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar Skeleton */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Barra de Busca e Filtros Skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Campo de Busca Skeleton */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Botão de Filtros Mobile Skeleton */}
            <div className="lg:hidden">
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Filtros de Categoria Skeleton */}
          <div className="mt-4">
            <Skeleton className="h-4 w-32 mb-3" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
          </div>

          {/* Resultados Skeleton */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Grid de Lojas Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Imagem da Loja Skeleton */}
              <div className="relative">
                <Skeleton className="w-full h-48" />
                <div className="absolute top-3 right-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>

              {/* Conteúdo do Card Skeleton */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex items-center gap-1 ml-2">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Skeleton key={starIndex} className="h-4 w-4" />
                    ))}
                  </div>
                </div>

                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-3" />

                {/* Informações da Loja Skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>

                {/* URL da Loja Skeleton */}
                <div className="mb-4">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>

                {/* Botão de Visitar Skeleton */}
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas do Catálogo Skeleton */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
