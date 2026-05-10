const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// CREATE
router.post("/", reservationController.createReservation);

// READ
router.get("/", reservationController.getReservations);

// UPDATE
router.put("/:id", reservationController.updateReservation);

// DELETE
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;