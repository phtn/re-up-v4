export type ColorValue = string | Record<string, string> | undefined;

/**
 * @name flattenColorPalette
 * @description Flattens a color palette (custom)
 */
export function flattenColorPalette(
  colors: Record<string, ColorValue>,
): Record<string, string> {
  const flattenColors: Record<string, string> = {};

  function flatten(colorName: string, colorValue: ColorValue) {
    if (typeof colorValue === "string") {
      flattenColors[colorName] = colorValue;
    } else {
      for (const key in colorValue) {
        flatten(`${colorName}-${key}`, colorValue[key]);
      }
    }
  }

  for (const colorName in colors) {
    flatten(colorName, colors[colorName]);
  }

  return flattenColors;
}
