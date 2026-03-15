import React, { useState } from 'react';

// 1. รับ lessonQuestions เข้ามาใน Props
export default function Quiz({ onBack, onFinish, lessonQuestions }) {
  const [currentStep, setCurrentStep] = useState(0); 
  const [score, setScore] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);

  // 2. ใช้คำถามที่ส่งมาจากบทเรียนจริง ถ้าไม่มีให้แสดงคำถามว่าง (ป้องกัน Error)
  const questions = lessonQuestions && lessonQuestions.length > 0 
    ? lessonQuestions 
    : [
        {
          q: "กำลังโหลดคำถาม...",
          options: ["รอสักครู่"],
          ans: 0
        }
      ];

  const handleAnswer = (index) => {
    if (index === questions[questionIdx].ans) {
      setScore(score + 1);
    }

    if (questionIdx + 1 < questions.length) {
      setQuestionIdx(questionIdx + 1);
    } else {
      setCurrentStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 font-kanit p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* เอฟเฟกต์พลุเมื่อได้คะแนนเต็ม */}
      {currentStep === 2 && score === questions.length && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-ping absolute top-10 left-1/4 text-4xl">✨</div>
          <div className="animate-bounce absolute top-20 right-1/4 text-4xl">🎉</div>
          <div className="animate-pulse absolute bottom-20 left-1/3 text-4xl">🎊</div>
          <div className="animate-ping absolute top-1/2 right-10 text-4xl">✨</div>
        </div>
      )}

      <div className="max-w-2xl w-full bg-white rounded-[40px] shadow-xl p-8 md:p-12 text-center z-10 relative">
        
        {/* 1. หน้าเริ่มสอบ */}
        {currentStep === 0 && (
          <div>
            <div className="text-6xl mb-6">📝</div>
            <h1 className="text-3xl font-black text-purple-900 mb-4">แบบทดสอบความรู้</h1>
            <p className="text-xl text-gray-600 mb-8">มาลองทดสอบความรู้ที่คุณลุงคุณป้าเรียนมากันครับ!</p>
            <button 
              onClick={() => setCurrentStep(1)}
              className="w-full bg-purple-600 text-white py-5 rounded-2xl text-2xl font-bold shadow-lg hover:bg-purple-700 transition-all active:scale-95"
            >
              เริ่มทำแบบทดสอบ
            </button>
            <button onClick={onBack} className="mt-4 text-gray-400 font-bold hover:text-purple-500 transition-colors">กลับไปหน้าเดิม</button>
          </div>
        )}

        {/* 2. หน้าคำถาม (ปรับให้ดึงจาก questions ที่รับมา) */}
        {currentStep === 1 && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-purple-600 font-bold text-xl">ข้อที่ {questionIdx + 1}/{questions.length}</span>
              <div className="w-2/3 bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-500 h-full transition-all duration-500" 
                  style={{ width: `${((questionIdx + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 leading-relaxed text-left">
              {questions[questionIdx].q}
            </h2>
            <div className="space-y-4">
              {questions[questionIdx].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full p-5 text-xl border-2 border-purple-100 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left font-bold text-gray-700 active:bg-purple-100"
                >
                  <span className="inline-block w-8 h-8 bg-purple-100 text-purple-600 rounded-lg text-center mr-3 font-bold leading-7">{i + 1}</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. หน้าสรุปผล */}
        {currentStep === 2 && (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="text-7xl mb-6 drop-shadow-lg">
              {score === questions.length ? "🏆" : "👏"}
            </div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              {score === questions.length ? "สุดยอดไปเลยครับ!" : "เก่งมากครับ!"}
            </h1>
            <p className="text-2xl text-purple-600 font-bold mb-6">คุณได้คะแนน {score} เต็ม {questions.length}</p>
            
            <div className={`p-6 rounded-3xl border-2 mb-8 ${score === questions.length ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'}`}>
              <p className={`text-lg leading-relaxed font-medium ${score === questions.length ? 'text-green-800' : 'text-yellow-800'}`}>
                {score === questions.length 
                  ? "คุณลุงคุณป้าทำคะแนนได้เต็ม! ท่านพร้อมสู้กับมิจฉาชีพและใช้เทคโนโลยีได้อย่างปลอดภัยแล้วครับ" 
                  : "เกือบเต็มแล้วครับ! อีกนิดเดียวเท่านั้น ลองกลับไปทบทวนวิดีโออีกนิด รับรองรอบหน้าเต็มแน่นอนครับ"}
              </p>
            </div>

            <button 
              onClick={onFinish}
              className="w-full bg-green-500 text-white py-5 rounded-2xl text-2xl font-bold shadow-lg hover:bg-green-600 transition-all active:scale-95"
            >
              กลับสู่หน้ารายการบทเรียน
            </button>
          </div>
        )}

      </div>
    </div>
  );
}