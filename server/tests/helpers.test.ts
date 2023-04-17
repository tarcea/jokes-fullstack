import 'jest';
import {
  buildResult,
  countChar,
  countTotal,
  getMostCommon,
  getTheThirdLetter,
  occurenceOfThird,
  trimSpacesAndLowerCase,
} from '../src/helpers';

const jokes = [
  {
    category: 'Pun',
    type: 'twopart',
    setup: 'No matter how kind you are...',
    delivery: 'German kids are always Kinder.',
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    safe: true,
    id: 278,
    lang: 'en',
  },
  {
    category: 'Programming',
    type: 'single',
    joke:
      'A programmer puts two glasses on his bedside table before going to sleep.\n' +
      "A full one, in case he gets thirsty, and an empty one, in case he doesn't.",
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    id: 3,
    safe: true,
    lang: 'en',
  },
  {
    category: 'Pun',
    type: 'twopart',
    setup: 'Thank you student loans for getting me through college.',
    delivery: "I don't think I'll ever be able to repay you.",
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    id: 59,
    safe: true,
    lang: 'en',
  },
  {
    category: 'Pun',
    type: 'single',
    joke: "I'm reading a book about anti-gravity. It's impossible to put down!",
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    id: 126,
    safe: true,
    lang: 'en',
  },
  {
    category: 'Programming',
    type: 'twopart',
    setup: 'why do python programmers wear glasses?',
    delivery: "Because they can't C.",
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    safe: true,
    id: 294,
    lang: 'en',
  },
];
describe('helper functions', () => {
  test('countChar shoul count the character in a string, except spaces', () => {
    const count = countChar('Why did the programmer jump on the table w?"');
    expect(count['w']).toBe(2);
  });
  test('getTheThirdLetter should return the third letter in a string, except spaces', () => {
    const third = getTheThirdLetter(
      'Why did the programmer jump on the table w?'
    );
    expect(third).toBe('y');
  });

  test('trimSpacesAndLowerCase should eliminate spaces and lower case letters in a string', () => {
    const string = trimSpacesAndLowerCase(
      'Why did the programmer jump on the table w?'
    );
    expect(string).toBe('whydidtheprogrammerjumponthetablew?');
  });

  test('occurenceOfThird should return the number of occurence of the third letter in a string, except spaces', () => {
    const occurence = occurenceOfThird(
      'Why did the programmer jump on the table why?'
    );
    expect(occurence).toBe(2);
  });

  test('countTotal should return the totla amount of characters in a text', () => {
    const totalCount = countTotal(
      'Why did the programmer jump on        the table why?'
    );
    expect(totalCount).toBe(37);
  });

  test('getMostCommon should return the most common used letter in a string', () => {
    const res = getMostCommon(
      'Why did the programmer jump on        the table why?'
    );
    expect(res.mostCommonLetters.length).toBe(2);
    expect(res.occurence).toBe(4);
  });

  test('buildResult should return the required data', () => {
    const result = {
      twopart: 0.6,
      single: 0.4,
      jokes: [
        'No matter how kind you are... German kids are always Kinder.',
        'A programmer puts two glasses on his bedside table before going to sleep.\n' +
          "A full one, in case he gets thirsty, and an empty one, in case he doesn't.",
        "Thank you student loans for getting me through college. I don't think I'll ever be able to repay you.",
        "I'm reading a book about anti-gravity. It's impossible to put down!",
        "why do python programmers wear glasses? Because they can't C.",
      ],
      types: ['twopart', 'single', 'twopart', 'single', 'twopart'],
      letters: { mostCommonLetters: ['e'], occurence: 41 },
      occurenceOfThird: 3,
      totalAmountChars: 363,
    };
    const data = buildResult(jokes);
    console.log(data);
    expect(data).toMatchObject(result);
  });
});
