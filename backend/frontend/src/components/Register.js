import React from 'react';

export default function Register({ goLogin }) {
  return (
    // พื้นหลังสีฟ้าอ่อนนุ่มๆ เหมือนหน้า Login
    <div className="flex items-center justify-center min-h-screen bg-blue-50 font-kanit p-6">
      
      {/* การ์ดสมัครสมาชิกสีขาว ขอบมนพิเศษ */}
      <div className="bg-white p-8 md:p-12 rounded-[45px] shadow-2xl w-full max-w-2xl border border-white relative">
        
        {/* ปุ่มย้อนกลับ (อยู่มุมซ้ายบน) */}
        <button 
          onClick={goLogin}
          className="absolute top-8 left-8 text-gray-400 hover:text-blue-500 transition-colors flex items-center gap-2 font-bold cursor-pointer"
        >
          ← ย้อนกลับ
        </button>

        {/* ส่วนหัวข้อ */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-2">สมัครสมาชิก</h1>
          <p className="text-gray-500 text-lg">ห้องเรียนดิจิทัลสำหรับผู้สูงอายุ</p>
        </div>

        {/* ฟอร์มกรอกข้อมูล - แบ่งเป็น 2 คอลัมน์บนจอคอม */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          
          <div className="space-y-2">
            <label className="text-lg font-bold text-gray-700 ml-2">รหัสผู้ใช้</label>
            <input className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-400 outline-none transition-all" placeholder="Username" />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-bold text-gray-700 ml-2">รหัสผ่าน</label>
            <input type="password" className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-400 outline-none transition-all" placeholder="Password" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-lg font-bold text-gray-700 ml-2">ชื่อ-นามสกุล</label>
            <input className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-400 outline-none transition-all" placeholder="กรอกชื่อและนามสกุลของคุณ" />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-bold text-gray-700 ml-2">อายุ</label>
            <input type="number" className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-400 outline-none transition-all" placeholder="ระบุอายุ" />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-bold text-gray-700 ml-2">เบอร์โทรศัพท์</label>
            <input className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-400 outline-none transition-all" placeholder="08x-xxx-xxxx" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-lg font-bold text-gray-700 ml-2">ที่อยู่</label>
            <textarea 
              rows="3"
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-blue-400 outline-none transition-all" 
              placeholder="กรอกที่อยู่ปัจจุบันของคุณ"
            ></textarea>
          </div>
        </div>

        {/* ปุ่มยืนยัน */}
        <div className="mt-10 flex justify-end">
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-2xl text-2xl font-black shadow-lg shadow-blue-200 transition-all active:scale-95 cursor-pointer"
            onClick={() => {
              alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
              goLogin();
            }}
          >
            สมัครสมาชิก
          </button>
        </div>

      </div>
    </div>
  );
}