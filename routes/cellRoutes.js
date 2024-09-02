import express from 'express';
import {
  createCell,
  getCell,
  getAllCells,
  getCellsByEstado,
  updateCell,
  deleteCell,
  parkVehicle,
  calculatePayment,
  exitVehicle
} from '../controller/cellController.js';

const router = express.Router();

router.post('/celdas', createCell);
router.get('/celdas/:id', getCell);
router.get('/celdas', getAllCells);
router.get('/celdas/estado/:estado', getCellsByEstado);
router.put('/celdas/:id', updateCell);
router.delete('/celdas/:id', deleteCell);

router.post('/celdas/:id/park', parkVehicle);
router.post('/celdas/calculate-payment', calculatePayment);
router.post('/celdas/:id/exit', exitVehicle);

export default router;
