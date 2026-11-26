
import { useEffect, useRef, useState } from 'react'
import TimelineItem from './TimelineItem.jsx'
import './Journey.css'

// Official SheBuilds journey milestones, arranged chronologically.
const milestones = [
  {
    year: '2024',
    title: 'The Beginning',
    color: 'var(--color-yellow)',
    description:
      'Launched SheBuilds in March with our first large-scale tech meetup and women-centric fellowship hackathon, creating inclusive spaces for women in STEM.',
  },
  {
    year: '2024',
    title: 'Beyond One City',
    color: 'var(--color-accent)',
    description:
      'Launched Code & Connect 1.0 in September across six cities, bringing emerging technologies, industry mentorship, and hands-on learning closer to women builders.',
  },
  {
    year: '2025',
    title: 'Community to Ecosystem',
    color: 'var(--color-accent-alt)',
    description:
      'Evolved into an interconnected ecosystem of students, professionals, mentors, and founders, bridging skills with careers, collaboration, and entrepreneurship.',
  },
  {
    year: '2025',
    title: 'Building Beyond Skills',
    color: 'var(--color-lavender)',
    description:
      'Expanded Code & Challenge through hackathons and innovation sprints, introduced Candid Saga to amplify founder journeys, and initiated Catalyst to connect emerging women founders with mentorship, networks, and funding opportunities.',
  },
  {
    year: '2026',
    title: 'North Meets South',
    color: 'var(--color-orange)',
    description:
      'Expanded beyond Delhi with Chennai and Bengaluru chapters in January, strengthening SheBuilds’ presence across North and South India.',
  },
  {
    year: '2026',
    title: 'The Foundation Era',
    color: 'var(--color-green)',
    description:
      'Incorporated as a Section 8 nonprofit in March. Hosted founder gatherings, a women’s empowerment run, and Mompreneur conversations. Launched Shepreneur in July and grew to five chapters across Delhi, Chennai, Bengaluru, Pune, and Chandigarh by November, with 10,000+ members, 500+ projects, and ₹12L in grants.',
  },
  {
    year: '2027',
    title: 'The Global Vision',
    color: 'var(--color-coral-red)',
    description:
      'Taking SheBuilds international with a dedicated SheBuilds Impact Fund, structured fellowships, and stronger global partnerships to scale women’s leadership worldwide.',
  },
]

// Gap between milestones.
const STEP_MS = 1000
const TOTAL = milestones.length

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// `character` = optional node (illustration) for the reserved bottom-right slot.
export default function Journey({ character = null }) {
  const timelineRef = useRef(null)
  // Reduced motion starts fully revealed.
  const [revealed, setRevealed] = useState(() =>
    prefersReducedMotion() ? TOTAL : 0,
  )

  // Start once the timeline scrolls into view.
  useEffect(() => {
    if (prefersReducedMotion()) return

    const node = timelineRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRevealed(1)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -20% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Reveal one milestone at a time.
  useEffect(() => {
    if (revealed === 0 || revealed >= TOTAL) return
    const id = setTimeout(() => setRevealed((c) => c + 1), STEP_MS)
    return () => clearTimeout(id)
  }, [revealed])

  return (
    <section
      className="journey"
      aria-labelledby="journey-heading"
      style={{ '--step': `${STEP_MS}ms` }}
    >
      <h2
        id="journey-heading"
        className="about__heading journey__heading"
        data-reveal
      >
        Our Journey
      </h2>

      <div className="journey__timeline" ref={timelineRef}>
        <ol className="journey__list">
          {milestones.map((item, i) => (
            <TimelineItem
              key={`${item.year}-${i}`}
              data={item}
              isRevealed={i < revealed}
              position={i % 2 === 0 ? 'up' : 'down'}
            />
          ))}
        </ol>
      </div>

      {/* Reserved space for the character illustration */}
      <div className="journey__character">{character}</div>
    </section>
  )
}