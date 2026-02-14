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
          className="font-inter text-burgundy/80 text-lg max-w-sm mx-auto"
          style={{ marginBottom: '4.5rem' }}
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
          className="animate-gentle-pulse bg-rose text-white font-inter font-semibold text-base rounded-full shadow-lg hover:shadow-xl hover:bg-rose/90 transition-all cursor-pointer"
          style={{ padding: '0.85rem 2rem' }}
        >
          <span className="inline-flex items-center gap-2">A Letter For You
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="6" width="20" height="14" rx="2" /><path d="m2 6 10 7 10-7" /><path d="M12 6c-1-2-4-3.5-5-1.5S9 8 12 11c3-3 6.5-4.5 5-6.5S13 4 12 6z" fill="currentColor" stroke="none" /></svg></span>
        </motion.button>
      </motion.div>
    </div>
  )
}
