import confetti from 'canvas-confetti'

export const burstConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.7 },
    colors: ['#FB7185', '#FFE4E6', '#F9A8D4'],
  })
}

export const bigConfetti = () => {
  const duration = 2000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FB7185', '#FFE4E6', '#F9A8D4'],
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FB7185', '#FFE4E6', '#F9A8D4'],
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
