import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, AlertTriangle } from "lucide-react"

export default function TermosUsoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Termos de Uso</h1>
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: 15 de Janeiro de 2024</span>
            </div>
            <Badge variant="secondary">Versão 2.1</Badge>
          </div>
        </div>

        {/* Aviso Importante */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">Importante</h3>
                <p className="text-orange-700">
                  Ao utilizar os serviços da Vitrine, você concorda com estes termos de uso. Recomendamos a leitura
                  completa deste documento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 1. Definições */}
          <Card>
            <CardHeader>
              <CardTitle>1. Definições</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>Para os fins destes Termos de Uso, consideram-se as seguintes definições:</p>
              <ul>
                <li>
                  <strong>Vitrine:</strong> A plataforma de e-commerce operada pela empresa Vitrine Tecnologia Ltda.
                </li>
                <li>
                  <strong>Usuário:</strong> Qualquer pessoa física ou jurídica que utiliza os serviços da Vitrine.
                </li>
                <li>
                  <strong>Loja:</strong> O espaço virtual criado pelo usuário na plataforma para venda de produtos.
                </li>
                <li>
                  <strong>Serviços:</strong> Todas as funcionalidades oferecidas pela plataforma Vitrine.
                </li>
                <li>
                  <strong>Conteúdo:</strong> Qualquer informação, texto, imagem ou material enviado pelo usuário.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 2. Aceitação dos Termos */}
          <Card>
            <CardHeader>
              <CardTitle>2. Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Ao acessar e utilizar a plataforma Vitrine, você declara ter lido, compreendido e concordado com todos
                os termos e condições estabelecidos neste documento.
              </p>
              <p>
                Caso não concorde com qualquer disposição destes termos, você deve interromper imediatamente o uso da
                plataforma.
              </p>
            </CardContent>
          </Card>

          {/* 3. Cadastro e Conta */}
          <Card>
            <CardHeader>
              <CardTitle>3. Cadastro e Conta</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>3.1 Requisitos para Cadastro</h4>
              <p>Para utilizar nossos serviços, você deve:</p>
              <ul>
                <li>Ser maior de 18 anos ou ter autorização legal</li>
                <li>Fornecer informações verdadeiras e atualizadas</li>
                <li>Manter a confidencialidade de sua senha</li>
                <li>Ser responsável por todas as atividades em sua conta</li>
              </ul>

              <h4>3.2 Responsabilidades do Usuário</h4>
              <p>O usuário se compromete a:</p>
              <ul>
                <li>Utilizar a plataforma de forma legal e ética</li>
                <li>Não violar direitos de terceiros</li>
                <li>Manter suas informações atualizadas</li>
                <li>Notificar imediatamente sobre uso não autorizado de sua conta</li>
              </ul>
            </CardContent>
          </Card>

          {/* 4. Uso da Plataforma */}
          <Card>
            <CardHeader>
              <CardTitle>4. Uso da Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>4.1 Licença de Uso</h4>
              <p>
                A Vitrine concede ao usuário uma licença limitada, não exclusiva e revogável para utilizar a plataforma
                conforme estes termos.
              </p>

              <h4>4.2 Restrições de Uso</h4>
              <p>É expressamente proibido:</p>
              <ul>
                <li>Usar a plataforma para atividades ilegais</li>
                <li>Vender produtos proibidos ou regulamentados</li>
                <li>Violar direitos autorais ou propriedade intelectual</li>
                <li>Enviar spam ou conteúdo malicioso</li>
                <li>Tentar acessar sistemas não autorizados</li>
                <li>Interferir no funcionamento da plataforma</li>
              </ul>
            </CardContent>
          </Card>

          {/* 5. Produtos e Conteúdo */}
          <Card>
            <CardHeader>
              <CardTitle>5. Produtos e Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>5.1 Responsabilidade pelo Conteúdo</h4>
              <p>
                O usuário é inteiramente responsável por todo o conteúdo que publica em sua loja, incluindo descrições
                de produtos, imagens, preços e informações de contato.
              </p>

              <h4>5.2 Produtos Proibidos</h4>
              <p>É proibida a venda de:</p>
              <ul>
                <li>Produtos ilegais ou regulamentados</li>
                <li>Armas, munições e explosivos</li>
                <li>Drogas e substâncias controladas</li>
                <li>Produtos falsificados ou pirateados</li>
                <li>Conteúdo adulto ou pornográfico</li>
                <li>Animais vivos</li>
              </ul>
            </CardContent>
          </Card>

          {/* 6. Pagamentos e Taxas */}
          <Card>
            <CardHeader>
              <CardTitle>6. Pagamentos e Taxas</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>6.1 Planos e Assinaturas</h4>
              <p>
                A Vitrine oferece diferentes planos de serviço, incluindo opções gratuitas e pagas. Os valores e
                condições estão disponíveis em nossa página de planos.
              </p>

              <h4>6.2 Taxas sobre Vendas</h4>
              <p>
                Cobramos uma taxa sobre as vendas realizadas através da plataforma. As taxas variam conforme o plano
                contratado e meio de pagamento utilizado.
              </p>

              <h4>6.3 Política de Reembolso</h4>
              <p>
                Reembolsos de assinaturas são processados conforme nossa política específica, disponível na central de
                ajuda.
              </p>
            </CardContent>
          </Card>

          {/* 7. Propriedade Intelectual */}
          <Card>
            <CardHeader>
              <CardTitle>7. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Todos os direitos de propriedade intelectual da plataforma Vitrine, incluindo software, design, marcas e
                conteúdo, pertencem à Vitrine Tecnologia Ltda.
              </p>
              <p>
                O usuário mantém os direitos sobre o conteúdo que publica, mas concede à Vitrine uma licença para exibir
                e processar esse conteúdo conforme necessário para operação dos serviços.
              </p>
            </CardContent>
          </Card>

          {/* 8. Privacidade e Dados */}
          <Card>
            <CardHeader>
              <CardTitle>8. Privacidade e Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                O tratamento de dados pessoais é regido por nossa Política de Privacidade, que faz parte integrante
                destes termos.
              </p>
              <p>
                Coletamos e utilizamos dados conforme necessário para prestação dos serviços e em conformidade com a Lei
                Geral de Proteção de Dados (LGPD).
              </p>
            </CardContent>
          </Card>

          {/* 9. Limitação de Responsabilidade */}
          <Card>
            <CardHeader>
              <CardTitle>9. Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                A Vitrine não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes
                do uso da plataforma.
              </p>
              <p>
                Nossa responsabilidade está limitada ao valor pago pelo usuário nos 12 meses anteriores ao evento que
                deu origem à reclamação.
              </p>
            </CardContent>
          </Card>

          {/* 10. Modificações */}
          <Card>
            <CardHeader>
              <CardTitle>10. Modificações dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                A Vitrine reserva-se o direito de modificar estes termos a qualquer momento. As alterações serão
                comunicadas através da plataforma ou por email.
              </p>
              <p>O uso continuado da plataforma após as modificações constitui aceitação dos novos termos.</p>
            </CardContent>
          </Card>

          {/* 11. Rescisão */}
          <Card>
            <CardHeader>
              <CardTitle>11. Rescisão</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Qualquer das partes pode rescindir este acordo a qualquer momento. A Vitrine pode suspender ou encerrar
                contas que violem estes termos.
              </p>
              <p>
                Após o encerramento, o usuário perde o acesso aos serviços, mas as obrigações de pagamento permanecem
                válidas.
              </p>
            </CardContent>
          </Card>

          {/* 12. Disposições Gerais */}
          <Card>
            <CardHeader>
              <CardTitle>12. Disposições Gerais</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>12.1 Lei Aplicável</h4>
              <p>
                Estes termos são regidos pelas leis brasileiras, especificamente pelo Código de Defesa do Consumidor e
                Marco Civil da Internet.
              </p>

              <h4>12.2 Foro</h4>
              <p>
                Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias decorrentes destes
                termos.
              </p>

              <h4>12.3 Contato</h4>
              <p>Para dúvidas sobre estes termos, entre em contato através do email: juridico@vitrine.com.br</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
