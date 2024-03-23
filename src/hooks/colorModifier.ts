/**
 * Modifica el color proporcionado por el valor de modificación.
 * @param color - El color a modificar en formato hexadecimal.
 * @param modifier - El valor de modificación.
 */
function colorModifier(color: string, modifier: number): string {

  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    throw new Error("El color proporcionado debe tener el siguiente formato: '#000000'.")
  }

  if (!Number.isInteger(modifier)) {
    throw new Error("El valor de modificación debe ser un número entero.")
  }

  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  const newR = Math.min(255, Math.max(0, r + modifier)).toString(16).padStart(2, '0')
  const newG = Math.min(255, Math.max(0, g + modifier)).toString(16).padStart(2, '0')
  const newB = Math.min(255, Math.max(0, b + modifier)).toString(16).padStart(2, '0')

  const newColor = `#${newR}${newG}${newB}`

  if (!/^#[0-9a-fA-F]{6}$/.test(newColor)) {
    throw new Error("El resultado de la modificación no es un color hexadecimal válido.")
  }

  return newColor
}

export {colorModifier}