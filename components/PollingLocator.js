'use client'

import { useState } from 'react'
import { FaMapMarkerAlt, FaSearch, FaSpinner, FaExclamationCircle, FaClock } from 'react-icons/fa'
import styles from './PollingLocator.module.css'

export default function PollingLocator() {
  const [address, setAddress] = useState('')
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!address.trim()) return

    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch(`/api/civic?address=${encodeURIComponent(address)}`)
      const result = await res.json()

      if (!res.ok) throw new Error(result.error || 'Failed to fetch data')
      
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`${styles.locatorContainer} glass-panel`} id="polling">
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>
          <FaMapMarkerAlt className={styles.icon} />
          Find Your Polling Station
        </h2>
        <p>Enter your registered voting address to find where to vote and see what&apos;s on your ballot.</p>
      </div>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g., 123 Main St, Anytown, CA 90210"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            aria-label="Voter Address"
          />
        </div>
        <button type="submit" className={styles.searchButton} disabled={isLoading || !address.trim()}>
          {isLoading ? <FaSpinner className={styles.spinner} /> : <FaSearch />}
          <span className="sr-only">Search</span>
        </button>
      </form>

      {error && (
        <div className={styles.errorState}>
          <FaExclamationCircle />
          {error}
        </div>
      )}

      {!data && !isLoading && !error && (
        <div className={styles.emptyState}>
          <FaMapMarkerAlt style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No Data Yet</h3>
          <p>
            Enter your address to see your polling station, early voting sites, and more. 
            We&apos;ll show you exactly where to go.
          </p>
        </div>
      )}

      {data && (
        <div className={styles.resultsGrid}>
          {data.pollingLocations?.length > 0 && (
            <div className={styles.resultGroup}>
              <h3>Election Day Polling Places</h3>
              {data.pollingLocations.map((loc, idx) => (
                <div key={idx} className={styles.resultCard}>
                  <div className={styles.cardTitle}>
                    <FaMapMarkerAlt /> {loc.address.locationName}
                  </div>
                  <div className={styles.address}>
                    {loc.address.line1}, {loc.address.city}, {loc.address.state} {loc.address.zip}
                  </div>
                  {loc.pollingHours && (
                    <div className={styles.hours}>
                      <FaClock /> {loc.pollingHours}
                    </div>
                  )}
                  {loc.notes && <div className={styles.notes}>{loc.notes}</div>}
                  {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
                    <iframe
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: '8px', marginTop: '1rem' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(loc.address.line1 + ' ' + loc.address.city + ' ' + loc.address.state)}`}
                    ></iframe>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.earlyVoteSites?.length > 0 && (
            <div className={styles.resultGroup}>
              <h3>Early Voting Sites</h3>
              {data.earlyVoteSites.map((loc, idx) => (
                <div key={idx} className={styles.resultCard}>
                  <div className={styles.cardTitle}>
                    <FaMapMarkerAlt /> {loc.address.locationName}
                  </div>
                  <div className={styles.address}>
                    {loc.address.line1}, {loc.address.city}, {loc.address.state} {loc.address.zip}
                  </div>
                  {loc.pollingHours && (
                    <div className={styles.hours}>
                      <FaClock /> {loc.pollingHours}
                    </div>
                  )}
                  {loc.startDate && loc.endDate && (
                    <div className={styles.notes}>
                      Dates: {loc.startDate} to {loc.endDate}
                    </div>
                  )}
                  {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
                    <iframe
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: '8px', marginTop: '1rem' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${encodeURIComponent(loc.address.line1 + ' ' + loc.address.city + ' ' + loc.address.state)}`}
                    ></iframe>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {(!data.pollingLocations || data.pollingLocations.length === 0) && (!data.earlyVoteSites || data.earlyVoteSites.length === 0) && (
              <div className={styles.emptyState}>
                <p>No specific polling locations found for this address for the upcoming election.</p>
              </div>
          )}
        </div>
      )}
    </div>
  )
}
