document.addEventListener("DOMContentLoaded", () => {
  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

  const listaVentas = document.getElementById("listaVentas");
  const listaAgotados = document.getElementById("listaAgotados");

  if (ventas.length === 0) {
    listaVentas.innerHTML = "<li>No hay ventas registradas aún.</li>";
  } else {
    ventas.forEach(v => {
      const li = document.createElement("li");
      li.textContent = `${v.producto} vendido el ${v.fecha}`;
      listaVentas.appendChild(li);
    });
  }

  const agotados = inventario.filter(p => p.stock === 0);
  if (agotados.length === 0) {
    listaAgotados.innerHTML = "<li>No hay productos agotados.</li>";
  } else {
    agotados.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.producto} - Agotado`;
      li.classList.add("agotado");
      listaAgotados.appendChild(li);
    });
  }
});
