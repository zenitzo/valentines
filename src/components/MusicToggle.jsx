import { motion } from 'framer-motion'

export default function MusicToggle({ isMuted, onToggle }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-lg hover:scale-110 transition-transform cursor-pointer"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? '🔇' : '🎵'}
    </motion.button>
  )
}
