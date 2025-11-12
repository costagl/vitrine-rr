import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Heart } from "lucide-react";
import Image from "next/image";

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos uma plataforma dedicada a democratizar o comércio eletrônico,
            oferecendo ferramentas simples e poderosas para que qualquer pessoa
            possa criar sua loja online.
          </p>
        </div>

        {/* Nossa História */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Nossa História
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-4">
                A Vitrine nasceu em 2025 com uma missão clara: tornar o comércio
                eletrônico acessível para todos. Percebemos que muitos
                empreendedores tinham produtos incríveis, mas enfrentavam
                barreiras técnicas e financeiras para vender online.
              </p>
              <p className="text-lg mb-4">
                Nossa equipe de desenvolvedores e especialistas em e-commerce
                trabalhou incansavelmente para criar uma plataforma que
                eliminasse essas barreiras, oferecendo uma solução completa,
                intuitiva e acessível.
              </p>
              <p className="text-lg">
                Hoje, orgulhosamente servimos milhares de empreendedores em todo
                o Brasil, ajudando-os a transformar suas ideias em negócios
                prósperos no mundo digital.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Valores */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Acessibilidade</h3>
                <p className="text-gray-600">
                  Tornamos o e-commerce acessível para todos, independente do
                  conhecimento técnico.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Inovação</h3>
                <p className="text-gray-600">
                  Constantemente evoluímos nossa plataforma com as melhores
                  tecnologias do mercado.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Qualidade</h3>
                <p className="text-gray-600">
                  Oferecemos ferramentas profissionais com a qualidade que seu
                  negócio merece.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Suporte</h3>
                <p className="text-gray-600">
                  Estamos sempre ao seu lado, oferecendo suporte dedicado para o
                  seu sucesso.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Estatísticas */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Nossos Números
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  10,000+
                </div>
                <div className="text-gray-600">Lojas Criadas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  50,000+
                </div>
                <div className="text-gray-600">Produtos Vendidos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  99.9%
                </div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Suporte</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipe */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  // src="/placeholder.svg?height=150&width=150"
                  src="Screenshot_1.png"
                  alt="CEO"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  layout="responsive"
                  width={500}
                  height={300}
                />
                <h3 className="text-xl font-semibold mb-1">Daniel Santos</h3>
                <Badge variant="secondary" className="mb-3">
                  CEO & Fundador
                </Badge>
                <p className="text-gray-600 text-sm">
                  15 anos de experiência em e-commerce e tecnologia. Visionário
                  por trás da Vitrine.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  src="Screenshot_2.png"
                  alt="CTO"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  layout="responsive"
                  width={500}
                  height={300}
                />
                <h3 className="text-xl font-semibold mb-1">Gabriel Costa</h3>
                <Badge variant="secondary" className="mb-3">
                  CTO
                </Badge>
                <p className="text-gray-600 text-sm">
                  Especialista em arquitetura de software e líder da equipe de
                  desenvolvimento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Image
                  src="Screenshot_3.png"
                  alt="Head de Produto"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  layout="responsive"
                  width={500}
                  height={300}
                />
                <h3 className="text-xl font-semibold mb-1">Leonardo Silva</h3>
                <Badge variant="secondary" className="mb-3">
                  Head de Produto
                </Badge>
                <p className="text-gray-600 text-sm">
                  Responsável pela experiência do usuário e evolução contínua da
                  plataforma.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-primary">Missão</h3>
              <p className="text-gray-700">
                Democratizar o acesso ao comércio eletrônico, fornecendo
                ferramentas simples e poderosas para que qualquer pessoa possa
                criar e gerenciar sua loja online com sucesso.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-primary">Visão</h3>
              <p className="text-gray-700">
                Ser a principal plataforma de e-commerce do Brasil, reconhecida
                pela inovação, simplicidade e pelo impacto positivo na vida dos
                empreendedores.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Compromisso
              </h3>
              <p className="text-gray-700">
                Estamos comprometidos com o sucesso de nossos clientes,
                oferecendo suporte excepcional e evoluindo constantemente nossa
                plataforma para atender suas necessidades.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
