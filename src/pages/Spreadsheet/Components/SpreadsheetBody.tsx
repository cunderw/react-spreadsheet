import { TextField, Typography } from '@mui/material'
import React from 'react'

import { getColumnName } from '../../../models/Spreadsheet'

type Props = {
  numRows: number
  numCols: number
  showExpressions: boolean
  getCellValue: (cellId: string) => string | number
  getCellExpression: (cellId: string) => string
  handleChange: (cellId: string, value: string) => void
  handleFocus: (cellId: string) => void
  handleBlur: () => void
}

const SpreadsheetBody: React.FC<Props> = (props) => {
  const {
    numCols,
    numRows,
    showExpressions,
    getCellValue,
    getCellExpression,
    handleChange,
    handleFocus,
    handleBlur
  } = props

  return (
    <tbody>
      {Array.from({ length: numRows }, (_, row) => (
        <tr key={row}>
          <td
            style={{
              textAlign: 'center',
              padding: 4,
              backgroundColor: '#f5f5f5',
              position: 'sticky',
              left: 0,
              zIndex: 1
            }}
          >
            <Typography variant="body1">{row + 1}</Typography>
          </td>
          {Array.from({ length: numCols }, (_, col) => {
            const cellId = `${getColumnName(col)}${row + 1}`
            return (
              <td key={col} style={{ padding: '5px', minWidth: '100px' }}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={getCellValue(cellId)}
                  onChange={(e) => handleChange(cellId, e.target.value)}
                  onFocus={() => handleFocus(cellId)}
                  onBlur={handleBlur}
                  fullWidth
                />
                {showExpressions && (
                  <Typography variant="caption">
                    {getCellExpression(cellId) || 'empty'}
                  </Typography>
                )}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

export default SpreadsheetBody
