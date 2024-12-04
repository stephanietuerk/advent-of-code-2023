function createArrays(lines: string[]): number[][] {
  const arrays = lines.reduce((acc, line) => {
    acc[0].push(+line.split('  ')[0]);
    acc[1].push(+line.split('  ')[1]);
    return acc;
  }, [[], []] as number[][]);
  arrays.forEach((arr) => arr.sort((a, b) => a - b));
  return arrays;
}

function sumDifferences(arrays: number[][]): number {
  return arrays[0].reduce((acc, curr, i) => {
    acc = acc + Math.abs(curr - arrays[1][i]);
    return acc;
  }, 0);
}

function calcSimilarity(arrays: number[][]): number {
  return arrays[0].reduce((acc, curr, i) => {
    const matches = arrays[1].filter((x) => x === curr).length;
    acc = acc + (curr * matches);
    return acc;
  }, 0);
}

const input = await Deno.readTextFile('./index.txt');
const lines = input.split('\n').map((line) => line.replace('\r', ''));
const arrays = createArrays(lines);
const part1Result = sumDifferences(arrays);
const part2Result = calcSimilarity(arrays);
console.log(part1Result);
console.log(part2Result);
