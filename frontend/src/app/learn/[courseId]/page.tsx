'use client';

// File Learn.tsx - Trang học tập với video player và tracking tiến độ
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Circle, Clock, ArrowLeft, Menu, X, GraduationCap, FileQuestion } from 'lucide-react';
import { showToast } from '@/context/useUIStore';
import VideoPlayer from '@/components/ui/VideoPlayer';
import Quiz from '@/components/ui/Quiz';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz';
}

const MOCK_LESSONS: Lesson[] = [
  { id: '1', title: 'Giới thiệu khóa học', duration: '5:30', type: 'video' },
  { id: '2', title: 'Cài đặt môi trường', duration: '12:45', type: 'video' },
  { id: '3', title: 'Cấu trúc dự án', duration: '18:20', type: 'video' },
  { id: '4', title: 'Component cơ bản', duration: '25:10', type: 'video' },
  { id: '5', title: 'State và Props', duration: '22:15', type: 'video' },
  { id: 'quiz', title: 'Bài kiểm tra cuối khóa', duration: '3 câu', type: 'quiz' },
];

const PURCHASED_KEY = 'purchasedCourses';

export default function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [activeLesson, setActiveLesson] = useState<Lesson>(MOCK_LESSONS[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  // Lấy danh sách khóa học đã mua
  useEffect(() => {
    const purchased = localStorage.getItem(PURCHASED_KEY);
    if (!purchased) {
      router.push('/');
      return;
    }

    const purchasedList = JSON.parse(purchased);
    if (!purchasedList.includes(courseId)) {
      router.push('/');
      return;
    }
    setIsLoading(false);
  }, [courseId, router]);

  // Lấy tiến độ học tập từ localStorage
  useEffect(() => {
    if (!courseId) return;

    const storageKey = `progress_${courseId}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const progress = JSON.parse(stored);
        setCompletedLessons(progress);
      } catch {
        setCompletedLessons([]);
      }
    }
  }, [courseId]);

  // Lưu tiến độ vào localStorage
  const saveProgress = (completed: string[]) => {
    if (!courseId) return;
    const storageKey = `progress_${courseId}`;
    localStorage.setItem(storageKey, JSON.stringify(completed));
  };

  // Đánh dấu hoàn thành bài học
  const markLessonComplete = () => {
    if (!completedLessons.includes(activeLesson.id)) {
      const newCompleted = [...completedLessons, activeLesson.id];
      setCompletedLessons(newCompleted);
      saveProgress(newCompleted);
      showToast('Đánh dấu hoàn thành!', 'success');
    } else {
      showToast('Bài học này đã hoàn thành!', 'error');
    }
  };

  // Tính tiến độ hoàn thành
  const progressPercent = Math.round((completedLessons.length / MOCK_LESSONS.length) * 100);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-white">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      {/* Header cho mobile */}
      <header className="md:hidden bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <Link href="/my-courses" className="flex items-center gap-2 text-white">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại</span>
        </Link>
        <span className="text-white font-medium truncate">{activeLesson.title}</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-white"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Main Content - Video Player or Quiz */}
      <main className="flex-1 flex flex-col">
        {showQuiz ? (
          <Quiz onBack={() => setShowQuiz(false)} />
        ) : (
          <>
            <VideoPlayer onEnded={markLessonComplete} />
            {/* Lesson Info */}
            <div className="p-6 bg-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white">{activeLesson.title}</h1>
                  <p className="text-gray-400 mt-1">
                    Bài học {MOCK_LESSONS.findIndex((l) => l.id === activeLesson.id) + 1} / {MOCK_LESSONS.length - 1}
                  </p>
                </div>
                <button
                  onClick={markLessonComplete}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Đánh dấu hoàn thành
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Tiến độ hoàn thành</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Sidebar - Course Curriculum */}
      <aside
        className={`
          fixed md:sticky top-0 right-0 h-screen w-80 bg-gray-800 border-l border-gray-700 
          transform transition-transform duration-300 z-50 overflow-y-auto
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          md:relative md:transform-none
        `}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-white font-semibold">Nội dung khóa học</h2>
              <p className="text-gray-400 text-sm">
                {completedLessons.length}/{MOCK_LESSONS.length} bài đã hoàn thành
              </p>
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <div className="p-2">
          {MOCK_LESSONS.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isActive = activeLesson.id === lesson.id;

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  setActiveLesson(lesson);
                  setIsSidebarOpen(false);
                  if (lesson.type === 'quiz') {
                    setShowQuiz(true);
                  }
                }}
                className={`
                  w-full p-3 rounded-lg mb-1 flex items-start gap-3 text-left transition-colors
                  ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}
                `}
              >
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {lesson.type === 'quiz' ? (
                    <FileQuestion className="w-5 h-5 text-yellow-400" />
                  ) : isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`
                      text-sm font-medium truncate
                      ${isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-300'}
                    `}
                  >
                    {lesson.type === 'quiz' ? lesson.title : `${index + 1}. ${lesson.title}`}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 mt-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{lesson.duration}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Back button for mobile */}
        <div className="md:hidden p-4 border-t border-gray-700">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-full py-2 text-gray-400 text-sm"
          >
            Đóng menu
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
