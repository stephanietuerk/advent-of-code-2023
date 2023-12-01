interface Match {
  num: number;
  firstIndex: number;
  lastIndex: number;
}

const digits = Array.from(Array(10).keys());
const wordNums = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'zero',
];
const numMap = new Map();
wordNums.forEach((num, i) => {
  numMap.set(num, i + 1);
});
digits.forEach((n) => {
  numMap.set(n.toString(), n);
});
const part1StringNums = Array.from(digits).map((x) => x.toString());
const part2StringNums = [...wordNums, ...part1StringNums];

function getNumberFromString(str: string, stringNums: string[]): number {
  const matches: Match[] = [];
  stringNums.forEach((num) => {
    const firstI = str.indexOf(num);
    const lastI = str.lastIndexOf(num);
    if (firstI > -1 || lastI > -1) {
      const match = {} as Match;
      match.num = numMap.get(num);
      if (firstI > -1) {
        match.firstIndex = firstI;
      }
      if (lastI > -1) {
        match.lastIndex = lastI;
      }
      matches.push(match);
    }
  });
  const firstNumber =
    matches.slice().sort((a, b) => a.firstIndex - b.firstIndex)[0].num;
  const lastNumber =
    matches.slice().sort((a, b) => b.lastIndex - a.lastIndex)[0].num;
  return Number(`${firstNumber}${lastNumber}`);
}

function sumValues(lines: string[], part: 1 | 2): number {
  const stringNums = part === 1 ? part1StringNums : part2StringNums;
  return lines.reduce((sum, line) => {
    const val = getNumberFromString(line, stringNums);
    sum += val;
    return sum;
  }, 0);
}

const input = await Deno.readTextFile('input.txt');
const lines = input.split('\n');
const part1Sum = sumValues(lines, 1);
const part2Sum = sumValues(lines, 2);
console.log(part1Sum);
console.log(part2Sum);
