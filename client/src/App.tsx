import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({
    jokes: [],
    types: [],
    letters: { mostCommonLetters: [], occurence: 0 },
    totalAmountChars: 0,
    occurenceOfThird: 0,
    single: 0,
    twopart: 0,
  });
  console.log(data);
  const fetchJokes = async () => {
    const res = await axios('http://localhost:3001/jokes?type=any&amount=100');
    setData(res.data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetchJokes();
  };

  const highlightAas = (text: string) => {
    return text
      .split(' ')
      .map((word) =>
        word.includes('a') ? <span style={{ color: 'red' }}>{word}</span> : word
      );
  };
  // console.log(highlightAas('agher ghdtr'));
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='type' />
        <input type='text' placeholder='number' />
        <input type='submit' placeholder='type' />
      </form>
      <div>
        {data.jokes.map((joke: string, i: number) => {
          return (
            <div>
              <p>
                {joke} - {data.types[i]}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <p>
          Most Common Letters: {data.letters.mostCommonLetters.join(',')},
          occurence: {data.letters.occurence}{' '}
        </p>
        <p>Total amount of characters: {data.totalAmountChars}</p>
        <p>
          How often the third letter of the last joke occurs:{' '}
          {data.occurenceOfThird}
        </p>
      </div>
    </div>
  );
}

export default App;
