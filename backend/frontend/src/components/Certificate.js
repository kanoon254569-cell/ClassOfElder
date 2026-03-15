import React from 'react';

export default function Certificate({ userName, courseTitle, onClose }) {
  // วันที่ออกใบประกาศ
  const issueDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 font-kanit">
      <div className="bg-white rounded-[30px] shadow-2xl p-8 md:p-12 w-full max-w-2xl relative animate-scale-in">
        
        {/* ปุ่มปิด */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-light leading-none"
        >
          &times;
        </button>

        <div className="text-center border-4 border-double border-blue-600 p-6 md:p-10 rounded-2xl relative overflow-hidden">
          {/* ตกแต่งมุม */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-blue-100 rounded-br-full opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-100 rounded-tl-full opacity-50"></div>

          <p className="text-xl md:text-2xl text-gray-500 mb-2">ใบประกาศนียบัตร</p>
          <h2 className="text-4xl md:text-5xl font-black text-blue-700 mb-6 font-display">Certificate of Completion</h2>
          
          <p className="text-lg md:text-xl text-gray-600 mb-2">มอบให้แด่</p>
          <h3 className="text-3xl md:text-4xl font-black text-blue-900 mb-8 p-2 border-b-2 border-dashed border-blue-300 mx-auto max-w-[80%]">
            คุณ {userName}
          </h3>
          
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            ผู้ที่ได้เรียนจบหลักสูตร <span className="font-bold text-blue-800">"{courseTitle}"</span> 
            <br/>ด้วยความตั้งใจและมุ่งมั่น
          </p>
          
          <p className="text-md md:text-lg text-gray-500 mt-8">
            ขอให้คุณ {userName} นำความรู้ที่ได้ไปใช้ให้เกิดประโยชน์ในชีวิตประจำวัน
            <br/>และเป็นแรงบันดาลใจให้ผู้อื่นต่อไป
          </p>

          <p className="text-sm text-gray-400 mt-8">ออกให้ ณ วันที่ {issueDate}</p>

          {/* ลายเซ็นต์สมมติ */}
          <div className="mt-10">
            <p className="font-black text-blue-800 text-xl">ทีมงาน "ห้องเรียนดิจิทัล"</p>
            <p className="text-sm text-gray-500">Digital Classroom Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}