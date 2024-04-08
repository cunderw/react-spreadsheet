import { fireEvent, render, screen } from '@testing-library/react'

import ButtonGroup from './ButtonGroup'

describe('ButtonGroup', () => {
  const addRowMock = jest.fn()
  const addColumnMock = jest.fn()
  const handleClearMock = jest.fn()
  const toggleExpressionsMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders all buttons with "Show Expressions" when showExpressions is false', () => {
    render(
      <ButtonGroup
        addRow={addRowMock}
        addColumn={addColumnMock}
        handleClear={handleClearMock}
        toggleExpressions={toggleExpressionsMock}
        showExpressions={false}
      />
    )

    expect(screen.getByText(/Add Row/i)).toBeInTheDocument()
    expect(screen.getByText(/Add Column/i)).toBeInTheDocument()
    expect(screen.getByText(/Show Expressions/i)).toBeInTheDocument()
    expect(screen.getByText(/Clear/i)).toBeInTheDocument()
  })

  test('renders all buttons with "Hide Expressions" when showExpressions is true', () => {
    render(
      <ButtonGroup
        addRow={addRowMock}
        addColumn={addColumnMock}
        handleClear={handleClearMock}
        toggleExpressions={toggleExpressionsMock}
        showExpressions={true}
      />
    )

    expect(screen.getByText(/Add Row/i)).toBeInTheDocument()
    expect(screen.getByText(/Add Column/i)).toBeInTheDocument()
    expect(screen.getByText(/Hide Expressions/i)).toBeInTheDocument()
    expect(screen.getByText(/Clear/i)).toBeInTheDocument()
  })

  test('calls addRow when Add Row button is clicked', () => {
    render(
      <ButtonGroup
        addRow={addRowMock}
        addColumn={addColumnMock}
        handleClear={handleClearMock}
        toggleExpressions={toggleExpressionsMock}
        showExpressions={false}
      />
    )

    fireEvent.click(screen.getByText(/Add Row/i))
    expect(addRowMock).toHaveBeenCalledTimes(1)
  })

  test('calls addColumn when Add Column button is clicked', () => {
    render(
      <ButtonGroup
        addRow={addRowMock}
        addColumn={addColumnMock}
        handleClear={handleClearMock}
        toggleExpressions={toggleExpressionsMock}
        showExpressions={false}
      />
    )

    fireEvent.click(screen.getByText(/Add Column/i))
    expect(addColumnMock).toHaveBeenCalledTimes(1)
  })

  test('calls handleClear when Clear button is clicked', () => {
    render(
      <ButtonGroup
        addRow={addRowMock}
        addColumn={addColumnMock}
        handleClear={handleClearMock}
        toggleExpressions={toggleExpressionsMock}
        showExpressions={false}
      />
    )

    fireEvent.click(screen.getByText(/Clear/i))
    expect(handleClearMock).toHaveBeenCalledTimes(1)
  })

  test('calls toggleExpressions and shows "Hide Expressions" when Show Expressions button is clicked', () => {
    render(
      <ButtonGroup
        addRow={addRowMock}
        addColumn={addColumnMock}
        handleClear={handleClearMock}
        toggleExpressions={toggleExpressionsMock}
        showExpressions={false}
      />
    )

    fireEvent.click(screen.getByText(/Show Expressions/i))
    expect(toggleExpressionsMock).toHaveBeenCalledTimes(1)
  })

  test('calls toggleExpressions and shows "Show Expressions" when Hide Expressions button is clicked', () => {
    render(
      <ButtonGroup
        addRow={addRowMock}
        addColumn={addColumnMock}
        handleClear={handleClearMock}
        toggleExpressions={toggleExpressionsMock}
        showExpressions={true}
      />
    )

    fireEvent.click(screen.getByText(/Hide Expressions/i))
    expect(toggleExpressionsMock).toHaveBeenCalledTimes(1)
  })
})
