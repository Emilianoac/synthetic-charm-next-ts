import { expect, describe, it } from "vitest";
import { useColorModifier } from "../useColorModifier";

describe("ColorModifier", () => {

  it("Should throw an error if the first argument is not a valid hexadecimal color", () => {
    expect(() => useColorModifier("#000", 10)).toThrowError(
      "El color proporcionado debe tener el siguiente formato: '#000000'."
    );
  });

  it("Should throw an error if second argument is not a integer number. ", () => {
    //@ts-ignore
    expect(() => useColorModifier("#000000", "10")).toThrowError(
      "El valor de modificación debe ser un número entero."
    );
  });

  // return value must be a valid hexadecimal color
  it("Should return a valid hexadecimal color", () => {
    expect(useColorModifier("#000000", 10)).toBe("#0a0a0a");
    expect(useColorModifier("#000000", -10)).toBe("#000000");
  });
});