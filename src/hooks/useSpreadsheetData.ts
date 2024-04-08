import { useCallback, useState } from 'react'

import { Cell, CellValue } from '../models/Spreadsheet'

export function useSpreadsheetData() {
  const [spreadsheet, setSpreadsheet] = useState({
    cells: new Map<string, Cell>(),
    numRows: 10,
    numCols: 10
  })
  const [activeCell, setActiveCell] = useState<string | null>(null)

  ////////////////////////////////////
  // Handle Spreadsheet operations
  ////////////////////////////////////
  const addRow = useCallback(() => {
    setSpreadsheet((prev) => ({ ...prev, numRows: prev.numRows + 1 }))
  }, [])

  const addColumn = useCallback(() => {
    setSpreadsheet((prev) => ({ ...prev, numCols: prev.numCols + 1 }))
  }, [])

  const handleClear = useCallback(() => {
    setSpreadsheet({ cells: new Map(), numRows: 10, numCols: 10 })
  }, [])

  ////////////////////////////////////
  // Handle cell operations
  ////////////////////////////////////
  const getCell = useCallback(
    (cellId: string): Cell | undefined => {
      return spreadsheet.cells.get(cellId.toUpperCase().trim())
    },
    [spreadsheet.cells]
  )

  const getCellValue = useCallback(
    (cellId: string) => {
      const cell = getCell(cellId)
      return cell ? (activeCell === cellId ? cell.expression : cell.value) : ''
    },
    [getCell, activeCell]
  )

  const getCellExpression = useCallback(
    (cellId: string) => {
      const cell = getCell(cellId)
      return cell ? cell.expression : ''
    },
    [getCell]
  )

  const updateCells = useCallback(
    (callback: (cells: Map<string, Cell>) => Map<string, Cell>) => {
      setSpreadsheet((prev) => ({
        ...prev,
        cells: callback(prev.cells)
      }))
    },
    []
  )

  ////////////////////////////////////
  // Handle cell expressions
  ////////////////////////////////////
  const handleSum = useCallback(
    (cellRefs: string[]): CellValue => {
      let sum = 0
      for (const cellRef of cellRefs) {
        const cell = getCell(cellRef)
        let cellValue = cell?.value
        if (!cellValue) return 'Error: Invalid cell reference'
        if (typeof cellValue === 'string') {
          cellValue = parseFloat(cellValue)
          if (isNaN(cellValue)) return 'Error: Invalid cell reference'
        }
        sum += cellValue
      }
      return sum
    },
    [getCell]
  )

  const handleAverage = useCallback(
    (cellRefs: string[]): CellValue => {
      const sumResult = handleSum(cellRefs)
      if (typeof sumResult === 'string') return sumResult // Error message from SUM
      return sumResult / cellRefs.length
    },
    [handleSum]
  )

  const handleMin = useCallback(
    (cellRefs: string[]): CellValue => {
      let min: number | undefined = undefined

      for (const cellRef of cellRefs) {
        const cell = getCell(cellRef)
        let cellValue = cell?.value
        if (!cellValue) return 'Error: Invalid cell reference'
        if (typeof cellValue === 'string') {
          cellValue = parseFloat(cellValue)
          if (isNaN(cellValue)) continue // Skip non-numeric cells
        }
        min = min !== undefined ? Math.min(min, cellValue) : cellValue
      }

      return min !== undefined ? min : 'Error: No numeric cells found'
    },
    [getCell]
  )

  const handleMax = useCallback(
    (cellRefs: string[]): CellValue => {
      let max: number | undefined = undefined

      for (const cellRef of cellRefs) {
        const cell = getCell(cellRef)
        let cellValue = cell?.value
        if (!cellValue) return 'Error: Invalid cell reference'
        if (typeof cellValue === 'string') {
          cellValue = parseFloat(cellValue)
          if (isNaN(cellValue)) continue // Skip non-numeric cells
        }
        max = max !== undefined ? Math.max(max, cellValue) : cellValue
      }

      return max !== undefined ? max : 'Error: No numeric cells found'
    },
    [getCell]
  )

  const handleCount = useCallback(
    (cellRefs: string[]): CellValue => {
      let count = 0

      for (const cellRef of cellRefs) {
        const cell = getCell(cellRef)
        const cellValue = cell?.value
        if (
          cellValue !== undefined &&
          !isNaN(parseFloat(cellValue.toString()))
        ) {
          count++
        }
      }

      return count
    },
    [getCell]
  )

  const evaluateExpression = useCallback(
    (expression: string): CellValue => {
      // Direct value or unsupported format
      if (!expression.startsWith('=')) return expression

      const functionMatch = expression.match(/^=(\w+)\((.*)\)$/)
      if (!functionMatch) return 'Error: Invalid expression format'

      const [, functionName, argsString] = functionMatch
      const args = argsString.split(',').map((arg) => arg.trim())

      switch (functionName.toLowerCase()) {
        case 'sum':
          return handleSum(args)
        case 'average':
          return handleAverage(args)
        case 'min':
          return handleMin(args)
        case 'max':
          return handleMax(args)
        case 'count':
          return handleCount(args)
        default:
          return 'Error: Function not supported'
      }
    },
    [handleAverage, handleCount, handleMax, handleMin, handleSum]
  )

  const setCell = useCallback(
    (cellId: string, expression: string) => {
      updateCells((prevCells) => {
        const newCells = new Map(prevCells)
        newCells.set(cellId, {
          expression,
          value: evaluateExpression(expression)
        })
        return newCells
      })
    },
    [evaluateExpression, updateCells]
  )

  // TODO - Figure out circular dependencies not updating
  const recalculateAllCells = useCallback(() => {
    let somethingChanged
    do {
      somethingChanged = false
      updateCells((prevCells) => {
        const newCells = new Map()
        prevCells.forEach((cell, cellId) => {
          const newValue = evaluateExpression(cell.expression)
          if (newValue !== cell.value) {
            somethingChanged = true
            newCells.set(cellId, {
              ...cell,
              value: newValue
            })
          } else {
            newCells.set(cellId, cell)
          }
        })
        return newCells
      })
    } while (somethingChanged)
  }, [updateCells, evaluateExpression])

  return {
    numRows: spreadsheet.numRows,
    numCols: spreadsheet.numCols,
    addRow,
    addColumn,
    getCellValue,
    getCellExpression,
    setCell,
    handleClear,
    recalculateAllCells,
    activeCell,
    setActiveCell
  }
}
