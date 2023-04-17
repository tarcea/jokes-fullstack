import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({ jokes: [], types: [] });
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
  console.log(highlightAas('agher ghdtr'));
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
    </div>
  );
}

export default App;
