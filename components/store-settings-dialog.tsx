"use client";

import { useState } from "react";
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

const layouts: LayoutOption[] = [
  {
    id: "layout-1",
    name: "E-commerce Clássico",
    description: "Layout tradicional focado em conversão e vendas",
    image: "/placeholder.jpg",
    category: "Vendas",
  },
  {
    id: "layout-2",
    name: "Tech Minimalista",
    description: "Design clean e moderno para produtos tecnológicos",
    image: "/placeholder.jpg",
    category: "Tecnologia",
  },
  {
    id: "layout-3",
    name: "Arte Criativa",
    description: "Layout vibrante para produtos artísticos e criativos",
    image: "/placeholder.jpg",
    category: "Arte",
  },
  {
    id: "layout-4",
    name: "PetShop Divertido",
    description: "Layout alegre e acolhedor para produtos pet",
    image: "/placeholder.svg?height=200&width=300&text=PetShop",
    category: "Pets",
  },
  {
    id: "layout-5",
    name: "Biscuit & Bolos",
    description: "Design fofo para peças de biscuit e bolos cenográficos",
    image: "/placeholder.svg?height=200&width=300&text=Biscuit",
    category: "Artesanato",
  },
  {
    id: "layout-6",
    name: "Moda Premium",
    description: "Layout sofisticado para moda e acessórios",
    image: "/placeholder.svg?height=200&width=300&text=Moda+Premium",
    category: "Moda",
  },
];

const themes: ThemeOption[] = [
  {
    id: "blue",
    name: "Azul Profissional",
    primary: "#2563eb",
    secondary: "#64748b",
    accent: "#0ea5e9",
    preview: ["#2563eb", "#64748b", "#0ea5e9", "#f1f5f9"],
  },
  {
    id: "purple",
    name: "Roxo Moderno",
    primary: "#4400FF",
    secondary: "#8b5cf6",
    accent: "#a855f7",
    preview: ["#4400FF", "#8b5cf6", "#a855f7", "#f3f4f6"],
  },
  {
    id: "green",
    name: "Verde Natural",
    primary: "#059669",
    secondary: "#10b981",
    accent: "#34d399",
    preview: ["#059669", "#10b981", "#34d399", "#f0fdf4"],
  },
  {
    id: "orange",
    name: "Laranja Energético",
    primary: "#ea580c",
    secondary: "#f97316",
    accent: "#fb923c",
    preview: ["#ea580c", "#f97316", "#fb923c", "#fff7ed"],
  },
  {
    id: "pink",
    name: "Rosa Criativo",
    primary: "#db2777",
    secondary: "#ec4899",
    accent: "#f472b6",
    preview: ["#db2777", "#ec4899", "#f472b6", "#fdf2f8"],
  },
  {
    id: "teal",
    name: "Azul Turquesa",
    primary: "#0d9488",
    secondary: "#14b8a6",
    accent: "#2dd4bf",
    preview: ["#0d9488", "#14b8a6", "#2dd4bf", "#f0fdfa"],
  },
];

const LAYOUTS_PER_PAGE = 3;

export function StoreSettingsDialog({
  open,
  onOpenChange,
}: StoreSettingsDialogProps) {
  const [selectedLayout, setSelectedLayout] = useState<string>("layout-1");
  const [selectedTheme, setSelectedTheme] = useState<string>("purple");
  const [activeTab, setActiveTab] = useState<"layout" | "theme">("layout");
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(layouts.length / LAYOUTS_PER_PAGE);
  const startIndex = currentPage * LAYOUTS_PER_PAGE;
  const endIndex = startIndex + LAYOUTS_PER_PAGE;
  const currentLayouts = layouts.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleSave = () => {
    console.log("Salvando configurações:", {
      layout: selectedLayout,
      theme: selectedTheme,
    });

    setTimeout(() => {
      onOpenChange(false);
    }, 1000);
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
                            src={layout.image || "/placeholder.svg"}
                            alt={layout.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                            layout="responsive"
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
