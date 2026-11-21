import express, { Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json';
import { RegisterRoutes } from './routes/routes';

const app = express();
const PORT = 80;
app.use(express.json())

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

RegisterRoutes(app)

app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument)
);