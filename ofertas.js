
const productos = [
  { nombre: "Creatina Monohidratada 300g", precio: 85000, descuento: 20 },
  { nombre: "Proteína Whey 1Kg", precio: 165000, descuento: 15 },
  { nombre: "Multivitamínico Deportivo", precio: 58000, descuento: 15 },
  { nombre: "Gel Antibacterial 300ml", precio: 9800, descuento: 20 },
  { nombre: "Shampoo Acondicionador 2 en 1", precio: 22500, descuento: 20 },
  { nombre: "Kit de Viaje (cepillo+crema+mini enjuague)", precio: 18000, descuento: 15 },
  { nombre: "Protector Labial con FPS", precio: 12500, descuento: 15 },
  { nombre: "Preservativos Caja x12", precio: 26000, descuento: 20 },
  { nombre: "Lubricante Íntimo 100ml", precio: 28500, descuento: 15 },
  { nombre: "Toallas Húmedas Higiénicas", precio: 8200, descuento: 20 },
];


function formatearPesos(numero) {
  return "$" + numero.toLocaleString("es-CO");
}


function comprarProducto(nombreProducto) {
  alert("Has seleccionado: " + nombreProducto);
}


function crearTabla() { 
  const tbody = document.querySelector("#tablaOfertas tbody");
  
  tbody.innerHTML = "";  
 
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];    
    
    const descuentoPesos = producto.precio * producto.descuento / 100;
    const precioFinal = producto.precio - descuentoPesos;
    
   
    const fila = document.createElement("tr");
    
   
    fila.innerHTML = `
      <td class="producto-nombre">${producto.nombre}</td>
      <td class="precio-original">${formatearPesos(producto.precio)}</td>
      <td><span class="descuento">${producto.descuento}% OFF</span></td>
      <td class="precio-final">${formatearPesos(precioFinal)}</td>
      <td>
        <button class="btn-comprar" onclick="comprarProducto('${producto.nombre}')">
          Comprar
        </button>
      </td>
    `;   
   
    tbody.appendChild(fila); 
 }
}


window.onload = function() {
  crearTabla();
};
