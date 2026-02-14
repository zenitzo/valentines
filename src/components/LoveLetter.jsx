import { motion } from 'framer-motion'
import { letterLines } from '../data/letterLines'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 1.2,
    },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function LoveLetter({ onContinue }) {
  const totalDelay = letterLines.length * 1.2 + 0.5

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-16"
      style={{ background: 'linear-gradient(135deg, #FFE4E6 0%, #FFF7ED 50%, #FFDAB9 100%)' }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-sm w-full space-y-4 px-2"
      >
        {letterLines.map((line, i) => (
          <motion.p
            key={i}
            variants={lineVariants}
            className="font-caveat text-2xl sm:text-3xl text-burgundy text-center leading-relaxed"
          >
            {line}
          </motion.p>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: totalDelay }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="bg-rose text-white font-inter font-semibold text-base rounded-full shadow-lg cursor-pointer hover:shadow-xl hover:bg-rose/90 transition-all"
        style={{ padding: '0.85rem 2rem', marginTop: '5rem' }}
      >
        <span className="inline-flex items-center gap-2">See Our Memories
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg></span>
      </motion.button>
    </div>
  )
}
