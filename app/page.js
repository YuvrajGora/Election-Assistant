'use client';
import dynamic from 'next/dynamic'
import styles from './page.module.css'
import { FaRobot, FaMapMarkedAlt, FaCalendarCheck } from 'react-icons/fa'

const ChatAssistant = dynamic(() => import('../components/ChatAssistant'), {
  ssr: false,
  loading: () => <div className={styles.loadingPlaceholder}>Loading AI Assistant...</div>
})

const PollingLocator = dynamic(() => import('../components/PollingLocator'), {
  ssr: false,
  loading: () => <div className={styles.loadingPlaceholder}>Loading Polling Locator...</div>
})

export default function Home() {
  return (
    <div className={styles.content}>
      <div className={styles.mainColumn}>
        <section className={styles.heroSection}>
          <div className={styles.badge}>Powered by Gemini AI</div>
          <h1 className={`${styles.title} ${styles.textGradient}`}>Navigate Elections with Confidence</h1>
          <p className={styles.subtitle}>
            Your personal, intelligent guide to understanding the voting process, finding your polling station, and staying informed about key dates.
          </p>

          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIcon}>
                <FaRobot />
              </div>
              <h3 className={styles.featureTitle}>Smart Assistant</h3>
              <p className={styles.featureDesc}>Ask anything about the election process, requirements, or candidates. Powered by advanced AI to give you clear, factual answers.</p>
            </div>
            
            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIcon}>
                <FaMapMarkedAlt />
              </div>
              <h3 className={styles.featureTitle}>Polling Locator</h3>
              <p className={styles.featureDesc}>Enter your address to instantly find your assigned polling location, early voting sites, and ballot drop-off boxes.</p>
            </div>

            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIcon}>
                <FaCalendarCheck />
              </div>
              <h3 className={styles.featureTitle}>Key Timelines</h3>
              <p className={styles.featureDesc}>Never miss a deadline. Track registration cutoffs, mail-in ballot requests, and election days specific to your area.</p>
            </div>
          </div>
        </section>

        <PollingLocator />
      </div>

      <aside className={styles.sidebar} id="assistant">
        <ChatAssistant />
      </aside>
    </div>
  )
}
