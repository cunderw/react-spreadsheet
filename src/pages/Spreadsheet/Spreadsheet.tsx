import React, { useState } from 'react'

import { useSpreadsheetData } from '../../hooks/useSpreadsheetData'
import ButtonGroup from './Components/ButtonGroup'
import SpreadsheetBody from './Components/SpreadsheetBody'
import SpreadsheetHeader from './Components/SpreadsheetHeader'
import SpreadsheetTable from './Components/SpreadsheetTable'

const Spreadsheet: React.FC = () => {
  const {
    numRows,
    numCols,
    setCell,
    setActiveCell,
    recalculateAllCells,
    addRow,
    addColumn,
    handleClear,
    getCellValue,
    getCellExpression
  } = useSpreadsheetData()

  const [showExpressions, setShowExpressions] = useState(false)

  const handleChange = (cellId: string, value: string) => {
    setCell(cellId, value)
  }

  const handleFocus = (cellId: string) => {
    setActiveCell(cellId)
  }

  const handleBlur = () => {
    setActiveCell(null)
    recalculateAllCells()
  }

  const toggleExpressions = () => {
    setShowExpressions((prev) => !prev)
  }

  return (
    <div style={{ padding: '20px' }}>
      <ButtonGroup
        addRow={addRow}
        addColumn={addColumn}
        handleClear={handleClear}
        showExpressions={showExpressions}
        toggleExpressions={toggleExpressions}
      />
      <SpreadsheetTable>
        <SpreadsheetHeader numCols={numCols} />
        <SpreadsheetBody
          numCols={numCols}
          numRows={numRows}
          showExpressions={showExpressions}
          getCellValue={getCellValue}
          getCellExpression={getCellExpression}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
      </SpreadsheetTable>
    </div>
  )
}

export default Spreadsheet
