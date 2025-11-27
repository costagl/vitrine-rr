"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Link, MapPin, ArrowLeft, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Layout1CheckoutPage() {
  const [step, setStep] = useState(1);

  // Dados do cliente
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // Lógica de cálculo de pedido (fixa para este exemplo)
  const total = 159.9;
  const frete = 15.9;
  const valorTotal = total + frete;

  const router = useRouter();

  // Função para enviar dados para o backend
  const handleSubmit = async () => {
    const model = {
      Cpf: cpf,
      NomeCompleto: nomeCompleto,
      Email: email,
      Telefone: telefone,
      EnderecosEntrega: [
        {
          Logradouro: endereco,
          Numero: "",
          Complemento: "",
          Bairro: bairro,
          Cidade: cidade,
          Estado: estado,
          Cep: cep,
        },
      ],
      Pedidos: [
        {
          IdLoja: 1, // Assumindo que é a loja 1
          IdEnderecoEntrega: 1, // Associar o ID de endereço de entrega
          ValorTotal: valorTotal,
          FreteValor: frete,
          FormaPagamento: "Cartão de Crédito", // Pode ser selecionado na próxima etapa
          CodigoRastreamento: "",
          DataPagamento: new Date().toISOString(),
          DataEnvio: new Date().toISOString(),
          Observacoes: "Observações do pedido",
        },
      ],
      ItensPedido: [
        {
          IdProduto: 1, // Exemplo de ID do produto
          Quantidade: 1, // Exemplo de quantidade
          PrecoUnitario: total,
          PrecoTotal: total,
        },
      ],
    };

    try {
      const response = await fetch("http://34.39.207.214/pedido/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar o pedido");
      }

      const result = await response.json();
      alert(result.message);
      router.push("/pedidos"); // Redirecionar para a lista de pedidos
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro: " + error.message); // Agora é seguro acessar `message`
      } else {
        alert("Erro desconhecido"); // Caso o erro não seja uma instância de `Error`
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/layout-1"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Voltar à loja</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Finalizar Compra</h1>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Compra Segura</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados de Entrega */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Dados de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        placeholder="Seu nome completo"
                        value={nomeCompleto}
                        onChange={(e) => setNomeCompleto(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        placeholder="(11) 99999-9999"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        placeholder="Rua, número"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input
                        id="bairro"
                        placeholder="Seu bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        placeholder="Sua cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Select value={estado} onValueChange={setEstado}>
                        <SelectTrigger>
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">SP</SelectItem>
                          <SelectItem value="RJ">RJ</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          {/* Adicionar mais estados conforme necessário */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Continuar para Pagamento
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Pagamento e Finalização */}
            {/* Aqui você pode continuar com o processo de pagamento e finalizar o pedido */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Finalizar Pedido
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
