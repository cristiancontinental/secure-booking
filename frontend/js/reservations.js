function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

async function createReservation() {
  const user = getUser();

  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const description = document.getElementById("description").value;

  const res = await fetch("http://localhost:3000/api/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      service,
      date,
      time,
      description,
      user_id: user.id
    })
  });

  const data = await res.json();

  alert(data.message);
  loadReservations();
}

async function loadReservations() {
  const user = getUser();

  const res = await fetch(`http://localhost:3000/api/reservations?user_id=${user.id}`);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(r => {
    list.innerHTML += `
      <div class="card mt-2 p-3 shadow-sm border-0">

        <h5 class="text-primary">${r.service}</h5>

        <p class="mb-1">📅 ${r.date}</p>
        <p class="mb-1">⏰ ${r.time}</p>
        <p class="text-muted">📝 ${r.description || "Sin descripción"}</p>

        <div class="d-flex gap-2 mt-2">

          <button class="btn btn-warning btn-sm" onclick="goEdit(${r.id})">
            ✏️ Editar
          </button>

          <button class="btn btn-danger btn-sm" onclick="deleteReservation(${r.id})">
            🗑️ Eliminar
          </button>

        </div>

      </div>
    `;
  });
}

loadReservations();

async function deleteReservation(id) {
  if (!confirm("¿Seguro que quieres eliminar esta cita?")) return;

  const res = await fetch(`http://localhost:3000/api/reservations/${id}`, {
    method: "DELETE"
  });

  const data = await res.json();

  alert(data.message);
  loadReservations();
}

function goEdit(id) {
  window.location.href = `edit.html?id=${id}`;
}