import { Typography } from '@mui/material'
import React from 'react'

import { getColumnName } from '../../../models/Spreadsheet'

type Props = {
  numCols: number
}

const SpreadsheetHeader: React.FC<Props> = (props) => {
  const { numCols } = props
  return (
    <thead
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        textAlign: 'center'
      }}
    >
      <tr>
        <th style={{ textAlign: 'center' }}> </th>
        {Array.from({ length: numCols }, (_, col) => (
          <th
            key={col}
            style={{
              backgroundColor: '#f5f5f5'
            }}
          >
            <Typography variant="body1">{getColumnName(col)}</Typography>
          </th>
        ))}
      </tr>
    </thead>
  )
}
export default SpreadsheetHeader
