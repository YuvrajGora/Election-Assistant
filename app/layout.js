import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import styles from './page.module.css'
import { FaVoteYea } from 'react-icons/fa'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' })

export const metadata = {
  title: 'Civic AI | Your Election Assistant',
  description: 'Understand the election process, timelines, and find your polling station with the help of AI.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <main className={styles.main}>
          <header className={styles.header}>
            <div className={styles.logo}>
              <FaVoteYea className={styles.logoIcon} />
              <span>CivicAI</span>
            </div>
            <nav className={styles.nav}>
              <Link href="/" className={`${styles.navLink} ${styles.navLinkActive}`}>Home</Link>
              <Link href="#assistant" className={styles.navLink}>Assistant</Link>
              <Link href="#polling" className={styles.navLink}>Polling Info</Link>
            </nav>
          </header>
          
          {children}

          <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} CivicAI Election Assistant. Built for demonstration.</p>
          </footer>
        </main>
      </body>
    </html>
  )
}
