// Component Quiz - Bài kiểm tra trắc nghiệm
import { useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowLeft } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  onComplete?: (score: number, total: number) => void;
  onBack?: () => void;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: '1',
    question: 'React là gì?',
    options: [
      'Một ngôn ngữ lập trình',
      'Một thư viện JavaScript để xây dựng giao diện người dùng',
      'Một loại cơ sở dữ liệu',
      'Một hệ điều hành',
    ],
    correctAnswer: 1,
  },
  {
    id: '2',
    question: 'Hook nào được sử dụng để quản lý state trong React?',
    options: ['useEffect', 'useState', 'useContext', 'useRef'],
    correctAnswer: 1,
  },
  {
    id: '3',
    question: 'JSX trong React là viết tắt của cụm từ nào?',
    options: [
      'JavaScript XML',
      'Java Syntax Extension',
      'JavaScript Extension',
      'Java XML',
    ],
    correctAnswer: 0,
  },
];

export default function Quiz({ onComplete, onBack }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const question = QUIZ_QUESTIONS[currentQuestion];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const hasAnswered = answeredQuestions.includes(currentQuestion);

  // Xử lý chọn đáp án
  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
  };

  // Xử lý chuyển câu hỏi tiếp theo
  const handleNextQuestion = () => {
    // Kiểm tra đáp án đúng
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);

    if (isLastQuestion) {
      // Tính điểm cuối cùng
      const finalScore = selectedAnswer === question.correctAnswer ? score + 1 : score;
      setShowResult(true);
      onComplete?.(finalScore, totalQuestions);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  // Xử lý làm lại bài
  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  // Kiểm tra đạt qua
  const passed = score >= 2;

  // Màn hình kết quả
  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          {/* Award Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
            {passed ? (
              <Award className="w-20 h-20 text-yellow-400" />
            ) : (
              <XCircle className="w-20 h-20 text-red-400" />
            )}
          </div>

          {/* Score */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Điểm số: {score}/{totalQuestions}
          </h2>
          <p className="text-gray-400 mb-6">
            {passed
              ? 'Chúc mừng bạn đã vượt qua bài kiểm tra!'
              : 'Bạn chưa đạt yêu cầu. Hãy thử lại nhé!'}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Làm lại bài kiểm tra
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="w-full py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Quay lại bài học
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Màn hình câu hỏi
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>
        <div className="text-gray-400">
          Câu {currentQuestion + 1} / {totalQuestions}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-700 rounded-full mb-8">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">{question.question}</h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer && hasAnswered;
            const isWrong = isSelected && hasAnswered && index !== question.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={hasAnswered}
                className={`
                  w-full p-4 rounded-lg text-left flex items-center gap-3 transition-colors
                  ${isSelected && !hasAnswered ? 'border-2 border-blue-500 bg-blue-500/10' : 'border-2 border-gray-700 hover:border-gray-600'}
                  ${hasAnswered && isCorrect ? 'border-green-500 bg-green-500/10' : ''}
                  ${hasAnswered && isWrong ? 'border-red-500 bg-red-500/10' : ''}
                  disabled:cursor-not-allowed
                `}
              >
                {/* Option badge */}
                <span
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0
                    ${isSelected && !hasAnswered ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}
                    ${hasAnswered && isCorrect ? 'bg-green-500 text-white' : ''}
                    ${hasAnswered && isWrong ? 'bg-red-500 text-white' : ''}
                  `}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-200">{option}</span>
                {hasAnswered && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                )}
                {hasAnswered && isWrong && (
                  <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNextQuestion}
        disabled={selectedAnswer === null}
        className={`
          w-full mt-6 py-3 rounded-lg font-medium transition-colors
          ${selectedAnswer !== null ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
        `}
      >
        {isLastQuestion ? 'Nộp bài' : 'Câu tiếp theo'}
      </button>
    </div>
  );
}