import { render, screen } from '@testing-library/react'
import Header from '../components/Header'
import PollingLocator from '../components/PollingLocator'
import ChatAssistant from '../components/ChatAssistant'

// Mock Auth Context for Header
jest.mock('../components/AuthProvider', () => ({
  useAuth: () => ({ user: null, loading: false, login: jest.fn(), logout: jest.fn() })
}))

describe('Accessibility Compliance', () => {
  it('Header has accessible navigation and logos', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /CivicAI/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument()
  })

  it('PollingLocator has accessible form labels', () => {
    render(<PollingLocator />)
    expect(screen.getByLabelText(/Voter Address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument()
  })

  it('ChatAssistant has accessible chat input', () => {
    render(<ChatAssistant />)
    expect(screen.getByLabelText(/Chat input/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Send message/i })).toBeInTheDocument()
  })
})
