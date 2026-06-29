CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE financeiro (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
    descricao VARCHAR(100),
    valor DECIMAL(10,2) NOT NULL,
    data_movimento DATE DEFAULT CURRENT_DATE
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    produto_id INT REFERENCES produtos(id),
    quantidade INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    data_pedido DATE DEFAULT CURRENT_DATE
);

INSERT INTO usuarios (nome, email, senha) VALUES
('Admin', 'admin@email.com', '123456');

INSERT INTO produtos (nome, preco, quantidade) VALUES
('Notebook', 3500.00, 10),
('Mouse', 80.00, 50),
('Teclado', 150.00, 30);

INSERT INTO financeiro (tipo, descricao, valor) VALUES
('entrada', 'Venda inicial', 500.00),
('saida', 'Compra de estoque', 200.00);