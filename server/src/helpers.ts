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

export const occurenceOfThird = (jokes: string[]) => {
  const joke = jokes[jokes.length - 1];
  const count = countChar(jokes.join(''));
  const third = getTheThirdLetter(joke);

  return count[third];
};

export const calculateMaxOccurence = (obj: { [key: string]: number }) => {
  let res: number[] = [];
  let percentages: number[] = [];
  const keys: string[] = Object.keys(obj);
  const values: number[] = Object.values(obj);
  const sum = values.reduce((partialSum, a) => partialSum + a, 0);
  const max: number = Math.max(...values);
  values
    .map((c: number, i) => {
      const percent = (100 * c) / sum;
      percentages.push(Math.round(percent * 100) / 100);
      return c === max ? i : undefined;
    })
    .forEach((index: number | undefined) => {
      if (index !== undefined) {
        res.push(index);
      }
    });

  return {
    maxOccurence: res.map((r) => keys[r]),
    percentage: res.map((r) => percentages[r]),
    times: max,
    length: keys.length,
  };
};

export const getMostCommon = (text: string) => {
  const count = countChar(text);
  const occ = calculateMaxOccurence(count);
  return { mostCommonLetters: occ.maxOccurence, occurence: occ.times };
};

export const getCategories = (jokes: any[]) => {
  let counts: any = {};
  jokes.forEach((joke) => {
    counts[joke.category] = (counts[joke.category] || 0) + 1;
  });
  return counts;
};

export const getDominantCategory = (categoriesObject: {
  [key: string]: number;
}) => {
  const occ = calculateMaxOccurence(categoriesObject);
  return { category: occ.maxOccurence, percentage: occ.percentage };
};

export const buildResult = (jokes: any[]) => {
  let twopart = 0;
  let single = 0;
  let j: string[] = [];
  let types: string[] = [];
  let cat: string[] = [];

  jokes.forEach((joke) => {
    cat.push(joke.category);
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
  const categories = getCategories(jokes);
  const dominant = getDominantCategory(categories);
  return {
    twopart: twopart / sum,
    single: single / sum,
    jokes: j,
    types,
    letters,
    occurenceOfThird: occurenceOfThird(j),
    totalAmountChars: countTotal(j.join('')),
    dominantCategory: dominant,
    categories: cat,
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
