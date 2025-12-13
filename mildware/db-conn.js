// ./mildware/db-conn.js (Melhorado com process.env)

import { Sequelize } from 'sequelize';

// Acessa as variáveis de ambiente passadas pelo Docker Compose
const DB_NAME = process.env.DB_NAME || 'epm_db';
const DB_USER = process.env.DB_USER || 'Khemer';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Khemer0#';
const DB_HOST = process.env.DB_HOST || 'db'; // 'db' é o fallback para o ambiente Docker
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey'; // Chave secreta para JWT

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

// Teste de conexão (opcional, mas bom para garantir)
async function connectDB() {
    try {
        await sequelize.authenticate();
        // await sequelize.sync({alter: true}); // Sincroniza os modelos com o banco de dados
        console.log('✅ Conexão Sequelize estabelecida com sucesso.');
    } catch (error) {
        console.error('❌ Não foi possível conectar ao banco de dados:', error);
    }
}

connectDB(); // Chama a função para testar a conexão na inicialização

export default sequelize;