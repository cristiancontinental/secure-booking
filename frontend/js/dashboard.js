const user = JSON.parse(localStorage.getItem("user"));

// 🔐 Protección de ruta
if (!user) {
  window.location.href = "index.html";
}

// 👤 Mostrar usuario
document.addEventListener("DOMContentLoaded", () => {
  const userName = document.getElementById("userName");
  if (userName) {
    userName.innerText = user.name;
  }

  loadReservations();
});

// 🚪 Logout
window.logout = function () {
  if (confirm("¿Cerrar sesión?")) {
    localStorage.removeItem("user");
    window.location.href = "home.html";
  }
};

// 📋 Cargar reservas
async function loadReservations() {
  try {
    const res = await fetch(`http://localhost:3000/api/reservations?user_id=${user.id}`);
    const data = await res.json();

    const list = document.getElementById("list");

    if (!list) return;

    list.innerHTML = "";

    data.forEach(r => {
      list.innerHTML += `
        <div class="card p-2 mt-2">
          <b>${r.service}</b><br>
          ${r.date} - ${r.time}
          <p>${r.description}</p>
        </div>
      `;
    });

  } catch (error) {
    console.log("Error cargando reservas:", error);
  }
}