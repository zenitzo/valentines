import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const placeholderPhotos = [
  { src: '/photos/1.jpg', caption: 'our first time going to chicago' },
  { src: '/photos/2.jpg', caption: 'best day of our lives' },
  { src: '/photos/3.jpg', caption: 'My favorite picture of us' },
  { src: '/photos/4.jpg', caption: 'Our nene loves you very much' },
  { src: '/photos/5.jpg', caption: 'Forever my favorite person' },
]

export default function PhotoSlideshow({ onContinue }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [photos] = useState(placeholderPhotos)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [photos.length])

  const goTo = (index) => setCurrentIndex(index)
  const prev = () => setCurrentIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrentIndex((i) => (i + 1) % photos.length)

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFE4E6 0%, #FFF7ED 50%, #FFDAB9 100%)' }}
    >
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} />
      ))}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-caveat text-4xl sm:text-5xl text-burgundy mb-8 text-center"
      >
        Our Memories
      </motion.h2>

      <div className="relative w-full max-w-sm aspect-[3/4] mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl bg-white/40 flex items-center justify-center">
              <img
                src={photos[currentIndex].src}
                alt={photos[currentIndex].caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `
                    <div class="flex flex-col items-center justify-center h-full text-burgundy/40 p-8">
                      <span class="text-6xl mb-4">📷</span>
                      <p class="font-inter text-center">Add your photo as<br/>${photos[currentIndex].src}</p>
                    </div>
                  `
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm shadow flex items-center justify-center text-burgundy hover:bg-white transition-colors cursor-pointer z-10"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm shadow flex items-center justify-center text-burgundy hover:bg-white transition-colors cursor-pointer z-10"
        >
          ›
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="font-caveat text-xl text-burgundy/70 mt-2 mb-4 text-center"
        >
          {photos[currentIndex].caption}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-2 mb-8">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="cursor-pointer transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-4 h-4 transition-colors ${
                i === currentIndex ? 'fill-rose' : 'fill-burgundy/20'
              }`}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="bg-rose text-white font-inter font-semibold text-base rounded-full shadow-lg cursor-pointer hover:shadow-xl hover:bg-rose/90 transition-all"
        style={{ padding: '0.85rem 2rem', marginTop: '2rem' }}
      >
        One More Thing...
      </motion.button>
    </div>
  )
}
