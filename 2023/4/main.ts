const input = await Deno.readTextFile('input.txt');
const lines = input.split('\r\n');

function getNumMatches(line: string): number {
  const [name, numbers] = line.split(': ');
  const [yours, winning] = numbers.split('| ').map((sequence) =>
    sequence.replace('  ', ' ').split(' ').filter((x) => parseInt(x))
      .map((x) => Number(x))
  );
  const numMatches = yours.reduce((numMatches, cur) => {
    if (winning.includes(cur)) {
      numMatches += 1;
    }
    return numMatches;
  }, 0);
  return numMatches;
}

function solvePart1(): void {
  const points = lines.reduce((points, line) => {
    const numMatches = getNumMatches(line);
    points += numMatches > 0 ? Math.pow(2, numMatches - 1) : 0;
    return points;
  }, 0);
  console.log(points);
}

solvePart1();

function solvePart2(): void {
  const cardCopies: number[][] = [];
  const cardCounts: number[] = [];
  const total = lines.reduce((count, line, cardIndex) => {
    const numMatches = getNumMatches(line);
    let copies = [];
    for (let i = 0; i < numMatches; i++) {
      const nextIndex = cardIndex + 1 + i;
      copies.push(nextIndex);
    }
    if (numMatches > 0 && cardIndex > 0) {
      const prevCards = cardCopies.slice(0, cardIndex);
      const numCopies = prevCards.filter((numArr) => numArr.includes(cardIndex))
        .reduce((numCopies, cur) => {
          numCopies += cur.filter((x) => x === cardIndex)
            ?.length;
          return numCopies ?? 0;
        }, 0);
      const numCopies2 = cardCounts[cardIndex];
      copies = copies.concat(
        Array(numCopies).fill(copies),
      ).flat();
      copies.forEach((copyIndex, i) => {
        cardCounts[copyIndex] += numCopies2 + 1;
      });
    }
    cardCopies.push(copies);
    count += 1 + copies.length;
    return count;
  }, 0);
  console.log(cardCounts.reduce((acc, cur) => {
    acc += cur;
    return acc;
  }, 0));
  console.log(total);
}

solvePart2();
