"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Package, CheckCircle, XCircle, DollarSign } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductStatsProps {
  products: Product[]
  isLoading: boolean
}

export function ProductStats({ products, isLoading }: ProductStatsProps) {
  // Calcular estatísticas
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.ativo === 1).length
  const inactiveProducts = totalProducts - activeProducts
  const totalStock = products.reduce((total, p) => total + p.estoque, 0)
  const totalValue = products.reduce((total, p) => {
    const price = p.valorPromocional || p.valorUnitario
    return total + price * p.estoque
  }, 0)

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="animate-pulse">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de Produtos</p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Produtos Ativos</p>
              <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Produtos Inativos</p>
              <p className="text-2xl font-bold text-red-600">{inactiveProducts}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Valor em Estoque</p>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
