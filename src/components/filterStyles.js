// Search box and filter pill styles shared by the Events filters (home section and /events) and
// the Blogs toolbar, so both look exactly the same.

// Modern pill style: blue when active, white otherwise; subtle transitions
export const pillClass = (isActive) =>
  [
    'inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 font-body font-medium text-foreground shadow-sm',
    'transition motion-reduce:transition-none hover:shadow-md',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
    isActive ? 'bg-secondary text-white' : 'bg-white hover:bg-blue-50',
  ].join(' ')

// Clean search box with subtle border; its parent must be `relative` for the icon
export const SEARCH_INPUT_CLASS =
  'w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-4 font-body text-foreground placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'

export const SEARCH_ICON_CLASS = 'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted'
