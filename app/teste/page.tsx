// "use client";

// import { useEffect } from "react";
// import { manageLocalStorage } from "@/contexts/auth-context";

// function TestePage() {
//   useEffect(() => {

//     const userDataString = manageLocalStorage("get", "user");
//     const userData = userDataString ? JSON.parse(userDataString) : null;

//     console.log("User Data from Local Storage:", JSON.stringify(userData, null, 2));
//   }, []);

//   return (
//     <div>
//       <h1>Teste de Log no Console</h1>
//       <p>Abra o console para verificar o que está sendo logado.</p>
//     </div>
//   );
// }

// export default TestePage;
