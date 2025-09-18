"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product, CreateProductRequest } from "@/types/product"
import { categories } from "@/data/categories"
import { useAuth } from "@/contexts/auth-context"

interface ProductFormProps {
  product?: Product | null
  onSave: (product: CreateProductRequest) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ProductForm({ product, onSave, onCancel, isLoading = false }: ProductFormProps) {
  const { user, isAuthenticated } = useAuth()

  const [formData, setFormData] = useState<CreateProductRequest>({
    titulo: "",
    idLoja: user?.loja?.id ? Number.parseInt(user.loja.id) : 0,
    valorUnitario: 0,
    valorPromocional: undefined,
    estoque: 0,
    sku: "",
    imagem: "",
    ativo: 1,
    peso: 0,
    descricao: "",
    altura: 0,
    largura: 0,
    profundidade: 0,
    idCategoriaProduto: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (product) {
      setFormData({
        titulo: product.titulo,
        idLoja: product.idLoja,
        valorUnitario: product.valorUnitario,
        valorPromocional: product.valorPromocional,
        estoque: product.estoque,
        sku: product.sku,
        imagem: product.imagem,
        ativo: product.ativo,
        peso: product.peso,
        descricao: product.descricao,
        altura: product.altura,
        largura: product.largura,
        profundidade: product.profundidade,
        idCategoriaProduto: product.idCategoriaProduto,
      })
    }
  }, [product])

  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `SKU${timestamp}${random}`
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      newErrors.auth = "Você precisa estar logado para cadastrar produtos"
      return newErrors
    }

