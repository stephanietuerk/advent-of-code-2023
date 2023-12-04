const input = await Deno.readTextFile('input.txt');
const lines = input.split('\r\n');
const numLines = lines.length;
const numChars = lines[0].length;
const symbols = '!"#$%&\'()*+,-/:;<=>?@[\]^_`{|}~';
const digits = '0123456789';

function isSymbol(char: string): boolean {
  return symbols.includes(char);
}

function isDigit(char: string): boolean {
  return digits.includes(char);
}

function findEndOfNumber(str: string, startIndex: number): number {
  let next = startIndex + 1;
  while (str[next] !== undefined && isDigit(str[next])) {
    next++;
  }
  return next - 1;
}

function solvePart1(): void {
  let sum = 0;
  for (let i = 0; i < numLines; i++) {
    for (let j = 0; j < numChars; j++) {
      const char = lines[i][j];
      if (isDigit(char)) {
        const numEndIndex = findEndOfNumber(lines[i], j);
        const xStart = j > 0 ? j - 1 : j;
        const xEnd = numEndIndex < numChars - 1 ? numEndIndex + 1 : numEndIndex;
        const yStart = i > 0 ? i - 1 : i;
        const yEnd = i < numLines - 1 ? i + 1 : i;
        let hasAdjacentSymbol;
        for (let y = yStart; y <= yEnd; y++) {
          for (let x = xStart; x <= xEnd; x++) {
            if (isSymbol(lines[y][x])) {
              hasAdjacentSymbol = true;
              break;
            }
          }
          if (hasAdjacentSymbol) {
            break;
          }
        }
        let digitChars = '';
        for (let k = j; k <= numEndIndex; k++) {
          digitChars += lines[i][k];
        }
        const num = Number(digitChars);
        if (hasAdjacentSymbol) {
          sum += num;
        }
        j = numEndIndex;
      }
    }
  }
  console.log(sum);
}

function solvePart2(): void {
  let sum = 0;
  for (let i = 0; i < numLines; i++) {
    for (let j = 0; j < numChars; j++) {
      const char = lines[i][j];
      if (char === '*') {
        const xStart = j > 0 ? j - 1 : j;
        const xEnd = j < numChars - 1 ? j + 1 : j;
        const yStart = i > 0 ? i - 1 : i;
        const yEnd = i < numLines - 1 ? i + 1 : i;
        const numbers = [];
        for (let y = yStart; y <= yEnd; y++) {
          for (let x = xStart; x <= xEnd; x++) {
            if (isDigit(lines[y][x])) {
              let k = 0;
              let numFirstPart = '';
              let numSecondPart = '';
              let numEnd = x;
              while (lines[y][x - k] && isDigit(lines[y][x - k])) {
                numFirstPart = lines[y][x - k].concat(numFirstPart);
                k++;
              }
              k = 1;
              while (lines[y][x + k] && isDigit(lines[y][x + k])) {
                numSecondPart += lines[y][x + k];
                k++;
              }
              numEnd = x + k - 1;
              const num = numFirstPart + numSecondPart;
              numbers.push(Number(num));
              x = numEnd;
            }
          }
        }
        if (numbers.length === 2) {
          sum += numbers[0] * numbers[1];
        }
      }
    }
  }
  console.log(sum);
}

solvePart1();
solvePart2();
