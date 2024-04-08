import { render, screen } from '@testing-library/react'

import SpreadsheetTable from './SpreadsheetTable'

describe('SpreadsheetTable', () => {
  test('renders its children inside a table', () => {
    render(
      <SpreadsheetTable>
        <tbody>
          <tr>
            <td>Cell Content</td>
          </tr>
        </tbody>
      </SpreadsheetTable>
    )

    const cell = screen.getByText('Cell Content')
    expect(cell).toBeInTheDocument()
    expect(cell.tagName).toBe('TD')
    expect(cell.closest('table')).toBeInTheDocument()
  })

  test('applies correct styling to the container', () => {
    const { container } = render(
      <SpreadsheetTable>
        <div />
      </SpreadsheetTable>
    )
    const divElement = container.firstChild

    expect(divElement).toHaveStyle({
      overflowX: 'auto',
      overflowY: 'scroll',
      maxWidth: '100vw',
      maxHeight: '60vh',
      margin: '20px'
    })
  })
})
