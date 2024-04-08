import { Button } from '@mui/material'
import React from 'react'

type Props = {
  addRow: () => void
  addColumn: () => void
  handleClear: () => void
  toggleExpressions: () => void
  showExpressions: boolean
}

const ButtonGroup: React.FC<Props> = (props) => {
  const { addRow, addColumn, handleClear, toggleExpressions, showExpressions } =
    props
  return (
    <div>
      <Button variant="contained" onClick={addRow} style={{ margin: '4px' }}>
        Add Row
      </Button>
      <Button variant="contained" onClick={addColumn} style={{ margin: '4px' }}>
        Add Column
      </Button>
      <Button
        variant="contained"
        onClick={toggleExpressions}
        style={{ margin: '4px' }}
      >
        {showExpressions ? 'Hide Expressions' : 'Show Expressions'}
      </Button>
      <Button
        variant="contained"
        onClick={handleClear}
        style={{ margin: '4px' }}
      >
        Clear
      </Button>
    </div>
  )
}
export default ButtonGroup
