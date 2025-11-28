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
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Palette,
  Layout,
  Save,
  ChevronLeft,
  ChevronRight,
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
  const [activeTab, setActiveTab] = useState<"layout" | "theme">("layout");
  const [currentPage, setCurrentPage] = useState(0);

  const [layouts, setLayouts] = useState<LayoutOption[]>([]);
  const [themes, setThemes] = useState<ThemeOption[]>([]);

  const totalPages = Math.ceil(layouts.length / LAYOUTS_PER_PAGE);
  const startIndex = currentPage * LAYOUTS_PER_PAGE;
  const endIndex = startIndex + LAYOUTS_PER_PAGE;
  const currentLayouts = layouts.slice(startIndex, endIndex);

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

  const handleSave = async () => {
    const userDataString = localStorage.getItem("user");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (userData && userData.loja && userData.loja.id) {
      const lojaId = userData.loja.id;

      const payload = {
        NovoLayoutId: selectedLayout || 0,
        NovoTemaId: selectedTheme || 0,
      };

      try {
        const constResponse = await axios.put(
          `${API_BASE_URL}/loja/alterar-layout-tema/${lojaId}`,
          payload
        );
        console.log(constResponse.data);
        onOpenChange(false); 
      } catch (error) {
        console.error("Erro ao salvar layout e tema", error);
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
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Salvar Configurações
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
