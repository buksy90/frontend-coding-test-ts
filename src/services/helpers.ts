/* eslint-disable import/prefer-default-export */

export function sanitizeNumberInput(input: unknown): number {
  if (typeof input === 'number') {
    return input
  }

  if (typeof input === 'string') {
    const parsed = parseFloat(input)
    if (Number.isNaN(parsed) === false) return parsed
  }

  return 0
}
