import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(135deg, #FFE4E6 0%, #FFF7ED 50%, #FFDAB9 100%)' }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-caveat text-4xl sm:text-5xl text-burgundy mb-8 text-center"
      >
        Our Memories 💕
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
            className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
              i === currentIndex ? 'bg-rose' : 'bg-burgundy/20'
            }`}
          />
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
        One More Thing... ❤️
      </motion.button>
    </div>
  )
}
