import React from 'react';

// 1. เพิ่ม onLogin เข้าไปในวงเล็บเพื่อให้รับฟังก์ชันมาจาก App.js
export default function Login({ onLogin, goReg }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 font-kanit">
      <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md text-center border border-white">
        
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" style={{ width: '120px' }} />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">เข้าสู่ระบบ</h1>
        <p className="text-gray-500 mb-8">ห้องเรียนดิจิทัลสำหรับผู้สูงอายุ</p>

        <div className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">รหัสผู้ใช้</label>
            <input 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username" 
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">รหัสผ่าน</label>
            <input 
              type="password" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password" 
            />
          </div>
        </div>

        {/* 2. ใส่ onClick={onLogin} ที่ปุ่มเพื่อให้เมื่อกดแล้วมันไปรันฟังก์ชัน handleLogin ใน App.js */}
        <button 
          onClick={onLogin} 
          className="w-full bg-blue-500 text-white py-4 rounded-2xl text-xl font-bold mt-8 hover:bg-blue-600 transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          เข้าสู่ระบบ
        </button>

        <p className="mt-8 text-gray-500">
          ยังไม่มีบัญชี? <button onClick={goReg} className="text-blue-500 font-bold underline cursor-pointer">สมัครสมาชิก</button>
        </p>
      </div>
    </div>
  );
}