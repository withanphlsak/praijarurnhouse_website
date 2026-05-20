const { Pool } = require('pg');
require('dotenv').config();

// ใช้กับhost
if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // จำเป็นต้องใส่บรรทัดนี้ เพื่อให้โค้ดคุยกับ PostgreSQL บนคลาวด์ผ่านระบบ SSL ได้อย่างปลอดภัย
        }
    });
} else {
    // ถ้าเป็น Localhost
    pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    })};
    
module.exports = pool;