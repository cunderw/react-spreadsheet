import { render, screen } from '@testing-library/react'

import SpreadsheetHeader from './SpreadsheetHeader'

describe('SpreadsheetHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders a header cell for each column', () => {
    const numCols = 3
    render(<SpreadsheetHeader numCols={numCols} />)

    // There should be numCols + 1 th elements because of the empty leading th
    const headerCells = screen.getAllByRole('columnheader')
    expect(headerCells).toHaveLength(numCols + 1)
  })

  test('renders column names correctly', () => {
    const numCols = 3
    render(<SpreadsheetHeader numCols={numCols} />)

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })

  test('first header cell should be empty', () => {
    render(<SpreadsheetHeader numCols={1} />)

    const headerCells = screen.getAllByRole('columnheader')
    expect(headerCells[0]).toHaveTextContent('')
  })

  test('applies sticky positioning style to the header', () => {
    render(<SpreadsheetHeader numCols={1} />)

    const theadElement = screen.getByRole('rowgroup')
    expect(theadElement).toHaveStyle({
      position: 'sticky',
      top: 0,
      zIndex: 1,
      textAlign: 'center'
    })
  })
})
