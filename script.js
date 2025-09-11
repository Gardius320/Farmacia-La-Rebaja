document.addEventListener("DOMContentLoaded", () => {
  
  const miCuenta = document.getElementById("miCuenta");
  if (miCuenta) {
    miCuenta.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "registro.html"; 
    });
  }

  
  const form = document.getElementById("registroForm");
  if (form) {
    
    const successMsg = document.createElement("p");
    successMsg.id = "successMsg";
    successMsg.style.color = "green";
    successMsg.style.fontWeight = "bold";
    form.appendChild(successMsg);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      
      const nombre = document.getElementById("nombre").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const email = document.getElementById("email").value.trim();
      const clave = document.getElementById("clave").value.trim();
      const telefono = document.getElementById("telefono").value.trim();

      let valido = true;

      
      if (nombre === "") {
        document.getElementById("errorNombre").innerText = "El nombre es obligatorio";
        valido = false;
      } else document.getElementById("errorNombre").innerText = "";

      if (apellido === "") {
        document.getElementById("errorApellido").innerText = "El apellido es obligatorio";
        valido = false;
      } else document.getElementById("errorApellido").innerText = "";

      if (!email.includes("@")) {
        document.getElementById("errorEmail").innerText = "Ingrese un email válido";
        valido = false;
      } else document.getElementById("errorEmail").innerText = "";

      if (clave.length < 4) {
        document.getElementById("errorClave").innerText = "La clave debe tener al menos 4 caracteres";
        valido = false;
      } else document.getElementById("errorClave").innerText = "";

      if (telefono === "" || isNaN(telefono)) {
        document.getElementById("errorTelefono").innerText = "Ingrese un número válido";
        valido = false;
      } else document.getElementById("errorTelefono").innerText = "";

      if (!valido) return;

     
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push({ nombre, apellido, email, clave, telefono });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

     
      successMsg.innerText = "✅ Usuario registrado con éxito";

     
      form.reset();

      
      setTimeout(() => {
        successMsg.innerText = "";
      }, 3000);
    });
  }
});
