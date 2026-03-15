const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// --- 1. CONFIGURATION ---
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// --- 2. DATABASE CONNECTION (อัปเดตใหม่ตรงนี้!) ---
// เพิ่ม Timeout เพื่อให้ระบบไม่ค้างถ้าหา MongoDB ไม่เจอ
mongoose.connect('mongodb://localhost:27017/seniorDB', {
  serverSelectionTimeoutMS: 5000 
})
  .then(() => console.log('✅ MongoDB เชื่อมต่อสำเร็จแล้วจ้า!'))
  .catch(err => {
    console.error('❌ MongoDB พังนะสัส! ลืมลงโปรแกรมหรือลืมเปิดหรือเปล่า?:', err.message);
    console.log('💡 วิธีแก้: ไปโหลด MongoDB Community Server มาลงเครื่องก่อนนะน้องชาย');
  });

// --- 3. DATABASE SCHEMA ---
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: String,
    completedCourses: [String]
});
const User = mongoose.model('User', UserSchema);

// --- 4. COURSE DATA ---
const courses = [
    { 
        id: "tech-1", 
        title: "การใช้งาน LINE เบื้องต้น", 
        content: "เรียนรู้วิธีการส่งสติกเกอร์ และการโทรวิดีโอคอลหาลูกหลาน",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
        quiz: [
            { q: "ถ้าต้องการเห็นหน้าลูกหลานขณะคุย ต้องกดปุ่มใด?", a: ["พิมพ์ข้อความ", "วิดีโอคอล", "ส่งสติกเกอร์"], correct: 1 }
        ]
    },
    { 
        id: "safe-1", 
        title: "รู้ทันแก๊งคอลเซ็นเตอร์", 
        content: "วิธีป้องกันตัวจากเบอร์แปลกและห้ามบอกรหัส OTP ให้ใครเด็ดขาด",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
        quiz: [
            { q: "หากมีคนโทรมาอ้างเป็นตำรวจขอตรวจสอบเงิน ควรทำอย่างไร?", a: ["โอนเงินให้ตรวจสอบ", "วางสายแล้วปรึกษาลูกหลาน", "แจ้งรหัสธนาคาร"], correct: 1 }
        ]
    }
];

// --- 5. API ROUTES ---
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

app.post('/api/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({ status: 'ok', message: 'สมัครสมาชิกสำเร็จ' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: 'ชื่อผู้ใช้นี้มีคนใช้แล้ว' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ status: 'ok', user });
        } else {
            res.status(401).json({ status: 'error', message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'เกิดข้อผิดพลาดที่ระบบหลังบ้าน' });
    }
});

app.post('/api/complete-course', async (req, res) => {
    const { username, courseId } = req.body;
    await User.updateOne({ username }, { $addToSet: { completedCourses: courseId } });
    res.json({ status: 'ok', message: 'สอบผ่านแล้ว! ยินดีด้วยครับ' });
});

// --- 6. START SERVER ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 หลังบ้านทำงานแล้วที่ Port ${PORT}`);
    console.log(`🔗 เช็คข้อมูลวิชาได้ที่ http://localhost:${PORT}/api/courses`);
});