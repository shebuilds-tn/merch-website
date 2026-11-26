
import { SOCIAL_LINKS } from '../data/socialLinks.js'

const iconProps = {
  'aria-hidden': true,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-5 w-5',
}

// Social media icons, keyed by SOCIAL_LINKS id
const SOCIAL_ICONS = {
  instagram: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),

  linkedin: (
    <svg {...iconProps}>
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
      <path d="M10 21v-7a6 6 0 0 1 12 0v7h-4v-7a2 2 0 0 0-4 0v7Z" />
    </svg>
  ),

  youtube: (
    <svg {...iconProps}>
      <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12Z" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  ),

  whatsapp: (
    <svg {...iconProps}>
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20l.9-4.7a8.5 8.5 0 1 1 16.6-3.6Z" />
      <path d="M8.5 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .3.1.4.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.3 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .3-.2 1.1-.7 1.5-.5.5-1.1.7-1.8.6-1-.1-2.4-.8-3.7-2-1.2-1.1-2.1-2.5-2.3-3.5-.2-1 .3-1.9.9-2.3Z" />
    </svg>
  ),

  mail: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
}

// 44px round button styling
const linkBaseClass = [
  'grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-surface text-ink shadow-brutal-sm',
  'transition hover:bg-accent-alt/20',
  'active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
  'motion-reduce:transition-none',
].join(' ')

// Footer hover effect
const LIFT_CLASS =
  'hover:-translate-x-px hover:-translate-y-px motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0'

/**
 * Social icon links
 * className: classes for the outer element
 * nav: true for hero navigation
 * lift: true for footer hover effect
 */
export default function SocialLinks({
  className = '',
  nav = false,
  lift = false,
}) {
  const linkClass = lift
    ? `${linkBaseClass} ${LIFT_CLASS}`
    : linkBaseClass

  const items = SOCIAL_LINKS.map(({ id, label, href }) => {
    // Mail opens the email application
    const isMail = href.startsWith('mailto:')

    return (
      <li key={id}>
        <a
          href={href}
          {...(isMail
            ? {}
            : { target: '_blank', rel: 'noopener noreferrer' })}
          aria-label={
            isMail
              ? `${label} SheBuilds`
              : `SheBuilds on ${label} (opens in a new tab)`
          }
          className={linkClass}
        >
          {SOCIAL_ICONS[id]}
        </a>
      </li>
    )
  })

  if (!nav) {
    return (
      <ul
        className={`flex flex-wrap gap-3 ${className}`.trim()}
        aria-label="SheBuilds on social media"
      >
        {items}
      </ul>
    )
  }

  return (
    <nav aria-label="Social media" className={className || undefined}>
      <ul className="flex flex-wrap items-center gap-3">
        {items}
      </ul>
    </nav>
  )
}
