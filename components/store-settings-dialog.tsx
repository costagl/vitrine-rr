"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Palette, Layout, Save } from "lucide-react"
import { cn } from "@/lib/utils"

interface StoreSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface LayoutOption {
  id: string
  name: string
  description: string
  image: string
  category: string
}

interface ThemeOption {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
  preview: string[]
}

const layouts: LayoutOption[] = [
  {
    id: "layout-1",
    name: "E-commerce Clássico",
    description: "Layout tradicional focado em conversão e vendas",
    image: "/placeholder.svg?height=200&width=300&text=E-commerce+Clássico",
    category: "Vendas",
  },
  {
    id: "layout-2",
    name: "Tech Minimalista",
    description: "Design clean e moderno para produtos tecnológicos",
    image: "/placeholder.svg?height=200&width=300&text=Tech+Minimalista",
    category: "Tecnologia",
  },
  {
    id: "layout-3",
    name: "Arte Criativa",
    description: "Layout vibrante para produtos artísticos e criativos",
    image: "/placeholder.svg?height=200&width=300&text=Arte+Criativa",
    category: "Arte",
  },
]

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
]

export function StoreSettingsDialog({ open, onOpenChange }: StoreSettingsDialogProps) {
  const [selectedLayout, setSelectedLayout] = useState<string>("layout-1")
  const [selectedTheme, setSelectedTheme] = useState<string>("purple")
  const [activeTab, setActiveTab] = useState<"layout" | "theme">("layout")

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log("Salvando configurações:", {
      layout: selectedLayout,
      theme: selectedTheme,
    })

    // Simular salvamento
    setTimeout(() => {
      onOpenChange(false)
      // Aqui você poderia mostrar um toast de sucesso
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Layout className="h-6 w-6" />
            Configurações da Loja
          </DialogTitle>
          <DialogDescription>
            Personalize o layout e tema da sua loja para criar a experiência perfeita para seus clientes.
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
                : "border-transparent text-muted-foreground hover:text-foreground",
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
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <Palette className="h-4 w-4" />
            Tema e Cores
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[500px] py-4">
          {activeTab === "layout" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Escolha o Layout</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecione o layout que melhor representa o estilo da sua loja
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {layouts.map((layout) => (
                  <Card
                    key={layout.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedLayout === layout.id ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm",
                    )}
                    onClick={() => setSelectedLayout(layout.id)}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={layout.image || "/placeholder.svg"}
                          alt={layout.name}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        {selectedLayout === layout.id && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                        <Badge className="absolute top-2 left-2 bg-white/90 text-gray-700 hover:bg-white/90">
                          {layout.category}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-sm mb-1">{layout.name}</h4>
                        <p className="text-xs text-muted-foreground">{layout.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                      selectedTheme === theme.id ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm",
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
                            className="w-8 h-8 rounded-md border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      {/* Informações das cores */}
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: theme.primary }} />
                          <span className="text-muted-foreground">Primária</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: theme.secondary }} />
                          <span className="text-muted-foreground">Secundária</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: theme.accent }} />
                          <span className="text-muted-foreground">Destaque</span>
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
              Layout: <span className="font-medium">{layouts.find((l) => l.id === selectedLayout)?.name}</span>
              {" • "}
              Tema: <span className="font-medium">{themes.find((t) => t.id === selectedTheme)?.name}</span>
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
  )
}
