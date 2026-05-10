const db = require("../config/db");

// CREAR RESERVA
exports.createReservation = (req, res) => {
  const { service, date, time, description, user_id } = req.body;

  if (!service || !date || !time || !user_id) {
    return res.status(400).json({ message: "Campos obligatorios faltantes" });
  }

  const query = `
    INSERT INTO reservations (service, date, time, description, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [service, date, time, description, user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json({
        message: "Reserva creada correctamente",
        reservationId: result.insertId
      });
    }
  );
};

// OBTENER RESERVAS
exports.getReservations = (req, res) => {
  const { user_id } = req.query;

  const query = "SELECT * FROM reservations WHERE user_id = ?";

  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};

exports.updateReservation = (req, res) => {
  const { id } = req.params;
  const { service, date, time, description } = req.body;

  const query = `
    UPDATE reservations 
    SET service = ?, date = ?, time = ?, description = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [service, date, time, description, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      return res.json({
        message: "Reserva actualizada correctamente"
      });
    }
  );
};

exports.deleteReservation = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM reservations WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    return res.json({
      message: "Reserva eliminada correctamente"
    });
  });
};

