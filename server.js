import express from 'express';
const produtosRouter = require('./routes/produtos.js');
 
const app = express();
app.use(express.json());
 
app.use('/produtos', produtosRouter);
 
app.listen(3000, () => console.log('Rodando em http://localhost:3000'));