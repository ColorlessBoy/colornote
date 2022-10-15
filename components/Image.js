import NextImage from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const Image = ({ ...rest }) => {
  const theme = rest.alt.split('|')[1]
  let themecss = 'block'
  if (theme === 'dark') {
    themecss = 'hidden dark:block'
  } else if (theme === 'light') {
    themecss = 'block dark:hidden'
  }
  return (
    <div className={`stroke-gray-900 text-center dark:stroke-gray-100 ${themecss}`}>
      <NextImage {...rest} />
    </div>
  )
}

export default Image
