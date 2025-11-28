"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  MapPin,
  User,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { CalcularFrete } from "@/hooks/use-frete";
import axios from "axios";
import { API_BASE_URL } from "@/config/api-url";

interface ItemPedido {
  idProduto: number;
  titulo: string;
  quantidade: number;
  precoUnitario: number;
  precoTotal: number;
  peso: number;
  altura: number;
  largura: number;
  profundidade: number;
}

interface Pedido {
  idLoja: string;
  freteValor: number;
  status: string
}

export interface ClienteEnderecoPedidoVM {
  cpf: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  enderecoEntrega: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  pedidos: Pedido[];
  itensPedido: ItemPedido[];
}

const CheckoutForm = () => {
  const { cart } = useCart();
  const [idLoja, setIdLoja] = useState<string | null>(null); // Estado para idLoja
  const [formData, setFormData] = useState<ClienteEnderecoPedidoVM>({
    cpf: "",
    nomeCompleto: "",
    email: "",
    telefone: "",
    enderecoEntrega: {
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
    pedidos: [
      {
        idLoja: "",
        freteValor: 0,
        status: "Pendente"
      },
    ],
    itensPedido: cart.items.map((item) => ({
      idProduto: parseInt(item.id),
      titulo: item.titulo,
      quantidade: item.quantidade,
      precoUnitario: item.valorUnitario,
      precoTotal: item.valorUnitario * item.quantidade,
      peso: item.peso,
      altura: item.altura,
      largura: item.largura,
      profundidade: item.profundidade
    })),
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idLojaFromUrl = urlParams.get("idLoja");
    const subdominio = urlParams.get("subdominio");

    setIdLoja(idLojaFromUrl);

    let savedCart = null;
    if (typeof window !== "undefined") {
      savedCart = localStorage.getItem(`cartData_${subdominio}`);
    }
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setFormData((prevData) => ({
        ...prevData,
        itensPedido: parsedCart.items.map((item: any) => ({
          idProduto: parseInt(item.id),
          tituloProduto: item.titulo,
          quantidade: item.quantidade,
          precoUnitario: item.valorUnitario,
          precoTotal: item.valorUnitario * item.quantidade,
        })),
      }));
    }
  }, [cart]);

  useEffect(() => {
    if (idLoja) {
      setFormData((prevData) => ({
        ...prevData,
        pedidos: [
          {
            idLoja: idLoja,
            freteValor: prevData.pedidos[0].freteValor,
            status: "Pendente"
          },
        ],
      }));
    }
  }, [idLoja]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedEndereco = { ...formData.enderecoEntrega, [name]: value };
    setFormData({
      ...formData,
      enderecoEntrega: updatedEndereco,
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idLoja) {
      alert("O ID da loja não foi encontrado.");
      return;
    }

    const payload = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ''), // Remove todos os não-dígitos
      pedidos: formData.pedidos.map(p => ({
        ...p,
        idLoja: parseInt(p.idLoja, 10),
        itensPedido: formData.itensPedido, // Move os itens para dentro do pedido
      })),
    };
    // Remove o itensPedido do nível raiz, pois ele já foi movido
    delete (payload as any).itensPedido;

    // --- LOG PARA DEBUG AQUI ---
    console.log("DADOS DO PEDIDO (JSON):");
    console.log(JSON.stringify(payload, null, 2));
    // ---------------------------

    try {
      const response = await fetch(`${API_BASE_URL}/pedido/cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Resposta da API (message):", data.message);
      console.log("Resposta da API (error):", data.error);

      if (!response.ok) {
        // Se der Bad Request, isso vai ajudar a ver o que o backend retornou
        console.error("Detalhes do erro 400/500:", data); 
        throw new Error("Erro ao cadastrar o pedido");
      }

      // Lógica para guardar os dados do pedido, caso necessário.
      const subdominio = new URLSearchParams(window.location.search).get(
        "subdominio"
      );
      if (subdominio) {
        const data = localStorage.getItem(`cartData_${subdominio}`);

        if (data) {
          localStorage.setItem("dadosPedidoRealizado", data);
          localStorage.removeItem(`cartData_${subdominio}`);
        } else {
          console.warn(
            "Nenhum dado de carrinho encontrado para o subdomínio:",
            subdominio
          );
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Erro desconhecido");
      }
    }
  };

  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number>(0);
  const [isCalculatingFrete, setIsCalculatingFrete] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let cepValue = e.target.value.replace(/\D/g, ''); // Remove todos os não-dígitos
    
    if (cepValue.length > 5) {
      cepValue = cepValue.slice(0, 5) + '-' + cepValue.slice(5, 8);
    }
    
    setCep(cepValue);
    setCepError(null); // Limpa o erro ao digitar
    setFrete(0); // Reseta o frete ao mudar o CEP

    const unformattedCep = cepValue.replace(/\D/g, '');
    if (unformattedCep.length === 8) {
      await handleFreteCheck(unformattedCep);
    }
  };

    const handleFreteCheck = async (cepToCalculate: string) => {
    setIsCalculatingFrete(true);
    setCepError(null);
    setFrete(0);

    try {
      // 1. Buscar endereço no ViaCEP
      const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${cepToCalculate}/json/`);
      const addressData = viaCepResponse.data;

      if (addressData.erro) {
        throw new Error("CEP não encontrado");
      }

      // 2. Preencher os campos do formulário com os dados do ViaCEP
      setFormData(prevData => ({
        ...prevData,
        enderecoEntrega: {
          ...prevData.enderecoEntrega,
          logradouro: addressData.logradouro,
          bairro: addressData.bairro,
          cidade: addressData.localidade,
          estado: addressData.uf,
          cep: cepToCalculate,
        }
      }));

      // 3. Calcular o frete com o Melhor Envio
      const TokenMelhorEnvio = process.env.NEXT_PUBLIC_MELHORENVIO_TOKEN;

      const postData = {
        from: { postal_code: "06660740" },
        to: { postal_code: cepToCalculate },
        products: formData.itensPedido.map((item) => ({
          id: item.idProduto.toString(),
          width: item.largura || 1,
          height: item.altura || 1,
          length: item.profundidade || 1,
          weight: item.peso || 1,
          insurance_value: 1,
          quantity: item.quantidade,
        })),
      };

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${TokenMelhorEnvio}`,
        "Content-Type": "application/json",
        "User-Agent": "Vitrine (glameiramc@gmail.com)",
      };

      const response = await axios.post("/frete/melhorenvio", postData, { headers });
      
      if (!response.data || response.data.length === 0) {
        throw new Error("Não foi possível calcular o frete para este CEP.");
      }

      const freteValue = parseFloat(response.data[0].price);
      setFrete(freteValue);
      setFormData((prevData) => ({
        ...prevData,
        pedidos: [
          {
            idLoja: prevData.pedidos[0].idLoja,
            freteValor: freteValue,
            status: "Pendente"
          },
        ],
      }));
    } catch (error) {
      console.error("Erro ao processar CEP/Frete:", error);
      setCepError("CEP Inválido ou erro ao calcular frete.");
      setFrete(0);
    } finally {
      setIsCalculatingFrete(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header with progress indicator */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Finalizar Pedido
          </h1>
          <p className="text-muted-foreground">
            Complete as informações abaixo para finalizar sua compra
          </p>

          <div className="flex items-center gap-2 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="text-sm font-medium">Informações</span>
            </div>
            <div className="h-[2px] w-12 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm text-muted-foreground">Pagamento</span>
            </div>
            <div className="h-[2px] w-12 bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm text-muted-foreground">Confirmação</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>Dados do cliente</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                        placeholder="000.000.000-00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nomeCompleto">Nome Completo</Label>
                    <Input
                      type="text"
                      id="nomeCompleto"
                      name="nomeCompleto"
                      value={formData.nomeCompleto}
                      onChange={handleChange}
                      required
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle>Endereço de Entrega</CardTitle>
                      <CardDescription>
                        Para onde enviaremos seu pedido
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          id="cep"
                          name="cep"
                          value={cep}
                          onChange={handleCepChange}
                          required
                          placeholder="00000-000"
                          className={cepError ? "border-red-500" : ""}
                          disabled={isCalculatingFrete}
                        />
                        {isCalculatingFrete && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>}
                      </div>
                      {cepError && <p className="text-sm text-red-500 mt-1">{cepError}</p>}
                      {frete > 0 && !cepError && (
                        <div className="mt-4">
                          {/* <p className="font-medium text-lg">Valor do Frete:</p>
                          <p className="text-xl text-primary">
                            R$ {frete}
                          </p> */}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="logradouro">Logradouro</Label>
                      <Input
                        type="text"
                        id="logradouro"
                        name="logradouro"
                        value={formData.enderecoEntrega.logradouro}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="Rua, Avenida, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número</Label>
                      <Input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formData.enderecoEntrega.numero}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="complemento">Complemento</Label>
                      <Input
                        type="text"
                        id="complemento"
                        name="complemento"
                        value={formData.enderecoEntrega.complemento}
                        onChange={handleEnderecoChange}
                        placeholder="Apto, Bloco, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input
                        type="text"
                        id="bairro"
                        name="bairro"
                        value={formData.enderecoEntrega.bairro}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="Nome do bairro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formData.enderecoEntrega.cidade}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="Sua cidade"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Input
                        type="text"
                        id="estado"
                        name="estado"
                        value={formData.enderecoEntrega.estado}
                        onChange={handleEnderecoChange}
                        required
                        placeholder="UF"
                        maxLength={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Product items */}
                  <div className="space-y-3">
                    {formData.itensPedido.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">{item.titulo}</p>
                          <p className="text-muted-foreground">
                            Quantidade: {item.quantidade}
                          </p>
                        </div>
                        <p className="font-medium">
                          R$ {item.precoTotal.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        R${" "}
                        {formData.itensPedido
                          .reduce((acc, item) => acc + item.precoTotal, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="font-medium">
                        {/* R$ {formData.pedidos[0].freteValor.toFixed(2)} */}
                        R$ {frete}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary">
                      R${" "}
                      {formData.itensPedido.reduce(
                        (acc, item) => acc + item.precoTotal,
                        0
                      ) + frete}
                    </span>
                  </div>

                  {/* Security badge */}
                  <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-muted-foreground">
                      Compra 100% segura e protegida
                    </span>
                  </div>

                  {/* Submit button */}
                  <Button type="submit" className="w-full" size="lg">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Finalizar Pedido
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
