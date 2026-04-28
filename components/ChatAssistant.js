'use client'

import { useState, useRef, useEffect } from 'react'
import { FaRobot, FaPaperPlane } from 'react-icons/fa'
import styles from './ChatAssistant.module.css'

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am CivicAI. I can help you understand the election process, check registration deadlines, or find your polling station. How can I assist you today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages })
      })

      if (!response.ok) throw new Error('Network response was not ok')
      
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I am having trouble connecting to my knowledge base right now. Please try again in a moment.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
    // We don't automatically send, giving the user a chance to read/edit
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <FaRobot className={styles.botIcon} />
        <h2 className={styles.headerTitle}>CivicAI Assistant</h2>
        <div className={styles.statusIndicator} aria-label="Online"></div>
      </div>

      <div className={styles.messageArea}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <div className={styles.loadingDots}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <form onSubmit={handleSend} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about elections..."
            className={styles.inputField}
            aria-label="Chat input"
          />
          <button 
            type="submit" 
            className={styles.sendButton}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <FaPaperPlane />
          </button>
        </form>
        
        {messages.length < 3 && (
          <div className={styles.suggestions}>
            <button className={styles.suggestionChip} onClick={() => handleSuggestionClick("How do I register to vote?")}>
              How do I register?
            </button>
            <button className={styles.suggestionChip} onClick={() => handleSuggestionClick("What ID do I need to bring on election day?")}>
              What ID do I need?
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
