import { useState } from 'react'
import { motion } from 'framer-motion'
import { burstConfetti } from '../utils/confetti'

export default function QuizQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const handleSelect = (index) => {
    if (revealed) return
    setSelected(index)
    setRevealed(true)

    const isCorrect = index === question.correctIndex
    if (isCorrect) burstConfetti()
    onAnswer(isCorrect)
  }

  const isCorrect = selected === question.correctIndex

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
      <h3 className="font-caveat text-2xl sm:text-3xl text-burgundy mb-6 text-center">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          let bgClass = 'bg-white hover:bg-blush/50'
          if (revealed) {
            if (i === question.correctIndex) {
              bgClass = 'bg-green-100 border-green-400'
            } else if (i === selected && !isCorrect) {
              bgClass = 'bg-red-100 border-red-400'
            } else {
              bgClass = 'bg-white/50 opacity-50'
            }
          }

          return (
            <motion.button
              key={i}
              whileHover={!revealed ? { scale: 1.02 } : {}}
              whileTap={!revealed ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`w-full text-left px-5 py-4 rounded-2xl border-2 border-transparent font-inter text-burgundy transition-all cursor-pointer ${bgClass}`}
            >
              {option}
            </motion.button>
          )
        })}
      </div>

      {revealed && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 text-center font-inter text-sm ${
            isCorrect ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {isCorrect ? question.correctResponse : question.wrongResponse}
        </motion.p>
      )}
    </div>
  )
}
