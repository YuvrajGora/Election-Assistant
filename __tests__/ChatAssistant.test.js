import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChatAssistant from '../components/ChatAssistant'

// Mock icons
jest.mock('react-icons/fa', () => ({
  FaRobot: () => <span>Robot</span>,
  FaPaperPlane: () => <span>Send</span>,
  FaUser: () => <span>User</span>,
  FaSpinner: () => <span>Spinner</span>,
  FaTrashAlt: () => <span>Trash</span>,
}))

describe('ChatAssistant Component', () => {
  it('renders correctly with welcome message', () => {
    render(<ChatAssistant />)
    expect(screen.getByText(/I can help you understand the election process/i)).toBeInTheDocument()
  })

  it('input field is interactive', () => {
    render(<ChatAssistant />)
    const input = screen.getByPlaceholderText(/Ask about elections/i)
    fireEvent.change(input, { target: { value: 'How do I register to vote?' } })
    expect(input.value).toBe('How do I register to vote?')
  })

  it('submit button is disabled when input is empty', () => {
    render(<ChatAssistant />)
    const button = screen.getByRole('button', { name: /Send/i })
    expect(button).toBeDisabled()
  })
})
