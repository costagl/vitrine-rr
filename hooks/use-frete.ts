import axios from "axios";

type ProdutoFrete = {
  id: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  insurance_value: number;
  quantity: number;
};

export async function CalcularFrete(
  cep: string,
  produtos: ProdutoFrete[]
) {
  const TokenMelhorEnvio = process.env.MELHORENVIO_TOKEN;

  const postData = {
    from: {
      postal_code: "06660740",
    },
    to: {
      postal_code: cep,
    },
    products: produtos,
  };

  const headers = {
    "Accept": "application/json",
    "Authorization": `Bearer ${TokenMelhorEnvio}`,
    "Content-Type": "application/json",
    "User-Agent": "Aplicação glameiramc@gmail.com",
  };

  try {
    const response = await axios.post(
      "/frete/melhorenvio",
      postData,
      { headers }
    );
    console.log("Dados enviados com sucesso:", response.data[0]);
    
    return response.data[0].freteValor;
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    return null;
  }
}
