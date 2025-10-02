document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.querySelector("#tablaInventario tbody");
  const agregarBtn = document.getElementById("agregarBtn");
  const productoInput = document.getElementById("producto");
  const stockInput = document.getElementById("stock");
  const msgInventario = document.getElementById("msgInventario");


  let productos = JSON.parse(localStorage.getItem("productos")) || [];


  const mostrarProductos = () => {
    tablaBody.innerHTML = "";
    if (productos.length === 0) {
      msgInventario.innerText = "⚠️ No hay productos en el inventario";
      return;
    }
    msgInventario.innerText = "";

    productos.forEach((item, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.stock}</td>
        <td class="acciones"><button class="venderBtn">Vender</button></td>
      `;
      tablaBody.appendChild(fila);

      fila.querySelector(".venderBtn").addEventListener("click", () => {
        if (productos[index].stock > 0) {
          productos[index].stock--;
          localStorage.setItem("productos", JSON.stringify(productos));
          mostrarProductos();
        } else {
          alert("Producto agotado");
        }
      });
    });
  };


  agregarBtn.addEventListener("click", () => {
    const producto = productoInput.value.trim();
    const stock = parseInt(stockInput.value);

    if (producto === "" || isNaN(stock) || stock <= 0) {
      alert("Por favor ingrese un producto válido y stock mayor a 0");
      return;
    }

    productos.push({ nombre: producto, stock: stock });
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();

    productoInput.value = "";
    stockInput.value = "";
  });

  mostrarProductos();
});
