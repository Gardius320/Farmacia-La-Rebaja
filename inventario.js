document.addEventListener("DOMContentLoaded", () => {
  const inventarioInicial = [
    { producto: "Acetaminofén", stock: 10 },
    { producto: "Ibuprofeno", stock: 8 },
    { producto: "Jarabe para la tos", stock: 5 },
    { producto: "Vitaminas C", stock: 12 },
    { producto: "Alcohol Antiséptico", stock: 6 },
    { producto: "Omeprazol 20mg", stock: 120 },
    { producto: " Vendas Elásticas", stock: 21 },
    { producto: "Antibiótico Tópico", stock: 15 },
    { producto: "Crema para Quemaduras", stock: 9 },
    { producto: "Antihistamínicos", stock: 14 },
    { producto: "Termómetro Digital", stock: 7 },
    { producto: "Multivitamínico Centrum", stock: 11}
  ];

  
let inventarioGuardado = JSON.parse(localStorage.getItem("inventario")) || [];
inventarioInicial.forEach(item => {
  const existe = inventarioGuardado.some(p => p.producto === item.producto);
  if (!existe) {
    inventarioGuardado.push(item); 
  }
});

localStorage.setItem("inventario", JSON.stringify(inventarioGuardado));
let inventario = inventarioGuardado;
const tabla = document.querySelector("#tablaInventario tbody");
const msgInventario = document.getElementById("msgInventario");


  function renderInventario() {
    tabla.innerHTML = "";
    inventario.forEach((item, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${item.producto}</td>
        <td>${item.stock}</td>
        <td><button onclick="vender(${index})">Vender</button></td>
      `;
      tabla.appendChild(fila);
    });
  }

  window.vender = (index) => {
    if (inventario[index].stock > 0) {
      inventario[index].stock -= 1;
      localStorage.setItem("inventario", JSON.stringify(inventario));

      const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
      ventas.push({ producto: inventario[index].producto, fecha: new Date().toLocaleString() });
      localStorage.setItem("ventas", JSON.stringify(ventas));

      msgInventario.style.color = "green";
      msgInventario.innerText = `✅ Venta registrada: ${inventario[index].producto}`;
    } else {
      msgInventario.style.color = "red";
      msgInventario.innerText = `❌ ${inventario[index].producto} está agotado`;
    }
    renderInventario();

    setTimeout(() => { msgInventario.innerText = ""; }, 2500);
  };

  renderInventario();
});
