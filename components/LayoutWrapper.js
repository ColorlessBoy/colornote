import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import MobileNavV2 from './MobileNavV2'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <MobileNavV2 />
          </div>
          <div className="flex items-center text-base leading-5">
            <ThemeSwitch />
            <div className="flow-left ml-3 flex items-center justify-between ">
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="block h-6 font-serif font-semibold underline">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </Link>
            </div>
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
