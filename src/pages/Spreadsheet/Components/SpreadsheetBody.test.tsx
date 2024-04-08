import { fireEvent, render, screen, within } from '@testing-library/react'

import SpreadsheetBody from './SpreadsheetBody'

describe('SpreadsheetBody', () => {
  const defaultProps = {
    numRows: 2,
    numCols: 2,
    showExpressions: false,
    getCellValue: jest.fn(),
    getCellExpression: jest.fn(),
    handleChange: jest.fn(),
    handleFocus: jest.fn(),
    handleBlur: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the correct number of rows and columns', () => {
    render(<SpreadsheetBody {...defaultProps} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(defaultProps.numRows)

    const cellsInFirstRow = within(rows[0]).getAllByRole('cell')
    expect(cellsInFirstRow).toHaveLength(defaultProps.numCols + 1)
  })

  test('displays cell values correctly', () => {
    const customProps = {
      ...defaultProps,
      getCellValue: (cellId: string) => `Value ${cellId}`
    }
    render(<SpreadsheetBody {...customProps} />)

    expect(screen.getByDisplayValue('Value A1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Value B1')).toBeInTheDocument()
  })

  test('calls handleChange on cell value change', () => {
    render(<SpreadsheetBody {...defaultProps} />)

    const firstCellInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(firstCellInput, { target: { value: 'New Value' } })

    expect(defaultProps.handleChange).toHaveBeenCalledWith('A1', 'New Value')
  })

  test('shows expressions when showExpressions is true', () => {
    const customProps = {
      ...defaultProps,
      showExpressions: true,
      getCellExpression: (cellId: string) => `Expression ${cellId}`
    }
    render(<SpreadsheetBody {...customProps} />)

    expect(screen.getByText('Expression A1')).toBeInTheDocument()
    expect(screen.getByText('Expression B1')).toBeInTheDocument()
  })

  test('does not show expressions when showExpressions is false', () => {
    render(<SpreadsheetBody {...defaultProps} />)

    const expressions = screen.queryAllByText(/Expression/)
    expect(expressions).toHaveLength(0)
  })

  test('calls handleFocus on cell focus', () => {
    render(<SpreadsheetBody {...defaultProps} />)

    const firstCellInput = screen.getAllByRole('textbox')[0]
    fireEvent.focus(firstCellInput)

    expect(defaultProps.handleFocus).toHaveBeenCalledWith('A1')
  })

  test('calls handleBlur on cell blur', () => {
    render(<SpreadsheetBody {...defaultProps} />)

    const firstCellInput = screen.getAllByRole('textbox')[0]
    fireEvent.blur(firstCellInput)

    expect(defaultProps.handleBlur).toHaveBeenCalledTimes(1)
  })
})
