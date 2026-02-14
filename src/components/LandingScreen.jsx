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
  { delay: 0, left: 10, size: 1.5, duration: 8 },
  { delay: 2, left: 25, size: 1, duration: 10 },
  { delay: 4, left: 50, size: 2, duration: 7 },
  { delay: 1, left: 70, size: 1.2, duration: 9 },
  { delay: 3, left: 85, size: 1.8, duration: 11 },
  { delay: 5, left: 40, size: 1, duration: 8.5 },
  { delay: 6, left: 60, size: 1.5, duration: 9.5 },
  { delay: 1.5, left: 15, size: 1.3, duration: 10.5 },
]

export default function LandingScreen({ onStart }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFE4E6 0%, #FFF7ED 50%, #FFDAB9 100%)' }}
    >
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center z-10"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-caveat text-[2.4rem] sm:text-6xl md:text-7xl text-burgundy mb-4 leading-tight whitespace-nowrap"
        >
          Happy Valentine's Day
          <br />
          My Love
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-inter text-burgundy/70 text-sm sm:text-lg mb-10 whitespace-nowrap"
        >
          I made you a website because I'm extra like that
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          onClick={onStart}
          className="animate-gentle-pulse bg-rose text-white font-inter font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-rose/90 transition-all cursor-pointer"
        >
          Open Your Valentine 💌
        </motion.button>
      </motion.div>
    </div>
  )
}
