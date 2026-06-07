"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./src/routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const cartRoutes_1 = __importDefault(require("./src/routes/cartRoutes"));
const database_1 = require("./src/database");
const errorHandler_1 = require("./src/midllewares/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// rotas
app.use('/products', productRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/carts', cartRoutes_1.default);
// rota health
app.get('/', (_req, res) => res.send('Atelier API'));
// error handler
app.use(errorHandler_1.errorHandler);
// conectar ao DB se variável estiver definida
(0, database_1.connectDB)(process.env.MONGO_URI || '');
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map