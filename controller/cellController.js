import Cell from '../models/Cell.js';
import bcrypt from 'bcrypt';

// Crear una nueva celda
export const createCell = async (req, res) => {
  try {
    const { numeroCelda, placaVehiculo } = req.body;

    if (!numeroCelda) {
      return res.status(400).json({ error: 'El número de celda es requerido' });
    }

    // Crear una nueva instancia del modelo Cell
    const cell = new Cell({ numeroCelda, placaVehiculo, estado: 'disponible' });

    // Concatenar el número de celda con la placa del vehículo
    const pinString = `${numeroCelda}${placaVehiculo || ''}`;

    // Generar un hash encriptado para el PIN
    const salt = await bcrypt.genSalt(10);
    cell.pin = await bcrypt.hash(pinString, salt);

    // Guardar la celda en la base de datos
    await cell.save();

    res.status(201).json(cell);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la celda' });
  }
};

// Obtener una celda específica por ID
export const getCell = async (req, res) => {
  try {
    const cell = await Cell.findById(req.params.id);
    if (!cell) {
      return res.status(404).json({ error: 'Celda no encontrada' });
    }
    res.json(cell);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la celda' });
  }
};

// Obtener todas las celdas
export const getAllCells = async (req, res) => {
  try {
    const cells = await Cell.find();
    res.json(cells);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las celdas' });
  }
};

// Obtener celdas por estado
export const getCellsByEstado = async (req, res) => {
  try {
    const cells = await Cell.find({ estado: req.params.estado });
    res.json(cells);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las celdas por estado' });
  }
};

// Actualizar una celda específica por ID
export const updateCell = async (req, res) => {
  try {
    const cell = await Cell.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cell) {
      return res.status(404).json({ error: 'Celda no encontrada' });
    }
    res.json(cell);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la celda' });
  }
};

// Eliminar una celda específica por ID
export const deleteCell = async (req, res) => {
  try {
    const cell = await Cell.findByIdAndDelete(req.params.id);
    if (!cell) {
      return res.status(404).json({ error: 'Celda no encontrada' });
    }
    res.json({ message: 'Celda eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la celda' });
  }
};

// Método para parquear un vehículo en una celda
// Método para parquear un vehículo en una celda
export const parkVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { placaVehiculo } = req.body;

    const cell = await Cell.findOne({ _id: id, estado: 'disponible' });
    if (!cell) {
      return res.status(400).json({ error: 'Celda no disponible o no encontrada' });
    }

    // Actualizar los datos de la celda
    cell.estado = 'no disponible';
    cell.placaVehiculo = placaVehiculo;
    cell.fechaIngreso = new Date();

    // Recalcular el PIN
    const pinString = `${cell.numeroCelda}${placaVehiculo}`;
    const salt = await bcrypt.genSalt(10);
    cell.pin = await bcrypt.hash(pinString, salt);

    await cell.save();

    res.json(cell);
  } catch (error) {
    res.status(500).json({ error: 'Error al parquear el vehículo' });
  }
};


// Método para calcular el valor a pagar
export const calculatePayment = (req, res) => {
  try {
    const { fechaIngreso, fechaSalida } = req.body;

    if (!fechaIngreso || !fechaSalida) {
      return res.status(400).json({ error: 'Fecha de ingreso y salida son requeridas' });
    }

    const ingreso = new Date(fechaIngreso);
    const salida = new Date(fechaSalida);
    const horas = Math.max(1, Math.floor((salida - ingreso) / (1000 * 60 * 60))); // Calcula las horas
    const costo = horas * 5000;

    res.json({ horas, costo });
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular el pago' });
  }
};

// Método para registrar la salida de un vehículo
export const exitVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const cell = await Cell.findById(id);
    if (!cell || cell.estado === 'disponible') {
      return res.status(400).json({ error: 'Celda no ocupada o no encontrada' });
    }

    // Actualizar los datos de la celda
    cell.estado = 'disponible';
    cell.placaVehiculo = '';
    cell.fechaIngreso = null;
    cell.fechaSalida = new Date();
    cell.pin = '';

    await cell.save();

    res.json(cell);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la salida del vehículo' });
  }
};
