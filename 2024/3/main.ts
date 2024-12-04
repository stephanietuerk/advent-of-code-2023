function solvePart1(input: string): number {
  const regexpMul = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
  const matchesMul = [...input.matchAll(regexpMul)];
  return matchesMul.reduce((acc, curr) => {
    const result = getMultipliedDigits(curr[0]);
    acc = acc + result;
    return acc;
  }, 0);
}

function getMultipliedDigits(str: string): number {
  const digits = str.split('(')[1].split(')')[0].split(',').map((x) => +x);
  return digits[0] * digits[1];
}

function solvePart2(input: string): number {
  const regexpMul = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
  const regexpDo = /do\(\)/g;
  const regexpDont = /don't\(\)/g;
  const allMatches = [
    ...input.matchAll(regexpMul),
    ...input.matchAll(regexpDo),
    ...input.matchAll(regexpDont),
  ];
  allMatches.sort((a, b) => a.index - b.index);
  let shouldMultiply = true;
  return allMatches.reduce((acc, curr) => {
    if (curr[0].slice(0, 3) === 'don') {
      shouldMultiply = false;
    } else if (curr[0].slice(0, 3) === 'do(') {
      shouldMultiply = true;
    }
    if (shouldMultiply) {
      if (curr[0][0] === 'm') {
        const result = getMultipliedDigits(curr[0]);
        acc = acc + result;
      }
    }
    return acc;
  }, 0);
}

const input = await Deno.readTextFile('./input.txt');
const part1Result = solvePart1(input);
const part2Result = solvePart2(input);
console.log(part1Result);
console.log(part2Result);
