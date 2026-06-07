# Atelier Back-end

API básica para gerenciar produtos.

Como executar em desenvolvimento:

```bash
cp .env.example .env
# editar .env e inserir MONGO_URI
npm install
npm run dev
```

Endpoints principais (base: `/products`):

- `POST /products` - criar produto
- `GET /products` - listar produtos
- `GET /products/id/:id` - buscar por ID
- `GET /products/name/:nome` - buscar por nome
- `GET /products/size/:tamanho` - buscar por tamanho
- `PUT /products/:id` - atualizar
- `DELETE /products/:id` - deletar

Depois de fornecer a URL do banco (`MONGO_URI`), a API ficará funcional.
