import mongoose from 'mongoose';

const cellSchema = new mongoose.Schema({
  numeroCelda: { type: Number, required: true, unique: true },
  estado: { type: String, enum: ['disponible', 'no disponible'], default: 'disponible' },
  placaVehiculo: { type: String, maxlength: 6 },
  fechaIngreso: { type: Date },
  fechaSalida: { type: Date },
  pin: { type: String }
},
  { timestamps: true },
  { versionKey: false }
);

// Método estático para obtener el siguiente número de celda
cellSchema.statics.getNextNumeroCelda = async function() {
  const lastCell = await this.findOne().sort({ numeroCelda: -1 });
  return lastCell ? lastCell.numeroCelda + 1 : 1;
};

// Crear el modelo
const Cell = mongoose.model('Cell', cellSchema);

export default Cell;
