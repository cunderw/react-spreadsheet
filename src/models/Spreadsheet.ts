type CellValue = string | number

interface Cell {
  expression: string
  value: CellValue
}

const getColumnName = (index: number): string => {
  let name = ''
  let temp = index
  while (temp >= 0) {
    name = String.fromCharCode((temp % 26) + 65) + name
    temp = Math.floor(temp / 26) - 1
  }
  return name
}

export { getColumnName }
export type { Cell, CellValue }
