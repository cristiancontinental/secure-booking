const user = JSON.parse(localStorage.getItem("user"));

function goLogin() {
  window.location.href = "index.html";
}

function goRegister() {
  window.location.href = "register.html";
}

function goReserve() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Debes iniciar sesión primero");
    window.location.href = "index.html";
    return;
  }

  window.location.href = "dashboard.html";
}