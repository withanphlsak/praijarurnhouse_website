const { Pool } = require('pg');
require('dotenv').config();

// สร้าง pool สำหรับเชื่อมต่อกับฐานข้อมูล โดยใช้ค่าจาก env.
const pool = new Pool({
    // ทดสอบใช้render
    connectionString: process.env.DATABASE_URL,
    
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// ส่งออกข้อมูลจาก pool
module.exports = pool;