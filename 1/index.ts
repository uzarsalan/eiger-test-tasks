export function commonPrefix(inputs: string[]): number[] {
  return inputs.map((input) =>
    [...new Array(input.length)].reduce(
      (acc, _, cutLength) =>
        acc +
        [...new Array(input.length + 1 - cutLength)].findLastIndex(
          (_, prefixLength) =>
            input.substring(0, prefixLength) ===
            input.substring(cutLength, cutLength + prefixLength)
        ),
      0
    )
  );
}
