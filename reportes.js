document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.querySelector("#tablaReportes tbody");
  const ctx = document.getElementById("grafico").getContext("2d");


  let productos = JSON.parse(localStorage.getItem("productos")) || [];


  tablaBody.innerHTML = "";
  productos.forEach(item => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.stock}</td>
    `;
    tablaBody.appendChild(fila);
  });

 
  if (productos.length > 0) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: productos.map(p => p.nombre),
        datasets: [{
          label: "Stock Disponible",
          data: productos.map(p => p.stock),
          backgroundColor: ["#74b9ff", "#a3e4d7", "#fab1a0", "#ffeaa7", "#55efc4"]
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
});

