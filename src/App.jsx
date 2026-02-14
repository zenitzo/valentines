import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingScreen from './components/LandingScreen'
import Quiz from './components/Quiz'
import QuizResult from './components/QuizResult'
import LoveLetter from './components/LoveLetter'
import PhotoSlideshow from './components/PhotoSlideshow'
import ClosingScreen from './components/ClosingScreen'
import MusicToggle from './components/MusicToggle'

const screens = ['landing', 'quiz', 'quizResult', 'letter', 'photos', 'closing']

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
}

const pageTransition = {
  duration: 0.5,
  ease: 'easeInOut',
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing')
  const [quizScore, setQuizScore] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const audioRef = useRef(null)

  const startMusic = useCallback(() => {
    if (musicStarted) return
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.3
      audio.loop = true
      audio.currentTime = 5
      audio.play().catch(() => {})
      setMusicStarted(true)
    }
  }, [musicStarted])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.muted = !audio.muted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  const goTo = (screen) => setCurrentScreen(screen)

  const handleQuizComplete = (score) => {
    setQuizScore(score)
    goTo('quizResult')
  }

  const handleStart = () => {
    startMusic()
    goTo('quiz')
  }

  return (
    <div className="min-h-dvh bg-cream relative overflow-hidden">
      <audio ref={audioRef} src="/music/song.mp3" preload="auto" />

      {musicStarted && <MusicToggle isMuted={isMuted} onToggle={toggleMute} />}

      <AnimatePresence mode="wait">
        {currentScreen === 'landing' && (
          <motion.div
            key="landing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LandingScreen onStart={handleStart} />
          </motion.div>
        )}

        {currentScreen === 'quiz' && (
          <motion.div
            key="quiz"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Quiz onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {currentScreen === 'quizResult' && (
          <motion.div
            key="quizResult"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <QuizResult score={quizScore} onContinue={() => goTo('letter')} />
          </motion.div>
        )}

        {currentScreen === 'letter' && (
          <motion.div
            key="letter"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <LoveLetter onContinue={() => goTo('photos')} />
          </motion.div>
        )}

        {currentScreen === 'photos' && (
          <motion.div
            key="photos"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <PhotoSlideshow onContinue={() => goTo('closing')} />
          </motion.div>
        )}

        {currentScreen === 'closing' && (
          <motion.div
            key="closing"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <ClosingScreen onReplay={() => {
              setQuizScore(0)
              goTo('landing')
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
