import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Lesson from './components/Lesson';
import VideoPlayer from './components/VideoPlayer';
import Quiz from './components/Quiz'; 
import Certificate from './components/Certificate'; // <--- เพิ่ม import Certificate
import './index.css'; 

export default function App() {
  const [screen, setScreen] = useState('login'); 
  const [user, setUser] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  
  // --- สถานะใหม่สำหรับ Certificate ---
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateCourse, setCertificateCourse] = useState(null); // เก็บข้อมูลคอร์สที่จะแสดงในใบประกาศ

  const [completedLessons, setCompletedLessons] = useState(() => {
    const savedProgress = localStorage.getItem('senior_progress');
    return savedProgress ? JSON.parse(savedProgress) : [];
  });

  useEffect(() => {
    localStorage.setItem('senior_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const handleLogin = (userData) => {
    setUser(userData);
    setScreen('dashboard');
  };

  const handleStartLesson = (course) => {
    setActiveCourse(course);
    setScreen('lesson');
    window.scrollTo(0, 0);
  };

  const handleSelectVideo = (lesson) => {
    setActiveLesson(lesson);
    setScreen('video');
    window.scrollTo(0, 0);
  };

  const handleStartQuiz = () => {
    setScreen('quiz');
    window.scrollTo(0, 0);
  };

  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
    setScreen('lesson');
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    if (window.confirm("คุณลุงคุณป้าต้องการออกจากระบบใช่ไหมครับ?")) {
      setUser(null);
      setActiveCourse(null);
      setShowCertificate(false); // ปิดใบประกาศถ้ามีอยู่
      setCertificateCourse(null);
      setScreen('login');
    }
  };

  // --- ฟังก์ชันใหม่สำหรับเปิดใบประกาศ ---
  const handleShowCertificate = (course) => {
    setCertificateCourse(course);
    setShowCertificate(true);
  };

  // --- ฟังก์ชันใหม่สำหรับปิดใบประกาศ ---
  const handleCloseCertificate = () => {
    setShowCertificate(false);
    setCertificateCourse(null);
  };


  return (
    <div className="min-h-screen bg-gray-50 font-kanit">
      
      {screen === 'login' && (
        <Login onLogin={handleLogin} goReg={() => setScreen('register')} />
      )}

      {screen === 'register' && (
        <Register goLogin={() => setScreen('login')} />
      )}

      {screen === 'dashboard' && (
        <Dashboard 
          user={user} 
          onStartLesson={handleStartLesson} 
          onLogout={handleLogout} 
          completedLessons={completedLessons}
          onShowCertificate={handleShowCertificate} // <-- ส่งฟังก์ชันเปิดใบประกาศไปให้ Dashboard
        />
      )}

      {screen === 'lesson' && activeCourse && (
        <Lesson 
          course={activeCourse} 
          onBack={() => setScreen('dashboard')} 
          onSelectLesson={handleSelectVideo}
          completedLessons={completedLessons}
        />
      )}

      {screen === 'video' && activeLesson && (
        <VideoPlayer 
          lesson={activeLesson} 
          onBack={() => setScreen('lesson')} 
          onStartQuiz={handleStartQuiz} 
        />
      )}

      {screen === 'quiz' && activeLesson && (
        <Quiz 
          onBack={() => setScreen('video')} 
          onFinish={() => handleCompleteLesson(activeLesson.id)}
          lessonQuestions={activeLesson.quizData} 
        />
      )}

      {/* --- ส่วนแสดง Certificate (ถ้า showCertificate เป็น true) --- */}
      {showCertificate && certificateCourse && (
        <Certificate 
          userName={user?.name || 'ผู้เรียน'} 
          courseTitle={certificateCourse.title} 
          onClose={handleCloseCertificate} 
        />
      )}

    </div>
  );
}