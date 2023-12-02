enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
}

const maxCubes: Record<keyof typeof Color, number> = {
  [Color.red]: 12,
  [Color.blue]: 14,
  [Color.green]: 13,
};

function getCountOfColor(cubes: string): [number, keyof typeof Color] {
  const [countStr, colorStr] = cubes.split(' ');
  const count = Number(countStr.trim());
  const color = colorStr.trim() as keyof typeof Color;
  return [count, color];
}

function isGamePossible(game: string): boolean {
  const isPossible = game.split(/, |; /).every((cubes) => {
    const [count, color] = getCountOfColor(cubes);
    return count <= maxCubes[color];
  });
  return isPossible;
}

function getGamePower(game: string): number {
  const maxCubes = game.split(/, |; /).reduce((acc, cubes) => {
    const [count, color] = getCountOfColor(cubes);
    if (count > acc[color]) {
      acc[color] = count;
    }
    return acc;
  }, { red: 0, green: 0, blue: 0 });
  return Object.values(maxCubes).reduce((acc, cur) => {
    acc = cur * acc;
    return acc;
  }, 1);
}

function getGameNumber(str: string): number {
  return Number(str.split(' ')[1]);
}

const input = await Deno.readTextFile('input.txt');
const games = input.split('\n');
let sumOfIds = 0;
let sumOfPowers = 0;
games.forEach((game) => {
  const [gameStr, draws] = game.split(': ');
  const gameNum = getGameNumber(gameStr);
  const isPossible = isGamePossible(draws);
  if (isPossible) {
    sumOfIds += gameNum;
  }
  sumOfPowers += getGamePower(draws);
});
console.log(sumOfIds);
console.log(sumOfPowers);
