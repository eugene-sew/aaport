"use client"

import { useEffect, useRef } from "react"

interface BlobBackgroundProps {
  className?: string
}

export default function BlobBackground({ className = "" }: BlobBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const hue = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawBlob = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.beginPath()

      const angle = (Math.PI * 2) / 6

      for (let i = 0; i < 6; i++) {
        const xPos = x + size * Math.cos(i * angle)
        const yPos = y + size * Math.sin(i * angle)

        if (i === 0) {
          ctx.moveTo(xPos, yPos)
        } else {
          const cpX1 = x + size * 1.2 * Math.cos((i - 0.5) * angle)
          const cpY1 = y + size * 1.2 * Math.sin((i - 0.5) * angle)

          ctx.quadraticCurveTo(cpX1, cpY1, xPos, yPos)
        }
      }

      const cpX = x + size * 1.2 * Math.cos(5.5 * angle)
      const cpY = y + size * 1.2 * Math.sin(5.5 * angle)

      ctx.quadraticCurveTo(cpX, cpY, x + size * Math.cos(0), y + size * Math.sin(0))

      ctx.closePath()

      // Red color with opacity
      ctx.fillStyle = `rgba(229, 62, 62, ${opacity})`
      ctx.shadowColor = "rgba(229, 62, 62, 0.3)"
      ctx.shadowBlur = 15
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      // Draw multiple blobs with different sizes and positions
      drawBlob(
        canvas.width * 0.2 + Math.sin(time * 0.7) * 50,
        canvas.height * 0.3 + Math.cos(time * 0.5) * 50,
        canvas.width * 0.15,
        0.1,
      )

      drawBlob(
        canvas.width * 0.7 + Math.sin(time * 0.6) * 40,
        canvas.height * 0.6 + Math.cos(time * 0.8) * 40,
        canvas.width * 0.12,
        0.08,
      )

      drawBlob(
        canvas.width * 0.5 + Math.sin(time * 0.5) * 60,
        canvas.height * 0.2 + Math.cos(time * 0.7) * 60,
        canvas.width * 0.1,
        0.06,
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 h-full w-full opacity-30 ${className}`} />
}
