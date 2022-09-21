import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4"
      onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="text-gray-900 dark:text-gray-100"
      >
        {mounted && theme === 'dark' ? (
          <path
            fillRule="evenodd"
            d="
            M 7.370 0.911
            A 8.000 8.000 0 1 1 1.713 14.567
            A 10.000 10.000 0 0 0 7.370 0.911z
            "
            clipRule="evenodd"
          />
        ) : mounted && theme === 'light' ? (
          <path
            d="
            M 10 6 a 4 4 0 0 0 0 8 a 4 4 0 0 0 0 -8
            M 9.500 0.000 L 10.500 0.000 L 10.500 4.000 L 9.500 4.000 z
            M 16.718 2.575 L 17.425 3.282 L 14.596 6.111 L 13.889 5.404 z
            M 20.000 9.500 L 20.000 10.500 L 16.000 10.500 L 16.000 9.500 z
            M 17.425 16.718 L 16.718 17.425 L 13.889 14.596 L 14.596 13.889 z
            M 10.500 20.000 L 9.500 20.000 L 9.500 16.000 L 10.500 16.000 z
            M 3.282 17.425 L 2.575 16.718 L 5.404 13.889 L 6.111 14.596 z
            M 0.000 10.500 L 0.000 9.500 L 4.000 9.500 L 4.000 10.500 z
            M 2.575 3.282 L 3.282 2.575 L 6.111 5.404 L 5.404 6.111 z
            "
          />
        ) : (
          <path
            d="
            M 1.439 17.391 A 8.000 8.000 0 0 0 8.500 16.928
            L 8.500 3.072 A 8.000 8.000 0 0 0 1.439 2.609
            A 10.000 10.000 0 0 1 1.439 17.391z
            M 10.000 6.000 A 4.000 4.000 0 0 1 10.000 14.000
            M 9.500 0.000 L 10.500 0.000 L 10.500 4.000 L 9.500 4.000 z
            M 16.718 2.575 L 17.425 3.282 L 14.596 6.111 L 13.889 5.404 z
            M 20.000 9.500 L 20.000 10.500 L 16.000 10.500 L 16.000 9.500 z
            M 17.425 16.718 L 16.718 17.425 L 13.889 14.596 L 14.596 13.889 z
            M 10.500 20.000 L 9.500 20.000 L 9.500 16.000 L 10.500 16.000 z
            "
          />
        )}
      </svg>
    </button>
  )
}

export default ThemeSwitch
