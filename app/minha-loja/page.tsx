"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import { StoreSettingsDialog } from "@/components/store-settings-dialog";
import { ExternalLink, Store, Copy, Globe, Settings } from "lucide-react";
import { StoreService } from "@/services/store-service";
import Link from "next/link";

export default function MinhaLojaPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // TODO:
  // Função para gerar subdomínio válido a partir do nome da loja
  // const generateSubdomain = (nomeLoja: string) => {
  //   return nomeLoja
  //     .toLowerCase()
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "") // Remove acentos
  //     .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
  //     .replace(/\s+/g, "-") // Substitui espaços por hífens
  //     .replace(/-+/g, "-") // Remove hífens duplicados
  //     .replace(/^-|-$/g, "") // Remove hífens no início e fim
  // }

  // Função para copiar URL da loja
  const copyStoreUrl = () => {
    if (user?.loja) {
      const subdomain = user.loja.subdominio;
      const lojaUrl = `${subdomain}.vitrine.com.br`;
      navigator.clipboard.writeText(lojaUrl);
      // TODO: Toast de confirmação
    }
  };

  // Se não estiver autenticado, não renderiza o conteúdo
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Minha Loja</h1>
            {user?.loja && (
              <p className="text-gray-600 mt-1">Bem-vindo à {user.loja.nome}</p>
            )}
          </div>

          {/* Botão para acessar a loja */}
          {user?.loja && (
            <Button
              onClick={StoreService.abrirMinhaLoja}
              className="flex items-center gap-2"
              size="lg"
            >
              <Store className="h-4 w-4" />
              Acessar Minha Loja
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Informações da Loja */}
        {user?.loja && (
          <Card className="mb-8 border-l-4 border-l-primary">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Store className="h-5 w-5 text-primary" />
                Informações da Loja
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Nome da Loja */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    Nome da Loja
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.loja.nome}
                  </p>
                </div>

                {/* URL da Loja */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    URL da Loja
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium text-primary">
                      {user.loja.subdominio}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyStoreUrl}
                      className="h-6 w-6 p-0 hover:bg-primary/10"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Categoria */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Categoria</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {user.loja.categoria}
                  </p>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Ativa
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={StoreService.abrirMinhaLoja}
                      className="h-6 w-6 p-0 hover:bg-primary/10"
                    >
                      <Globe className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Linha de separação e ações rápidas */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Loja online e funcionando
                    </span>
                    <span>•</span>
                    <span>Última atualização: hoje</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={copyStoreUrl}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar URL
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={StoreService.abrirMinhaLoja}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visitar Loja
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Seções Existentes - Grid de 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Painel de Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Visitas hoje</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vendas hoje</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Receita hoje</p>
                  <p className="text-2xl font-bold">R$ 1.247,00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pedidos Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Pedidos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <p className="font-medium">#12345</p>
                    <p className="text-sm text-gray-500">Há 2 horas</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Pago
                  </Badge>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <p className="font-medium">#12344</p>
                    <p className="text-sm text-gray-500">Há 3 horas</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    Pendente
                  </Badge>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div>
                    <p className="font-medium">#12343</p>
                    <p className="text-sm text-gray-500">Há 5 horas</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Enviado
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/minha-loja/produtos">
                  <Button className="w-full justify-start">
                    <Store className="h-4 w-4 mr-2" />
                    Gerenciar Produtos
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Pedidos
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações da Loja
                </Button>
                <Button
                  onClick={StoreService.abrirMinhaLoja}
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Ver Loja Online
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de Configurações */}
      <StoreSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