    // Verificar se o token está presente
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!token) {
      newErrors.auth = "Token de autenticação não encontrado. Faça login novamente."
      return newErrors
    }

    if (!formData.titulo.trim()) {
      newErrors.titulo = "Título é obrigatório"
    } else if (formData.titulo.length > 255) {
      newErrors.titulo = "Título deve ter no máximo 255 caracteres"
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória"
    }

    if (formData.valorUnitario <= 0) {
      newErrors.valorUnitario = "Valor unitário deve ser maior que zero"
    }

    if (formData.valorPromocional && formData.valorPromocional >= formData.valorUnitario) {
      newErrors.valorPromocional = "Valor promocional deve ser menor que o valor unitário"
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU é obrigatório"
    } else if (formData.sku.length > 100) {
      newErrors.sku = "SKU deve ter no máximo 100 caracteres"
    }

    if (!formData.imagem.trim()) {
      newErrors.imagem = "URL da imagem é obrigatória"
    } else if (formData.imagem.length > 255) {
      newErrors.imagem = "URL da imagem deve ter no máximo 255 caracteres"
    }

    if (formData.estoque < 0) {
      newErrors.estoque = "Estoque não pode ser negativo"
    }

    if (formData.peso < 0) {
      newErrors.peso = "Peso não pode ser negativo"
    }

    if (formData.altura < 0) {
      newErrors.altura = "Altura não pode ser negativa"
    }

    if (formData.largura < 0) {
      newErrors.largura = "Largura não pode ser negativa"
    }

    if (formData.profundidade < 0) {
      newErrors.profundidade = "Profundidade não pode ser negativa"
    }

    if (formData.idCategoriaProduto === 0) {
      newErrors.idCategoriaProduto = "Categoria é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("📝 Tentando salvar produto:", formData)

    // Verificar se o token está presente no localStorage
    const token = localStorage.getItem("token")
    console.log("🔐 Token presente:", !!token)
    if (token) {
    } else {
      console.error("🚫 Token não encontrado no localStorage")
      setErrors({
        auth: "Token de autenticação não encontrado. Faça login novamente.",
      })
      return
    }

    if (validateForm()) {
      onSave(formData)
    } else {
      console.log("❌ Validação falhou:", errors)
    }
  }

  const handleChange = (field: keyof CreateProductRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Mostrar erro de autenticação se houver
  if (errors.auth) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{errors.auth}</div>
        <Button onClick={() => (window.location.href = "/login")}>Fazer Login</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título do Produto *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                placeholder="Digite o título do produto"
                className={errors.titulo ? "border-red-500" : ""}
                disabled={isLoading}
                maxLength={255}
              />
              {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <div className="flex gap-2">
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                  placeholder="Código único do produto"
                  className={errors.sku ? "border-red-500" : ""}
                  disabled={isLoading}
                  maxLength={100}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleChange("sku", generateSKU())}
                  disabled={isLoading}
                >
                  Gerar
                </Button>
              </div>
              {errors.sku && <p className="text-red-500 text-sm">{errors.sku}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              placeholder="Descreva o produto detalhadamente"
              rows={4}
              className={errors.descricao ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagem">URL da Imagem *</Label>
            <Input
              id="imagem"
              value={formData.imagem}
              onChange={(e) => handleChange("imagem", e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
              className={errors.imagem ? "border-red-500" : ""}
              disabled={isLoading}
              maxLength={255}
            />
            {errors.imagem && <p className="text-red-500 text-sm">{errors.imagem}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Select
              value={formData.idCategoriaProduto.toString()}
              onValueChange={(value) => handleChange("idCategoriaProduto", Number.parseInt(value))}
              disabled={isLoading}
            >
              <SelectTrigger className={errors.idCategoriaProduto ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.idCategoriaProduto && <p className="text-red-500 text-sm">{errors.idCategoriaProduto}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Preços e Estoque */}
      <Card>
        <CardHeader>
          <CardTitle>Preços e Estoque</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorUnitario">Valor Unitário (R$) *</Label>
              <Input
                id="valorUnitario"
                type="number"
                step="0.01"
                min="0"
                value={formData.valorUnitario}
                onChange={(e) => handleChange("valorUnitario", Number.parseFloat(e.target.value) || 0)}
                placeholder="0,00"
                className={errors.valorUnitario ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.valorUnitario && <p className="text-red-500 text-sm">{errors.valorUnitario}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorPromocional">Valor Promocional (R$)</Label>
              <Input
                id="valorPromocional"
                type="number"
                step="0.01"
                min="0"
                value={formData.valorPromocional || ""}
                onChange={(e) =>
                  handleChange("valorPromocional", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                }
                placeholder="0,00"
                className={errors.valorPromocional ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.valorPromocional && <p className="text-red-500 text-sm">{errors.valorPromocional}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="estoque">Estoque *</Label>
              <Input
                id="estoque"
                type="number"
                min="0"
                value={formData.estoque}
                onChange={(e) => handleChange("estoque", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
                className={errors.estoque ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.estoque && <p className="text-red-500 text-sm">{errors.estoque}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dimensões e Peso */}
      <Card>
        <CardHeader>
          <CardTitle>Dimensões e Peso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="peso">Peso (kg)</Label>
              <Input
                id="peso"
                type="number"
                step="0.01"
                min="0"
                value={formData.peso}
                onChange={(e) => handleChange("peso", Number.parseFloat(e.target.value) || 0)}
                placeholder="0,00"
                className={errors.peso ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.peso && <p className="text-red-500 text-sm">{errors.peso}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="altura">Altura (cm)</Label>
              <Input
                id="altura"
                type="number"
                step="0.01"
                min="0"
                value={formData.altura}
                onChange={(e) => handleChange("altura", Number.parseFloat(e.target.value) || 0)}
                placeholder="0,00"
                className={errors.altura ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.altura && <p className="text-red-500 text-sm">{errors.altura}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="largura">Largura (cm)</Label>
              <Input
                id="largura"
                type="number"
                step="0.01"
                min="0"
                value={formData.largura}
                onChange={(e) => handleChange("largura", Number.parseFloat(e.target.value) || 0)}
                placeholder="0,00"
                className={errors.largura ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.largura && <p className="text-red-500 text-sm">{errors.largura}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profundidade">Profundidade (cm)</Label>
              <Input
                id="profundidade"
                type="number"
                step="0.01"
                min="0"
                value={formData.profundidade}
                onChange={(e) => handleChange("profundidade", Number.parseFloat(e.target.value) || 0)}
                placeholder="0,00"
                className={errors.profundidade ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.profundidade && <p className="text-red-500 text-sm">{errors.profundidade}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="ativo"
              checked={formData.ativo === 1}
              onCheckedChange={(checked) => handleChange("ativo", checked ? 1 : 0)}
              disabled={isLoading}
            />
            <Label htmlFor="ativo">Produto ativo</Label>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Salvando..." : product ? "Atualizar Produto" : "Adicionar Produto"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1" disabled={isLoading}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
