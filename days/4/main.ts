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

interface CardTally {
  matches: number;
  copiedCardsIndicies: number[];
}

function solvePart2(): void {
  const cardTallies: CardTally[] = [];
  const total = lines.reduce((count, line, cardIndex) => {
    const numMatches = getNumMatches(line);
    let copies = [];
    for (let i = 0; i < numMatches; i++) {
      copies.push(cardIndex + 1 + i);
    }
    if (numMatches > 0 && cardIndex > 0) {
      const prevCards = cardTallies.slice(0, cardIndex);
      const numCopies = prevCards.reduce((numCopies, cur) => {
        numCopies += cur.copiedCardsIndicies.filter((x) => x === cardIndex)
          ?.length;
        return numCopies ?? 0;
      }, 0);
      copies = copies.concat(
        Array(numCopies).fill(copies),
      )
        .flat();
    }
    const tally = {
      matches: numMatches,
      copiedCardsIndicies: copies,
    };
    cardTallies.push(tally);
    count += 1 + copies.length;
    return count;
  }, 0);
  console.log(total);
}

solvePart2();
