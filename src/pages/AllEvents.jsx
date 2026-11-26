
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import EventsTimeline from '../sections/events/EventsTimeline.jsx'
import { EventFilters, EventsEmpty } from '../sections/events/EventFilters.jsx'
import { filtersFromSearch, filtersToSearch, useEventFilters } from '../sections/events/useEventFilters.js'
import { getEvents } from '../sections/events/loadEvents.js'
import { resultsAnnouncement, splitTimeline, yearId } from '../sections/events/eventTimeline.js'
import { prefersReducedMotion } from '../siteSections.js'
import usePageTitle from '../components/usePageTitle.js'

export default function AllEvents() {
  const now = useMemo(() => new Date(), [])
  const events = useMemo(() => getEvents(now), [now])

  const { search } = useLocation()
  const [initialFilters] = useState(() => filtersFromSearch(search))
  const filters = useEventFilters(events, initialFilters)
  const { filtered, selection, selectedTags } = filters

  const [eventView, setEventView] = useState('regular')

  // Regular events include community events. Collaborated events appear in their own tab.
  // Events carrying both tags appear in both tabs.
  const visibleEvents = useMemo(
    () =>
      filtered.filter((event) =>
        eventView === 'collaborated'
          ? event.tags.includes('collaborated')
          : event.tags.includes('community')
      ),
    [filtered, eventView]
  )

  const { upcoming, past } = useMemo(
    () => splitTimeline(visibleEvents, now),
    [visibleEvents, now]
  )

  const pageRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'auto' })
  }, [])

  usePageTitle('All events')

  useEffect(() => {
    const next = filtersToSearch({ selection, selectedTags })
    if (next === window.location.search) return
    history.replaceState(history.state, '', `${window.location.pathname}${next}${window.location.hash}`)
  }, [selection, selectedTags])

  useLayoutEffect(() => {
    const bar = barRef.current
    const page = pageRef.current
    const publish = () => page.style.setProperty('--events-bar-h', `${bar.offsetHeight}px`)
    publish()
    const observer = new ResizeObserver(publish)
    observer.observe(bar)
    return () => observer.disconnect()
  }, [])

  const jumpTo = (e, year) => {
    const el = document.getElementById(yearId(year))
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
    history.replaceState(history.state, '', `#${yearId(year)}`)
  }

  return (
    <section ref={pageRef} aria-labelledby="all-events-heading" className="events-page px-6 pt-8 pb-24 md:px-12 max-sm:px-4">
      <Link
        to={{ pathname: '/', hash: '#events' }}
        className="inline-flex min-h-10 items-center gap-1.5 rounded-sm font-body font-bold text-ink no-underline underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span aria-hidden="true">←</span> Back to events
      </Link>

      <h1 id="all-events-heading" className="about__heading">
        All events
      </h1>

      <p aria-live="polite" className="sr-only">
        {resultsAnnouncement(visibleEvents.length)}
      </p>

      <div ref={barRef} className="events-page__bar">
        <div className="mb-4 flex flex-wrap gap-3" role="group" aria-label="Choose event category">
          <button
            type="button"
            aria-pressed={eventView === 'regular'}
            onClick={() => setEventView('regular')}
            className={`rounded-full border-2 border-ink px-5 py-2 font-body font-bold transition-colors ${
              eventView === 'regular'
                ? 'bg-ink text-white'
                : 'bg-surface text-ink hover:bg-ink/10'
            }`}
          >
            Regular Events
          </button>

          <button
            type="button"
            aria-pressed={eventView === 'collaborated'}
            onClick={() => setEventView('collaborated')}
            className={`rounded-full border-2 border-ink px-5 py-2 font-body font-bold transition-colors ${
              eventView === 'collaborated'
                ? 'bg-ink text-white'
                : 'bg-surface text-ink hover:bg-ink/10'
            }`}
          >
            Collaborated
          </button>
        </div>

        <EventFilters {...filters} hideCollaborated />

        {past.length > 0 && (
          <nav aria-label="Jump to year" className="events-page__years">
            {past.map(({ year }) => (
              <a
                key={year}
                href={`#${yearId(year)}`}
                onClick={(e) => jumpTo(e, year)}
                className="events-page__year"
              >
                {year}
              </a>
            ))}
          </nav>
        )}
      </div>

      {visibleEvents.length > 0 ? (
        <EventsTimeline upcoming={upcoming} past={past} />
      ) : (
        <EventsEmpty totalCount={events.length} {...filters} />
      )}
    </section>
  )
}
