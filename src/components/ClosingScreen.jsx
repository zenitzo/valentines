import { motion } from 'framer-motion'

function FloatingHeart({ delay, left, size, duration }) {
  return (
    <div
      className="absolute text-rose/20 animate-float-up pointer-events-none"
      style={{
        left: `${left}%`,
        bottom: '-20px',
        fontSize: `${size}rem`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      ♥
    </div>
  )
}

const hearts = [
  { delay: 0, left: 5, size: 1.5, duration: 7 },
  { delay: 1, left: 20, size: 1, duration: 9 },
  { delay: 2, left: 35, size: 2, duration: 8 },
  { delay: 3, left: 55, size: 1.2, duration: 10 },
  { delay: 4, left: 75, size: 1.8, duration: 7.5 },
  { delay: 5, left: 90, size: 1, duration: 9.5 },
  { delay: 0.5, left: 45, size: 1.5, duration: 8.5 },
  { delay: 2.5, left: 65, size: 1.3, duration: 11 },
  { delay: 1.5, left: 12, size: 1.7, duration: 10.5 },
  { delay: 3.5, left: 82, size: 1.1, duration: 8 },
]

export default function ClosingScreen({ onReplay }) {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFE4E6 0%, #FFF7ED 50%, #FFDAB9 100%)' }}
    >
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center z-10 max-w-md"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.3, stiffness: 150 }}
          className="mb-6 flex justify-center"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 100"
            className="w-32 h-16"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.path
              d="M100 50 C80 20, 30 -10, 15 30 C5 55, 40 80, 100 50 C160 80, 195 55, 185 30 C170 -10, 120 20, 100 50 Z"
              fill="none"
              stroke="#FB7185"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
            />
            <motion.path
              d="M100 50 C80 20, 30 -10, 15 30 C5 55, 40 80, 100 50 C160 80, 195 55, 185 30 C170 -10, 120 20, 100 50 Z"
              fill="#FB7185"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              transition={{ duration: 1, delay: 2.5 }}
            />
          </motion.svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-caveat text-4xl sm:text-5xl text-burgundy mb-6"
        >
          I love you more than I'm good at saying.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-inter text-burgundy/70 text-lg mb-2"
        >
          But I'm pretty good at building websites.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="font-caveat text-3xl text-rose mb-10"
        >
          Happy Valentine's Day
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="bg-rose text-white font-inter font-semibold text-base rounded-full shadow-lg cursor-pointer hover:shadow-xl hover:bg-rose/90 transition-all"
          style={{ padding: '0.85rem 2rem', marginTop: '2rem' }}
        >
          Start Over
        </motion.button>
      </motion.div>
    </div>
  )
}
