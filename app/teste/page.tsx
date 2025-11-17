// // TODO: Remover este arquivo após testes

// "use client";

// import { useState } from 'react';

// const UploadImage = () => {
//   const [imageBytes, setImageBytes] = useState<Uint8Array | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   // Função que lida com o upload e converte a imagem em bytes
//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];

//     if (file) {
//       const reader = new FileReader();

//       // Primeiro, leremos a imagem como DataURL para a pré-visualização
//       reader.onloadend = () => {
//         // Exibe a pré-visualização da imagem
//         setImagePreview(reader.result as string);

//         // Agora, vamos ler a imagem como ArrayBuffer para obter os bytes
//         const byteReader = new FileReader();
//         byteReader.onloadend = () => {
//           const byteArray = new Uint8Array(byteReader.result as ArrayBuffer);
//           setImageBytes(byteArray);
//         };

//         byteReader.readAsArrayBuffer(file); // Lê a imagem como ArrayBuffer (bytes)
//       };

//       // Lê o arquivo como DataURL para o preview
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload de Imagem</h1>

//       {/* Campo para selecionar a imagem */}
//       <input 
//         type="file" 
//         accept="image/*" 
//         onChange={handleImageUpload}
//       />

//       {/* Exibindo a prévia da imagem */}
//       {imagePreview && <img src={imagePreview} alt="Preview" width="200" />}

//       {/* Exibindo os bytes da imagem (se necessário) */}
//       {imageBytes && <pre>{JSON.stringify(Array.from(imageBytes), null, 2)}</pre>}
//     </div>
//   );
// };

// export default UploadImage;

