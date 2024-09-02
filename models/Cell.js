import mongoose from 'mongoose';

const cellSchema = new mongoose.Schema({
  numeroCelda: { type: Number, required: true, unique: true },
  estado: { type: String, enum: ['disponible', 'no disponible'], default: 'disponible' },
  placaVehiculo: { type: String, maxlength: 6 },
  fechaIngreso: { type: Date },
  fechaSalida: { type: Date },
  pin: { type: String }
});

const Cell = mongoose.model('Cell', cellSchema);

export default Cell;
