import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({ jokes: [] });
  console.log(data);
  const fetchJokes = async () => {
    const res = await axios('http://localhost:3001/jokes?type=any&amount=100');
    setData(res.data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission with the formState object
    await fetchJokes();
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='type' />
        <input type='text' placeholder='number' />
        <input type='submit' placeholder='type' />
      </form>
      <div>
        {data.jokes.map((joke) => (
          <p>{joke}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
