import React, { useEffect, useRef } from 'react'
import './Background.css'

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    let particles = []
    const particleCount = 60
    const connectionDistance = 150
    const mouse = { x: null, y: null, radius: 150 }

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 1
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        // Move
        p.x += p.vx
        p.y += p.vy
        
        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.fill()
        
        // Draw lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(150, 150, 150, ${1 - dist / connectionDistance})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      init()
    }

    window.addEventListener('resize', handleResize)
    init()
    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="neural-bg" />
}
