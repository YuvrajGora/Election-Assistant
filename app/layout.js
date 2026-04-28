import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../components/AuthProvider'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'CivicAI | Your Intelligent Election Assistant',
  description: 'Navigate the election process with AI-powered guidance and real-time polling information.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <AuthProvider>
          <Header />
          <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
            {children}
          </main>
          <footer style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            borderTop: '1px solid var(--glass-border)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
          }}>
            <p>&copy; {new Date().getFullYear()} CivicAI Election Assistant. Built for demonstration.</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}
