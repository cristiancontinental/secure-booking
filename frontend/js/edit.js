const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 🔹 cargar datos actuales
async function loadReservation() {
  const res = await fetch("http://localhost:3000/api/reservations");
  const data = await res.json();

  const reservation = data.find(r => r.id == id);

  if (!reservation) return;

  document.getElementById("service").value = reservation.service;
  document.getElementById("date").value = reservation.date;
  document.getElementById("time").value = reservation.time;
  document.getElementById("description").value = reservation.description;
}

loadReservation();

// 🔹 actualizar reserva
async function updateReservation() {
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const description = document.getElementById("description").value;

  const res = await fetch(`http://localhost:3000/api/reservations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      service,
      date,
      time,
      description
    })
  });

  const data = await res.json();

  alert(data.message);
  window.location.href = "dashboard.html";
}