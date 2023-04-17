import axios from 'axios';

export const trimSpacesAndLowerCase = (str: string) => {
  return str.trim().split(' ').join('').toLocaleLowerCase();
};

export const countChar = (str: string) => {
  let result: any = {};
  const cleanedString = trimSpacesAndLowerCase(str);
  result = [...cleanedString].reduce((res: any, cur: any) => {
    res[cur] = res[cur] ? res[cur] + 1 : 1;
    return res;
  }, {});
  return result;
};

export const getTheThirdLetter = (joke: string) => {
  const cleanedString = trimSpacesAndLowerCase(joke);
  return cleanedString[2];
};

export const countTotal = (text: string) => {
  const cleanedString = trimSpacesAndLowerCase(text);
  return cleanedString.length;
};

export const occurenceOfThird = (str: string) => {
  const count = countChar(str);
  const third = getTheThirdLetter(str);

  return count[third];
};

export const getMostCommon = (text: string) => {
  let res: number[] = [];
  const count = countChar(text);
  const letters: string[] = Object.keys(count);
  const counters: number[] = Object.values(count);
  const max: number = Math.max(...counters);
  counters
    .map((c: number, i) => {
      return c === max ? i : undefined;
    })
    .forEach((index: number | undefined) => {
      if (index) res.push(index);
    });
  return { mostCommonLetters: res.map((r) => letters[r]), occurence: max };
};

export const buildResult = (jokes: any[]) => {
  let twopart = 0;
  let single = 0;
  let j: string[] = [];
  let types: string[] = [];

  jokes.forEach((joke) => {
    types.push(joke.type);
    if (joke.type === 'twopart') {
      twopart += 1;
      j.push(`${joke.setup} ${joke.delivery}`);
    } else {
      single += 1;
      j.push(`${joke.joke}`);
    }
  });

  const sum = single + twopart;
  const letters = getMostCommon(j.join(''));
  return {
    twopart: twopart / sum,
    single: single / sum,
    jokes: j,
    types,
    letters,
    occurenceOfThird: occurenceOfThird(j[j.length - 1]),
    totalAmountChars: countTotal(j.join('')),
  };
};
export const fetchJokes = async (
  amount: string | undefined,
  type: string | undefined
) => {
  const endpoint = `https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode&type=${type}&amount=${amount}`;

  try {
    const response = await axios(endpoint);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
