function isSafe(line: number[]): boolean {
  const isAscending = line[1] > line[0];
  let isSafe = true;
  for (let i = 0; i < line.length - 1; i++) {
    const next = line[i + 1];
    const curr = line[i];
    const nextDiffCurr = next - curr;
    if (i > 0) {
      if (nextDiffCurr > 0 !== isAscending) {
        isSafe = false;
        break;
      }
    }
    const diffAbs = Math.abs(nextDiffCurr);
    if (diffAbs < 1 || diffAbs > 3) {
      isSafe = false;
      break;
    }
  }
  return isSafe;
}

function isSafeTolerant(line: number[]): boolean {
  if (isSafe(line)) {
    return true;
  } else {
    let altIsSafe = false;
    for (let i = 0; i < line.length; i++) {
      const omitI = [...line.slice(0, i), ...line.slice(i + 1)];
      if (isSafe(omitI)) {
        altIsSafe = true;
        break;
      }
    }
    return altIsSafe;
  }
}

const input = await Deno.readTextFile('./input.txt');
const lines = input.split('\n');
const arrays = lines.map((x) => x.split(' ').map((n) => +n));
const part1Result = arrays.filter((x) => isSafe(x)).length;
const part2Result = arrays.filter((x) => isSafeTolerant(x)).length;
console.log(part1Result);
console.log(part2Result);
