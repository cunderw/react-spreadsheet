import React from 'react'

type Props = {
  children: React.ReactNode
}

const SpreadsheetTable: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <div
      style={{
        overflowX: 'auto',
        overflowY: 'scroll',
        maxWidth: '100vw',
        maxHeight: '60vh',
        margin: '20px'
      }}
    >
      <table>{children}</table>
    </div>
  )
}

export default SpreadsheetTable
