import { useState, useEffect } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNavV2 = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      return !status
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', offToggleNav)
  }, [])

  const offToggleNav = () => {
    setNavShow(false)
  }

  return (
    <div className="inline-block sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        onBlur={(e) => {
          setTimeout(offToggleNav, 200)
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ul
        className={`absolute z-10 w-32 origin-top-left rounded-md border-2 bg-white transition duration-100 ease-in-out dark:bg-gray-900 ${
          navShow ? 'scale-y-100' : 'hidden scale-y-0'
        }`}
      >
        {headerNavLinks.map((link) => (
          <li
            key={link.title}
            className="group rounded-md hover:bg-gray-900 dark:hover:bg-gray-300"
          >
            <Link
              href={link.href}
              className="block h-full w-full px-3 py-1 font-bold tracking-widest text-gray-900 group-hover:text-white dark:text-gray-100 dark:group-hover:text-gray-900"
              onClick={offToggleNav}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileNavV2
