import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { quizQuestions } from '../data/quizQuestions'
import { bigConfetti } from '../utils/confetti'

function getResultMessage(score, total) {
  const pct = score / total
  if (pct === 1) return { emoji: '😍', message: "Okay you're literally my soulmate. Wedding's still on." }
  if (pct >= 0.7) return { emoji: '😏', message: "Not bad, I guess I'll still marry you." }
  if (pct >= 0.4) return { emoji: '🤔', message: "Hmm... we might need couples therapy. JK. Mostly." }
  return { emoji: '😅', message: "Who even are you?? ...jk come here, I love you anyway." }
}

export default function QuizResult({ score, onContinue }) {
  const total = quizQuestions.length
  const { emoji, message } = getResultMessage(score, total)
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (score === total) bigConfetti()

    let current = 0
    const interval = setInterval(() => {
      current += 1
      setDisplayScore(current)
      if (current >= score) clearInterval(interval)
    }, 200)
    return () => clearInterval(interval)
  }, [score, total])

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #FFE4E6 0%, #FFF7ED 50%, #FFDAB9 100%)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
          className="text-7xl mb-4"
        >
          {emoji}
        </motion.div>

        <h2 className="font-caveat text-4xl sm:text-5xl text-burgundy mb-2">
          Your Score
        </h2>

        <motion.p
          className="font-caveat text-6xl sm:text-7xl text-rose mb-4"
        >
          {displayScore} / {total}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="font-inter text-burgundy/80 text-lg max-w-sm mx-auto mb-10"
        >
          {message}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="bg-rose text-white font-inter font-semibold text-lg px-8 py-4 rounded-full shadow-lg cursor-pointer"
        >
          I Wrote You Something ✉️
        </motion.button>
      </motion.div>
    </div>
  )
}
