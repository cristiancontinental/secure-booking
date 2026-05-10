const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // 2. Verificar si usuario existe
    const queryCheck = "SELECT * FROM users WHERE email = ?";
    db.query(queryCheck, [email], async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      // 3. Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 4. Insertar usuario
      const queryInsert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      db.query(queryInsert, [name, email, hashedPassword], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(201).json({
          message: "Usuario registrado correctamente",
          userId: data.insertId
        });
      });
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y password son obligatorios" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];

    // comparar password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    return res.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  });
};