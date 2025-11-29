"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Palette,
  Layout,
  Save,
  ChevronLeft,
  ChevronRight,
  User,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import axios from "axios";
import { API_BASE_URL } from "@/config/api-url";

interface StoreSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface LayoutOption {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

interface ThemeOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  preview: string[];
}

const initialStoreData = {
  nomeLoja: "",
  descricao: "",
  subdominio: "",
  logotipoUrl: "",
  imagemBannerUrl: "",
  lojista: {
    nomeCompleto: "",
    email: "",
    telefone: "",
    endereco: {
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  },
};


const LAYOUTS_PER_PAGE = 3;

// Funções auxiliares para inicializar a partir do localStorage
function getInitialLayout() {
  try {
    const userDataString = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const userData = userDataString ? JSON.parse(userDataString) : null;
    return userData?.loja?.idLayout?.toString() ?? "";
  } catch {
    return "";
  }
}

function getInitialTheme() {
  try {
    const userDataString = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const userData = userDataString ? JSON.parse(userDataString) : null;
    return userData?.loja?.idTema?.toString() ?? "";
  } catch {
    return "";
  }
}

export function StoreSettingsDialog({
  open,
  onOpenChange,
}: StoreSettingsDialogProps) {
    const [selectedLayout, setSelectedLayout] = useState<string>(getInitialLayout);
  const [selectedTheme, setSelectedTheme] = useState<string>(getInitialTheme);
  const [activeTab, setActiveTab] = useState<"info" | "layout" | "theme">("info");
  const [currentPage, setCurrentPage] = useState(0);

  const [layouts, setLayouts] = useState<LayoutOption[]>([]);
  const [themes, setThemes] = useState<ThemeOption[]>([]);
      const [storeData, setStoreData] = useState(initialStoreData);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingCep, setIsCheckingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [uploadBannerError, setUploadBannerError] = useState<string | null>(null);

  const totalPages = Math.ceil(layouts.length / LAYOUTS_PER_PAGE);
  const startIndex = currentPage * LAYOUTS_PER_PAGE;
  const endIndex = startIndex + LAYOUTS_PER_PAGE;
  const currentLayouts = layouts.slice(startIndex, endIndex);

  useEffect(() => {
    const userDataString = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (open && userDataString) {
      const userData = JSON.parse(userDataString);
      setStoreData({
        nomeLoja: userData.loja?.nomeLoja || "",
        descricao: userData.loja?.descricao || "",
        subdominio: userData.loja?.subdominio || "",
                logotipoUrl: userData.loja?.logo || "",
        imagemBannerUrl: userData.loja?.imagemBannerUrl || "",
        lojista: {
          nomeCompleto: userData.nome || "",
          email: userData.email || "",
          telefone: userData.telefone || "",
          endereco: {
            logradouro: userData.loja?.lojista?.endereco?.logradouro || "",
            numero: userData.loja?.lojista?.endereco?.numero || "",
            complemento: userData.loja?.lojista?.endereco?.complemento || "",
            bairro: userData.loja?.lojista?.endereco?.bairro || "",
            cidade: userData.loja?.lojista?.endereco?.cidade || "",
            estado: userData.loja?.lojista?.endereco?.estado || "",
            cep: userData.loja?.lojista?.endereco?.cep || "",
          },
        },
      });
      setSelectedTheme(userData.loja?.idTema?.toString() ?? "");
      setSelectedLayout(userData.loja?.idLayout?.toString() ?? "");
    }
  }, [open]);

  useEffect(() => {
    const fetchLayoutsAndThemes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/loja/listar-layouts-temas`);
        const { layouts: fetchedLayouts, temas } = response.data;

        setLayouts(
          fetchedLayouts.map((layout: any) => ({
            id: layout.id.toString(),
            name: layout.titulo,
            description: layout.descricao,
            image: layout.imagemUrl || "/placeholder.jpg",
            category: layout.loja.length ? layout.loja[0]?.category || "Outros" : "Outros",
          }))
        );

        setThemes(
          temas.map((theme: any) => ({
            id: theme.id.toString(),
            name: theme.titulo,
            primary: theme.corPrimaria,
            secondary: theme.corSecundaria,
            accent: theme.realce,
            preview: [theme.corPrimaria, theme.corSecundaria, theme.realce, "#f0f0f0"],
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar layouts e temas", error);
      }
    };

    fetchLayoutsAndThemes();
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

    const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

    const handleLojistaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Esta função pode ser expandida se houver outros campos editáveis do lojista no futuro
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
        setStoreData((prev) => ({
      ...prev,
      lojista: {
        ...prev.lojista,
        endereco: {
          ...prev.lojista.endereco,
          [name]: value,
        },
      },
    }));
  };

  const handleViaCepSearch = async (cep: string) => {
    setIsCheckingCep(true);
    setCepError(null);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = response.data;

      if (addressData.erro) {
        throw new Error("CEP não encontrado");
      }

      setStoreData((prev) => ({
        ...prev,
        lojista: {
          ...prev.lojista,
          endereco: {
            ...prev.lojista.endereco,
            logradouro: addressData.logradouro,
            bairro: addressData.bairro,
            cidade: addressData.localidade,
            estado: addressData.uf,
            cep: addressData.cep,
          },
        },
      }));
    } catch (error) {
      setCepError("CEP inválido");
    } finally {
      setIsCheckingCep(false);
    }
  };

  const handleCepInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cepValue = e.target.value.replace(/\D/g, '');
    if (cepValue.length > 5) {
      cepValue = cepValue.slice(0, 5) + '-' + cepValue.slice(5, 8);
    }
    
    handleEnderecoChange({ target: { name: 'cep', value: cepValue } } as React.ChangeEvent<HTMLInputElement>);

    const unformattedCep = cepValue.replace(/\D/g, '');
    if (unformattedCep.length === 8) {
      handleViaCepSearch(unformattedCep);
        } else {
      setCepError(null);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=1451d4d045251d16eb45c9c8247382bc`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.data.url;
      setStoreData((prev) => ({ ...prev, logotipoUrl: imageUrl }));
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      setUploadError("Falha no upload. Tente novamente.");
        } finally {
      setIsUploading(false);
    }
  };

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingBanner(true);
    setUploadBannerError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=1451d4d045251d16eb45c9c8247382bc`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.data.url;
      setStoreData((prev) => ({ ...prev, imagemBannerUrl: imageUrl }));
    } catch (error) {
      console.error("Erro ao fazer upload do banner:", error);
      setUploadBannerError("Falha no upload. Tente novamente.");
    } finally {
      setIsUploadingBanner(false);
    }
  };
  
  const handleSave = async () => {
    const userDataString = localStorage.getItem("user");
    const userData = userDataString ? JSON.parse(userDataString) : null;

        if (userData && userData.loja && userData.loja.id) {
      const idLoja = userData.loja.id;
      setIsLoading(true);

            const payload = {
        id: idLoja,
        ...storeData,
        lojista: {
          ...storeData.lojista,
          dataNascimento: null,
        },
        idTema: selectedTheme ? parseInt(selectedTheme, 10) : undefined,
        idLayout: selectedLayout ? parseInt(selectedLayout, 10) : undefined,
      };

      try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(
          `${API_BASE_URL}/loja/alterar-dados/${idLoja}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);
        onOpenChange(false);
      } catch (error) {
        console.error("Erro ao salvar configurações", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Layout className="h-6 w-6" />
            Configurações da Loja
          </DialogTitle>
          <DialogDescription>
            Personalize o layout e tema da sua loja para criar a experiência
            perfeita para seus clientes.
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
                <div className="flex border-b">
          <button
            onClick={() => setActiveTab("info")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-b-2 transition-colors",
              activeTab === "info"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="h-4 w-4" />
            Informações
          </button>
          <button
            onClick={() => setActiveTab("layout")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-b-2 transition-colors",
              activeTab === "layout"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Layout className="h-4 w-4" />
            Layout da Loja
          </button>
          <button
            onClick={() => setActiveTab("theme")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-b-2 transition-colors",
              activeTab === "theme"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Palette className="h-4 w-4" />
            Tema e Cores
          </button>
        </div>

                {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[500px] py-4">
          {activeTab === "info" && (
            <div className="space-y-6 px-2.5">
              {/* Seção de Dados da Loja */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Dados da Loja</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                                        <Label htmlFor="nomeLoja">Nome da Loja</Label>
                    <Input id="nomeLoja" name="nomeLoja" value={storeData.nomeLoja} onChange={handleChange} placeholder="Ex: Calçados Modernos" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subdominio">Subdomínio (URL)</Label>
                    <Input id="subdominio" name="subdominio" value={storeData.subdominio} onChange={handleChange} placeholder="Ex: calcados-modernos" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input id="descricao" name="descricao" value={storeData.descricao} onChange={handleChange} placeholder="Uma breve descrição sobre sua loja" />
                  </div>
                                    <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="logotipoUrl">URL do Logotipo</Label>
                    <div className="flex items-center gap-2">
                      <Input id="logotipoUrl" name="logotipoUrl" value={storeData.logotipoUrl} onChange={handleChange} readOnly placeholder="Faça upload de uma imagem" />
                      <Button asChild variant="outline">
                        <label htmlFor="logo-upload" className="cursor-pointer flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Enviar
                        </label>
                      </Button>
                      <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                                          {isUploading && <p className="text-sm text-muted-foreground">Enviando imagem...</p>}
                     {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="imagemBannerUrl">URL do Banner</Label>
                    <div className="flex items-center gap-2">
                      <Input id="imagemBannerUrl" name="imagemBannerUrl" value={storeData.imagemBannerUrl} onChange={handleChange} readOnly placeholder="Faça upload de uma imagem para o banner" />
                      <Button asChild variant="outline">
                        <label htmlFor="banner-upload" className="cursor-pointer flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Enviar
                        </label>
                      </Button>
                      <input id="banner-upload" type="file" className="hidden" accept="image/*" onChange={handleBannerUpload} />
                    </div>
                     {isUploadingBanner && <p className="text-sm text-muted-foreground">Enviando imagem...</p>}
                     {uploadBannerError && <p className="text-sm text-red-500">{uploadBannerError}</p>}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Seção de Dados do Lojista */}
                                                        <div>
                <h3 className="text-lg font-semibold mb-4">Dados do Lojista</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={storeData.lojista.email} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" name="telefone" value={storeData.lojista.telefone} readOnly />
                  </div>
                </div>
              </div>

              <Separator />

                            {/* Seção de Endereço do Lojista */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Endereço do Lojista</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="cep">CEP</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="cep" 
                        name="cep" 
                        value={storeData.lojista.endereco.cep} 
                        onChange={handleCepInputChange}
                        className={cn(cepError && "border-red-500")}
                        disabled={isCheckingCep}
                        maxLength={9}
                        placeholder="00000-000"
                      />
                      {isCheckingCep && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>}
                    </div>
                    {cepError && <p className="text-sm text-red-500 mt-1">{cepError}</p>}
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="logradouro">Logradouro</Label>
                    <Input id="logradouro" name="logradouro" value={storeData.lojista.endereco.logradouro} onChange={handleEnderecoChange} placeholder="Ex: Av. Paulista" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número</Label>
                    <Input id="numero" name="numero" value={storeData.lojista.endereco.numero} onChange={handleEnderecoChange} placeholder="Ex: 1500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input id="complemento" name="complemento" value={storeData.lojista.endereco.complemento} onChange={handleEnderecoChange} placeholder="Ex: Apto 101" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input id="bairro" name="bairro" value={storeData.lojista.endereco.bairro} onChange={handleEnderecoChange} placeholder="Ex: Bela Vista" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" name="cidade" value={storeData.lojista.endereco.cidade} onChange={handleEnderecoChange} placeholder="Ex: São Paulo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" name="estado" value={storeData.lojista.endereco.estado} onChange={handleEnderecoChange} placeholder="Ex: SP" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "layout" && (
            <div className="space-y-4 px-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Escolha o Layout
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Selecione o layout que melhor representa o estilo da sua
                    loja
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="h-8 w-8 bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[80px] text-center">
                    {currentPage + 1} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="h-8 w-8 bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Carrossel de Layouts */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
                  {currentLayouts.map((layout) => (
                    <Card
                      key={layout.id}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        selectedLayout === layout.id
                          ? "ring-2 ring-primary shadow-md"
                          : "hover:shadow-sm"
                      )}
                      onClick={() => setSelectedLayout(layout.id)}
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <Image
                            src={layout.image || "/placeholder.jpg"}
                            alt={layout.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                            width={500}
                            height={300}
                          />
                          {selectedLayout === layout.id && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                          <Badge className="absolute top-2 left-2 bg-white/90 text-gray-700 hover:bg-white/90 shadow-sm">
                            {layout.category}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-sm mb-1">
                            {layout.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {layout.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Indicadores de página */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      currentPage === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    )}
                    aria-label={`Ir para página ${index + 1}`}
                  />
                ))}
              </div>

              {/* Preview do Layout Selecionado */}
              {selectedLayout && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Layout className="h-4 w-4 text-primary" />
                    Layout Selecionado:{" "}
                    {layouts.find((l) => l.id === selectedLayout)?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {layouts.find((l) => l.id === selectedLayout)?.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "theme" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Escolha o Tema</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecione a paleta de cores que combina com sua marca
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <Card
                    key={theme.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedTheme === theme.id
                        ? "ring-2 ring-primary shadow-md"
                        : "hover:shadow-sm"
                    )}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-sm">{theme.name}</h4>
                        {selectedTheme === theme.id && (
                          <div className="bg-primary text-primary-foreground rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>

                      {/* Preview das cores */}
                      <div className="flex gap-1 mb-3">
                        {theme.preview.map((color, index) => (
                          <div
                            key={index}
                            className="flex-1 h-12 rounded-md border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      {/* Informações das cores */}
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full border"
                            style={{ backgroundColor: theme.primary }}
                          />
                          <span className="text-muted-foreground">
                            Primária
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full border"
                            style={{ backgroundColor: theme.secondary }}
                          />
                          <span className="text-muted-foreground">
                            Secundária
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full border"
                            style={{ backgroundColor: theme.accent }}
                          />
                          <span className="text-muted-foreground">
                            Destaque
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground">
              Layout:{" "}
              <span className="font-medium">
                {layouts.find((l) => l.id === selectedLayout)?.name}
              </span>
              {" • "}
              Tema:{" "}
              <span className="font-medium">
                {themes.find((t) => t.id === selectedTheme)?.name}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
                            <Button onClick={handleSave} className="flex items-center gap-2" disabled={isLoading}>
                {isLoading ? "Salvando..." : <><Save className="h-4 w-4" /> Salvar Configurações</>}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
