
import { useEffect, useRef, useState } from 'react'
import './Stats.css'

// Official SheBuilds impact statistics.
const STATS = [
  { value: 10000, suffix: '+', label: 'Community Members', tone: 'coral' },
  { value: 5, suffix: '', label: 'Regional Chapters', tone: 'teal' },
  { value: 50000, suffix: '+', label: 'Challenge Participations', tone: 'yellow' },
  { value: 45, suffix: '+', label: 'In-Person Meetups', tone: 'coral' },
  { value: 500, suffix: '+', label: 'Projects Built', tone: 'teal' },
  { value: 12, prefix: '₹', suffix: 'L', label: 'Grant Support', tone: 'yellow' },
]

const DURATION_MS = 1200
const format = (n) => n.toLocaleString('en-IN')
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export default function Stats() {
  const ref = useRef(null)
  // null = not animating yet, so the final values render; 0..1 while counting up.
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / DURATION_MS, 1)
          setProgress(t < 1 ? easeOutCubic(t) : null)
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="stats" role="group" aria-label="SheBuilds in numbers" ref={ref}>
      <h3 className="sr-only">SheBuilds in numbers</h3>
      <ul className="stats__list">
        {STATS.map((s) => {
          const shown = progress === null ? s.value : Math.round(s.value * progress)

          return (
            <li key={s.label} className={`stats__block stats__block--${s.tone}`}>
              <span className="stats__number" aria-hidden="true">
                {s.prefix ?? ''}{format(shown)}{s.suffix}
              </span>
              <span className="sr-only">
                {s.prefix ?? ''}{format(s.value)}{s.suffix} {s.label}
              </span>
              <span className="stats__meta" aria-hidden="true">
                <span className="stats__label">{s.label}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}