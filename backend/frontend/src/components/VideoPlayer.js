import React, { useState } from 'react';

// เพิ่ม onStartQuiz เข้ามาใน props ตรงนี้
export default function VideoPlayer({ lesson, onBack, onStartQuiz }) {
  // สร้าง State เพื่อเก็บว่ากำลังดูวิดีโอตัวที่เท่าไหร่
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

  // ตรวจสอบว่าข้อมูล videos เป็น Array หรือไม่
  const videoList = Array.isArray(lesson.videos) 
    ? lesson.videos 
    : [{ title: "วิดีโอหลัก", url: lesson.videoUrl }];

  const currentVideo = videoList[currentVideoIdx];

  return (
    <div className="min-h-screen bg-white font-kanit">
      {/* แถบบน: ชื่อบทเรียนและปุ่มปิด */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-2xl text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            ✕
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800 leading-tight">{lesson.name}</h2>
            <p className="text-sm text-blue-500 font-bold">กำลังรับชม: {currentVideo.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hidden md:block">บทเรียนถัดไป →</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* ส่วนเล่นวิดีโอ (Video Player) */}
        <div className="aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl mb-8 relative group">
          <iframe 
            className="w-full h-full"
            src={currentVideo.url} 
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        {/* รายการวิดีโอ (Playlist) */}
        {videoList.length > 1 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-700 mb-4">เลือกตอนเรียน ({videoList.length} ตอน):</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {videoList.map((video, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIdx(index)}
                  className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 ${
                    currentVideoIdx === index 
                    ? "border-blue-500 bg-blue-50 text-blue-700" 
                    : "border-gray-100 bg-gray-50 text-gray-500 hover:border-blue-200"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentVideoIdx === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-bold truncate">{video.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* รายละเอียดใต้บทเรียน */}
        <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100">
          <h3 className="text-2xl font-black text-blue-900 mb-4">รายละเอียดบทเรียน</h3>
          <p className="text-lg text-blue-800 leading-relaxed">
            ยินดีต้อนรับเข้าสู่บทเรียน {lesson.name} ในตอน <b>"{currentVideo.title}"</b> ครับ 
            หากคุณลุงคุณป้าดูจบแล้ว สามารถกดเลือกตอนอื่นๆ หรือเริ่มทำแบบทดสอบได้เลยนะครับ
          </p>
          
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button className="flex-1 bg-white text-blue-600 py-4 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all">
              ดาวน์โหลดเอกสารประกอบ
            </button>
            
            {/* แก้ไขปุ่มสีเขียวให้เรียกใช้ onStartQuiz */}
            <button 
              onClick={onStartQuiz}
              className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-600 transition-all active:scale-95 cursor-pointer"
            >
              ทำแบบทดสอบหลังเรียน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}