"use client"

import { useState } from "react"
import useSWR, { mutate as globalMutate } from "swr"
import { useToast } from "@/hooks/use-toast"
import { ProductService } from "@/services/product-service"
import type { CreateProductRequest, UpdateProductRequest, Product, ApiError } from "@/types/product"

/**
 * Hook para listar produtos
 */
export function useProducts() {
  const { toast } = useToast()

  const { data, error, isLoading, mutate } = useSWR<Product[]>("products", () => ProductService.listarProdutos(), {
    onError: (err: ApiError) => {
      console.error("Erro ao listar produtos:", err)
      toast({
        title: "Erro ao carregar produtos",
        description: err.message || "Não foi possível carregar a lista de produtos.",
        variant: "destructive",
      })
    },
    revalidateOnFocus: false,
  })

  return {
    products: data || [],
    isLoading,
    error,
    mutate,
  }
}

/**
 * Hook para buscar detalhes de um produto específico
 */
export function useProductDetail(id: string | null) {
  const { toast } = useToast()

  const { data, error, isLoading, mutate } = useSWR(
    id ? `product-${id}` : null,
    () => (id ? ProductService.listarProdutoPorId(id) : null),
    {
      onError: (err: ApiError) => {
        console.error(`Erro ao buscar produto ${id}:`, err)
        toast({
          title: "Erro ao carregar produto",
          description: err.message || "Não foi possível carregar os detalhes do produto.",
          variant: "destructive",
        })
      },
      revalidateOnFocus: false,
    },
  )

  return {
    product: data,
    isLoading,
    error,
    mutate,
  }
}

/**
 * Hook para criar um novo produto
 */
export function useCreateProduct() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const mutate = async (data: CreateProductRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await ProductService.cadastrarProduto(data)

      // Invalidar cache para recarregar a lista
      globalMutate("products")

      toast({
        title: "Produto cadastrado",
        description: "O produto foi cadastrado com sucesso.",
      })

      return result
    } catch (err: any) {
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}

/**
 * Hook para atualizar um produto existente
 */
export function useUpdateProduct() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const mutate = async (data: UpdateProductRequest & { id: string }) => {
    setIsLoading(true)
    setError(null)

    try {
      const { id, ...updateData } = data
      const result = await ProductService.alterarProduto(id, updateData)

      // Invalidar cache para recarregar a lista e o detalhe
      globalMutate("products")
      globalMutate(`product-${id}`)

      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      })

      return result
    } catch (err: any) {
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}

/**
 * Hook para excluir um produto
 */
export function useDeleteProduct() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const mutate = async (id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await ProductService.excluirProduto(id)

      // Invalidar cache para recarregar a lista
      globalMutate("products")

      toast({
        title: "Produto excluído",
        description: "O produto foi excluído com sucesso.",
      })
    } catch (err: any) {
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}
