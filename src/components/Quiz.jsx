import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions } from '../data/quizQuestions'
import QuizQuestion from './QuizQuestion'

export default function Quiz({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(-1) // -1 = title card
  const [score, setScore] = useState(0)

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((s) => s + 1)

    setTimeout(() => {
      if (currentIndex + 1 >= quizQuestions.length) {
        onComplete(score + (isCorrect ? 1 : 0))
      } else {
        setCurrentIndex((i) => i + 1)
      }
    }, 2000)
  }

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(135deg, #FFE4E6 0%, #FFF7ED 50%, #FFDAB9 100%)' }}
    >
      <AnimatePresence mode="wait">
        {currentIndex === -1 ? (
          <motion.div
            key="title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-caveat text-4xl sm:text-5xl text-burgundy mb-4">
              Pop Quiz Time! 📝
            </h2>
            <p className="font-inter text-burgundy/70 text-lg mb-8 max-w-sm mx-auto">
              How well do you actually know us?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(0)}
              className="bg-rose text-white font-inter font-semibold text-lg px-8 py-4 rounded-full shadow-lg cursor-pointer"
            >
              Let's Go! 🎯
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="flex justify-center gap-2 mb-2">
                {quizQuestions.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === currentIndex
                        ? 'bg-rose'
                        : i < currentIndex
                        ? 'bg-rose/40'
                        : 'bg-burgundy/20'
                    }`}
                  />
                ))}
              </div>
              <p className="font-inter text-burgundy/50 text-sm">
                {currentIndex + 1} of {quizQuestions.length}
              </p>
            </div>
            <QuizQuestion
              question={quizQuestions[currentIndex]}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
