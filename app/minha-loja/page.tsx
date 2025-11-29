"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import { StoreSettingsDialog } from "@/components/store-settings-dialog";
import { ExternalLink, Store, Copy, Globe, Settings, PackageSearch } from "lucide-react";
import { StoreService } from "@/services/store-service";
import Link from "next/link";
import axios from "axios";
import { API_BASE_URL } from "@/config/api-url";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentOrder {
  idPedido: number;
  status: string;
  tempoDecorrido: string;
}

interface SummaryData {
  idLoja: number;
  quantidadeProdutosVendidos: number;
  receitaTotal: number;
}

export default function MinhaLojaPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchStoreData = async () => {
      if (user?.loja?.id) {
        setIsLoading(true);
        try {
          const fetchOrders = axios.get(`${API_BASE_URL}/pedido/ultimos/${user.loja.id}`);
          const fetchSummary = axios.get(`${API_BASE_URL}/pedido/resumo/${user.loja.id}`);

          const [ordersResponse, summaryResponse] = await Promise.all([fetchOrders, fetchSummary]);

          setRecentOrders(ordersResponse.data || []);
          setSummaryData(summaryResponse.data);
        } catch (error) {
          console.error("Erro ao buscar dados da loja:", error);
          setRecentOrders([]);
          setSummaryData(null);
        } finally {
          setIsLoading(false);
    }
      }
    };

    fetchStoreData();
  }, [user?.loja?.id]);


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
              <p className="text-gray-600 mt-1">
                Bem-vindo à {user.loja.nomeLoja}
              </p>
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
                    {user.loja.nomeLoja}
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
              <CardTitle className="text-xl">Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-8 w-3/4" />
                </div>
              ) : summaryData ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Produtos Vendidos</p>
                    <p className="text-2xl font-bold">{summaryData.quantidadeProdutosVendidos}</p>
                  </div>
                  {/* <div>
                    <p className="text-sm text-gray-500">Vendas hoje</p>
                    <p className="text-2xl font-bold">{recentOrders.length}</p>
                  </div> */}
                  <div>
                    <p className="text-sm text-gray-500">Receita Total</p>
                    <p className="text-2xl font-bold">
                      {summaryData.receitaTotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Não há dados de estatísticas.</p>
              )}
            </CardContent>
          </Card>

          {/* Pedidos Recentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Pedidos Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : recentOrders && recentOrders.length > 0 ? (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.idPedido} className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">#{order.idPedido}</p>
                        <p className="text-sm text-gray-500">{order.tempoDecorrido}</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <PackageSearch className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Não há pedidos recentes.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/minha-loja/gerenciamento-produtos">
                  <Button className="w-full justify-start">
                    <Store className="h-4 w-4 mr-2" />
                    Gerenciar Produtos
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => router.push("/minha-loja/pedidos")} // Usando a função aqui
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
