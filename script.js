document.addEventListener("DOMContentLoaded", () => {

  const loginLink = document.getElementById("loginLink");
  const miCuentaLink = document.getElementById("miCuentaLink");
  const usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado"));

  if (usuarioLogeado) {

    if (loginLink) loginLink.style.display = "none";
    if (miCuentaLink) {
      miCuentaLink.style.display = "inline";
      miCuentaLink.href = "miCuenta.html"; 
    }
  } else {

    if (miCuentaLink) miCuentaLink.style.display = "none";
    if (loginLink) {
      loginLink.style.display = "inline";
      loginLink.href = "login.html";
    }
  }


  const registroForm = document.getElementById("registroForm");

  if (registroForm) {
    const successMsg = document.createElement("p");
    successMsg.id = "successMsg";
    successMsg.style.color = "green";
    successMsg.style.fontWeight = "bold";
    registroForm.appendChild(successMsg);

    registroForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const apellido = document.getElementById("apellido").value.trim();
      const email = document.getElementById("email").value.trim();
      const clave = document.getElementById("clave").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const genero = document.getElementById("genero").value;

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


      const existe = usuarios.find((u) => u.email === email);
      if (existe) {
        alert("⚠️ Este email ya está registrado. Intenta con otro.");
        return;
      }

      usuarios.push({ nombre, apellido, email, clave, telefono, genero });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      successMsg.innerText = "✅ Usuario registrado con éxito";

      registroForm.reset();

      setTimeout(() => {
        successMsg.innerText = "";
        window.location.href = "login.html"; 
      }, 2000);
    });
  }


  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const clave = document.getElementById("loginClave").value.trim();

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find((u) => u.email === email && u.clave === clave);

      if (!usuario) {
        alert("❌ Email o contraseña incorrectos");
        return;
      }

      localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));

      alert("✅ Bienvenido " + usuario.nombre);
      window.location.href = "drogaslarebaja.html"; 
    });
  }
});
