import React from 'react';

// เพิ่ม onShowCertificate เข้ามาใน props
export default function Dashboard({ user, onStartLesson, onLogout, completedLessons = [], onShowCertificate }) {
  
  const courses = [
    { 
      id: 1, 
      title: "พื้นฐานการใช้เทคโนโลยี", 
      image: "https://img.freepik.com/free-vector/old-people-using-technological-devices_23-2148203598.jpg",
      updated: "2 days ago",
      lessonIds: [101, 102, 103, 104] 
    },
    { 
      id: 2, 
      title: "สุขภาพกายและใจ", 
      image: "https://img.freepik.com/free-photo/elderly-woman-using-digital-tablet_53876-43033.jpg",
      updated: "2 days ago",
      lessonIds: [201, 202, 203, 204, 205]
    },
    { 
      id: 3, 
      title: "ความปลอดภัยในชีวิตประจำวัน", 
      image: "https://img.freepik.com/free-vector/safe-browsing-concept-illustration_114360-3134.jpg",
      updated: "2 days ago",
      lessonIds: [301, 302, 303, 304]
    },
    { 
      id: 4, 
      title: "การเงินและสิทธิประโยชน์", 
      image: "https://img.freepik.com/free-photo/mobile-banking-concept_53876-133957.jpg",
      updated: "2 days ago",
      lessonIds: [401, 402, 403, 404, 405]
    },
    { 
      id: 5, 
      title: "การเรียนรู้ตลอดชีวิต", 
      image: "https://img.freepik.com/free-vector/grandfather-teaching-his-grandson-how-use-tablet_23-2148194488.jpg",
      updated: "2 days ago",
      lessonIds: [501, 502, 503, 504]
    },
    { 
      id: 6, 
      title: "สังคมและการสื่อสาร", 
      image: "https://img.freepik.com/free-photo/senior-people-using-technology-together_23-2148782200.jpg",
      updated: "2 days ago",
      lessonIds: [601, 602, 603]
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FD] font-kanit pb-20">
      
      {/* Header ส่วนบน */}
      <nav className="bg-white px-8 py-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl">🎓</div>
          <h1 className="text-xl font-bold text-gray-800 hidden md:block">ห้องเรียนดิจิทัล</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400 font-medium leading-none">ยินดีต้อนรับ</p>
            <span className="text-gray-800 font-bold">คุณ{user?.name || "ใจดี"}</span>
          </div>
          <button 
            onClick={onLogout}
            className="bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-all cursor-pointer text-sm"
          >
            ออกจากระบบ
          </button>
        </div>
      </nav>

      {/* เนื้อหาหลัก */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        {/* สรุปภาพรวม */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-8 md:p-12 mb-12 text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">เก่งมากครับ คุณ{user?.name || "ใจดี"}!</h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-xl">
              คุณเรียนจบไปแล้ว <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-black mx-1">{completedLessons.length}</span> บทเรียน 
              จากทั้งหมด {courses.reduce((acc, c) => acc + c.lessonIds.length, 0)} บทเรียน
            </p>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide">คอร์สเรียนของคุณ</h2>
        </div>

        {/* รายการคอร์สเรียนแบบ Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {courses.map((course) => {
            const finishedInThisCourse = course.lessonIds.filter(id => completedLessons.includes(id)).length;
            const progress = Math.round((finishedInThisCourse / course.lessonIds.length) * 100);
            
            return (
              <div 
                key={course.id}
                // ถ้าเรียนจบคอร์สแล้ว คลิกที่การ์ดจะเป็นการเปิดใบประกาศแทนการเริ่มบทเรียน
                onClick={() => progress === 100 ? onShowCertificate(course) : onStartLesson(course)}
                className="group bg-white p-4 rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-100"
              >
                {/* รูปภาพคอร์ส */}
                <div className="relative overflow-hidden rounded-[30px] mb-5 aspect-[4/3] shadow-inner">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Badge แจ้งเตือนเมื่อเรียนจบ */}
                  {progress === 100 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                      สำเร็จแล้ว ✅
                    </div>
                  )}
                </div>

                {/* รายละเอียดคอร์ส */}
                <div className="px-3 pb-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {course.title}
                  </h3>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-tighter">ความก้าวหน้า</span>
                      <span className="text-blue-600 font-black">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-gray-300 font-medium mt-4">อัปเดตล่าสุด {course.updated}</p>

                  {/* ปุ่ม "รับใบประกาศ" (ถ้าเรียนจบ 100%) */}
                  {progress === 100 && (
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); // หยุดการทำงานของ onClick ของ div แม่
                        onShowCertificate(course);
                      }}
                      className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md text-sm"
                    >
                      รับใบประกาศเกียรติคุณ 🎓
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}