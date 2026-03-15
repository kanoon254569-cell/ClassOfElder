import React from 'react';

export default function CourseList() {
  const courses = [
    { title: "ใช้สมาร์ทโฟนพื้นฐาน", icon: "📱", color: "border-blue-500" },
    { title: "ความปลอดภัยจากมิจฉาชีพ", icon: "🔐", color: "border-red-500" },
    { title: "การเงินออนไลน์", icon: "💰", color: "border-green-500" },
    { title: "สุขภาพดีวัยเกษียณ", icon: "👵", color: "border-purple-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {courses.map((course, i) => (
        <div key={i} className={`bg-white p-8 rounded-[32px] shadow-sm border-l-8 ${course.color} hover:scale-105 transition cursor-pointer`}>
          <div className="flex items-center gap-6">
            <span className="text-6xl">{course.icon}</span>
            <div>
              <h3 className="text-2xl font-bold">{course.title}</h3>
              <p className="text-gray-500">★ ★ ★ ★ ★</p>
              <button className="mt-4 bg-gray-100 px-6 py-2 rounded-full font-bold">เข้าเรียน</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}