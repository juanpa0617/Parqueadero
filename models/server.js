import express, { json } from 'express';
import dbconnection from '../config/config.db.js';
import 'dotenv/config';
import cellRoutes from '../routes/cellRoutes.js';
import morgan from 'morgan';



export default class Server {
    constructor() {
        this.app = express();
        this.app.use(json());
        this.app.use(morgan('dev'));
        this.dbconnection();
        this.routes();
        this.listen();
    }

    async dbconnection() {
        try {
            await dbconnection();
            console.log('Database connected');
        } catch (error) {
            console.error('Error connecting to database:', error);
        }
    }

    routes() {
        this.app.use('/api', cellRoutes);
    
        // Ruta para la raíz
        this.app.get('/', (req, res) => {
            res.send('API Parqueadero funcionando');
        });
    
        this.app.use((req, res, next) => {
            res.status(404).json({ error: 'Ruta no encontrada' });
        });
    }
    

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
}
