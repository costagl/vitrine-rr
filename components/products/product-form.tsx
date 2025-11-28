"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { getProductCategoriesById } from "@/hooks/use-categories";
import type { CreateProductRequest } from "@/types/product";
import type { CategoryProduct } from "@/types/category";
import Image from "next/image";

const MAX_IMAGE_SIZE = 30 * 1024 * 1024; // 30MB em bytes

interface ProductFormProps {
  product?: CreateProductRequest | null;
  onSave: (product: CreateProductRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ProductForm({
  product,
  onSave,
  onCancel,
  isLoading = false,
}: ProductFormProps) {
  const { user, isAuthenticated } = useAuth();

  // Estado do formulário
  const [formData, setFormData] = useState<CreateProductRequest>({
    id: 0,
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
    idCategoriaProduto: "",
  });

  // Estado para erros de validação
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isImageLoading, setIsImageLoading] = useState(false); // Novo estado para controle de carregamento da imagem

  // Preencher o formulário se o produto for fornecido (edição)
  useEffect(() => {
    const updateFormData = async () => {
      if (product) {
        setFormData({
          id: product.id,
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
        });
      }
    };

    updateFormData();
  }, [product]);

  const [categories, setCategories] = useState<CategoryProduct[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Carregar categorias de produtos ao montar o componente
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getProductCategoriesById();
      setCategories(fetchedCategories);
      setLoadingCategories(false);
    };

    fetchCategories();
  }, []);

  // Função para validar o formulário
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      newErrors.auth = "Você precisa estar logado para cadastrar produtos";
      return newErrors;
    }

    // Validar campos do formulário
    if (!formData.titulo.trim()) {
      newErrors.titulo = "Título é obrigatório";
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória";
    }

    if (formData.valorUnitario <= 0) {
      newErrors.valorUnitario = "Valor unitário deve ser maior que zero";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU é obrigatório";
    }

    if (!formData.imagem.trim()) {
      newErrors.imagem = "Imagem é obrigatória";
    }

    if (formData.estoque < 0) {
      newErrors.estoque = "Estoque não pode ser negativo";
    }

    if (formData.peso < 0) {
      newErrors.peso = "Peso não pode ser negativo";
    }

    if (formData.altura < 0) {
      newErrors.altura = "Altura não pode ser negativa";
    }

    if (formData.largura < 0) {
      newErrors.largura = "Largura não pode ser negativa";
    }

    if (formData.profundidade < 0) {
      newErrors.profundidade = "Profundidade não pode ser negativa";
    }

    if (formData.idCategoriaProduto === "") {
      newErrors.idCategoriaProduto = "Categoria é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para atualizar campos do formulário
  const handleChange = (field: keyof CreateProductRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Função para gerar SKU automático
  const generateSKU = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `SKU${timestamp}${random}`;
  };

  // Função para enviar a imagem para o ImgBB
  const handleImageUpload = async (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        imagem: "A imagem deve ter no máximo 30MB",
      }));
      return;
    }

    const formDataImgBB = new FormData();
    formDataImgBB.append("image", file);

    try {
      setIsImageLoading(true); // Definir o estado para carregando a imagem
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=1451d4d045251d16eb45c9c8247382bc`,
        {
          method: "POST",
          body: formDataImgBB,
        }
      );
      const data = await response.json();

      if (data.success) {
        // Atualize o estado com a URL da imagem
        setFormData((prev) => ({
          ...prev,
          imagem: data.data.image.url, // A URL da imagem carregada
        }));
        setErrors((prev) => ({ ...prev, imagem: "" })); // Limpar erro, caso tenha
      } else {
        setErrors((prev) => ({
          ...prev,
          imagem: "Falha ao enviar a imagem para o ImgBB",
        }));
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      setErrors((prev) => ({
        ...prev,
        imagem: "Erro ao enviar a imagem. Tente novamente.",
      }));
    } finally {
      setIsImageLoading(false); // Definir o estado como não carregando após a operação
    }
  };

  // Função para tratar a mudança na imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      handleImageUpload(file);
    }
  };

  // Função de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se a imagem foi carregada com sucesso
    if (isImageLoading) {
      setErrors((prev) => ({
        ...prev,
        imagem:
          "A imagem ainda está sendo carregada. Tente novamente em instantes.",
      }));
      return;
    }

    if (validateForm()) {
      // Esperar até que a URL da imagem tenha sido definida antes de chamar o onSave
      if (formData.imagem.trim()) {
        onSave(formData);
      } else {
        setErrors((prev) => ({
          ...prev,
          imagem: "A imagem é obrigatória.",
        }));
      }
    }
  };

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
              {errors.titulo && (
                <p className="text-red-500 text-sm">{errors.titulo}</p>
              )}
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
              {errors.sku && (
                <p className="text-red-500 text-sm">{errors.sku}</p>
              )}
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
            {errors.descricao && (
              <p className="text-red-500 text-sm">{errors.descricao}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagem">Imagem do Produto *</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  id="imagem"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                  className={errors.imagem ? "border-red-500" : ""}
                />
              </div>

              {errors.imagem && (
                <p className="text-red-500 text-sm">{errors.imagem}</p>
              )}

              {formData.imagem && !errors.imagem && (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border">
                      <Image
                        src={formData.imagem || "/placeholder.svg"}
                        alt="Preview do produto"
                        className="h-full w-full object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-1">
                        Imagem carregada com sucesso
                      </p>
                      <p className="text-xs text-muted-foreground break-all line-clamp-2">
                        {formData.imagem}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <Select
              value={
                formData.idCategoriaProduto
                  ? formData.idCategoriaProduto.toString()
                  : ""
              }
              onValueChange={(value) => {
                const parsedValue = Number.parseInt(value);
                if (!isNaN(parsedValue)) {
                  handleChange("idCategoriaProduto", parsedValue);
                }
              }}
              disabled={isLoading}
            >
              <SelectTrigger
                className={errors.idCategoriaProduto ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {!loadingCategories &&
                  categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.titulo}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {errors.idCategoriaProduto && (
              <p className="text-red-500 text-sm">
                {errors.idCategoriaProduto}
              </p>
            )}
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
                onChange={(e) =>
                  handleChange("valorUnitario", Number(e.target.value) || 0)
                }
                placeholder="0,00"
                className={errors.valorUnitario ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.valorUnitario && (
                <p className="text-red-500 text-sm">{errors.valorUnitario}</p>
              )}
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
                  handleChange(
                    "valorPromocional",
                    e.target.value
                      ? Number.parseFloat(e.target.value)
                      : undefined
                  )
                }
                placeholder="0,00"
                className={errors.valorPromocional ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.valorPromocional && (
                <p className="text-red-500 text-sm">
                  {errors.valorPromocional}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="estoque">Estoque *</Label>
              <Input
                id="estoque"
                type="number"
                min="0"
                value={formData.estoque}
                onChange={(e) => handleChange("estoque", e.target.value)}
                placeholder="0"
                className={errors.estoque ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.estoque && (
                <p className="text-red-500 text-sm">{errors.estoque}</p>
              )}
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
                onChange={(e) =>
                  handleChange("peso", Number.parseFloat(e.target.value) || 0)
                }
                placeholder="0,00"
                className={errors.peso ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.peso && (
                <p className="text-red-500 text-sm">{errors.peso}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="altura">Altura (cm)</Label>
              <Input
                id="altura"
                type="number"
                step="0.01"
                min="0"
                value={formData.altura}
                onChange={(e) =>
                  handleChange("altura", Number.parseFloat(e.target.value) || 0)
                }
                placeholder="0,00"
                className={errors.altura ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.altura && (
                <p className="text-red-500 text-sm">{errors.altura}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="largura">Largura (cm)</Label>
              <Input
                id="largura"
                type="number"
                step="0.01"
                min="0"
                value={formData.largura}
                onChange={(e) =>
                  handleChange(
                    "largura",
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                placeholder="0,00"
                className={errors.largura ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.largura && (
                <p className="text-red-500 text-sm">{errors.largura}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profundidade">Comprimento (cm)</Label>
              <Input
                id="profundidade"
                type="number"
                step="0.01"
                min="0"
                value={formData.profundidade}
                onChange={(e) =>
                  handleChange(
                    "profundidade",
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                placeholder="0,00"
                className={errors.profundidade ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.profundidade && (
                <p className="text-red-500 text-sm">{errors.profundidade}</p>
              )}
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
              onCheckedChange={(checked) =>
                handleChange("ativo", checked ? 1 : 0)
              }
              disabled={isLoading}
            />
            <Label htmlFor="ativo">Produto ativo</Label>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          className="flex-1"
          disabled={isLoading || isImageLoading}
        >
          {isLoading || isImageLoading ? "Salvando..." : "Adicionar Produto"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 bg-transparent"
          disabled={isLoading || isImageLoading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
