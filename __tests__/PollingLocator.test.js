import { render, screen } from '@testing-library/react'
import PollingLocator from '../components/PollingLocator'

// Mock the react-icons since they can sometimes cause issues in Jest if not handled correctly
jest.mock('react-icons/fa', () => ({
  FaMapMarkerAlt: () => <span>Icon</span>,
  FaSearch: () => <span>SearchIcon</span>,
  FaSpinner: () => <span>Spinner</span>,
  FaExclamationCircle: () => <span>ErrorIcon</span>,
  FaClock: () => <span>ClockIcon</span>,
}))

describe('PollingLocator Component', () => {
  it('renders the initial state correctly', () => {
    render(<PollingLocator />)
    
    // Check if the title is present
    expect(screen.getByText('Find Your Polling Station')).toBeInTheDocument()
    
    // Check if the input field is present
    expect(screen.getByPlaceholderText('e.g., 123 Main St, Anytown, CA 90210')).toBeInTheDocument()
    
    // Check if the submit button is present
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    // Check for the empty state message
    expect(screen.getByText('No Data Yet')).toBeInTheDocument()
    expect(screen.getByText(/Enter your address to see your polling station/i)).toBeInTheDocument()
  })

  it('initially has the search button disabled', () => {
    render(<PollingLocator />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})
