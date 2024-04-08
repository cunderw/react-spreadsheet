import { fireEvent, render, screen } from '@testing-library/react'

import * as useSpreadsheetDataHook from '../../hooks/useSpreadsheetData' // Adjust the import path as needed
import Spreadsheet from './Spreadsheet' // Adjust the import path as needed

// Mocking the custom hook
jest.mock('../../hooks/useSpreadsheetData', () => ({
  useSpreadsheetData: jest.fn()
}))

// Setting up mock data and functions
const mockData = {
  numRows: 5,
  numCols: 5,
  activeCell: null,
  setCell: jest.fn(),
  setActiveCell: jest.fn(),
  recalculateAllCells: jest.fn(),
  addRow: jest.fn(),
  addColumn: jest.fn(),
  handleClear: jest.fn(),
  getCellValue: jest.fn(),
  getCellExpression: jest.fn()
}

describe('Spreadsheet Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest
      .spyOn(useSpreadsheetDataHook, 'useSpreadsheetData')
      .mockReturnValue(mockData)
  })

  test('renders Spreadsheet component', () => {
    render(<Spreadsheet />)
    expect(screen.getByRole('button', { name: /add row/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /add column/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /show expressions/i })
    ).toBeInTheDocument()
  })

  test('calls addRow when add row button is clicked', () => {
    render(<Spreadsheet />)
    fireEvent.click(screen.getByRole('button', { name: /add row/i }))
    expect(mockData.addRow).toHaveBeenCalledTimes(1)
  })

  test('calls addColumn when add column button is clicked', () => {
    render(<Spreadsheet />)
    fireEvent.click(screen.getByRole('button', { name: /add column/i }))
    expect(mockData.addColumn).toHaveBeenCalledTimes(1)
  })

  test('calls handleClear when clear button is clicked', () => {
    render(<Spreadsheet />)
    fireEvent.click(screen.getByRole('button', { name: /clear/i }))
    expect(mockData.handleClear).toHaveBeenCalledTimes(1)
  })

  test('toggles showExpressions state when toggle expressions button is clicked', () => {
    render(<Spreadsheet />)
    const showExpressionsButton = screen.getByRole('button', {
      name: /show expressions/i
    })
    fireEvent.click(showExpressionsButton)

    const hideExpressionsButton = screen.getByRole('button', {
      name: /hide expressions/i
    })
    expect(hideExpressionsButton).toBeInTheDocument()
  })
})
