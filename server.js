const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const pool = require('./db');
require('dotenv').config({path: './env'});
const app = express();
const path = require('path');
const server = http.createServer(app);
const io = new Server(server, {cors:{origin:"*"}});

// การเปลี่ยนชื่อไฟล์ในการเเสดงผลหน้าเเรกจาก index.html เป็นหน้าที่เราต้องการให้เป็นหน้าเเรก
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'main.html')); //ใช้ checkrooms.html เป็นหน้าเเรกก่อนเพราะยังทำ main ไม่เสร็จ
});

// เพื่ออณุญาติให้portอื่นสามารถเข้าถึงได้
app.use(cors());
// เเปลง json เป็น object
app.use(express.json());
// กำหนดให้ไฟล์ในโฟลเดอร์ front สามารถเข้าถึงได้ผ่าน URL
app.use(express.static('front'));

// ดึงข้อมูลห้องพักทั้งหมด
app.get('/api/rooms', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rooms ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'failed hook data'});
    }
});

// อัพเดตสถานะห้องพัก
app.post('/api/update-status', async (req, res) => {
    const {id, status} = req.body;
    try {
        await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', [status, id]);
        io.emit('statusChange');
        res.json({message:'status changed'});
    } catch (err) {
        res.status(500).json({error: "failed update"})
    }
});

// ตั้งค่าเซิร์ฟเวอร์ให้ดูที่พอร์ตที่กำหนดใน env. หรือพอร์ต 5000
const PORT = process.env.PORT || 5000;
// เซิร์ฟเวอร์เริ่มทำงานตามพอร์ตที่กำหนด เมื่อเรา run server
server.listen(PORT,() => console.log(`server running on http://localhost:${PORT}`));