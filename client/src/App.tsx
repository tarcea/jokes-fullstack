import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('any');
  const [amount, setAmount] = useState('10');
  const [data, setData] = useState({
    jokes: [],
    types: [],
    letters: { mostCommonLetters: [], occurence: 0 },
    totalAmountChars: 0,
    occurenceOfThird: 0,
    single: 0,
    twopart: 0,
    dominantCategory: { category: [], percentage: [] },
    categories: [],
  });
  console.log(data);
  const fetchJokes = async () => {
    const res = await axios(
      `http://localhost:3001/jokes?type=${type}&amount=${amount}`
    );
    setData(res.data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetchJokes();
    setShow(true);
  };

  const handleChangeType: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleChangeAmount: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div className='app-container'>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          joke type:
          <select value={type} onChange={handleChangeType}>
            <option value='any'>Any</option>
            <option value='single'>Single</option>
            <option value='twopart'>Two Part</option>
          </select>
        </label>
        <label>
          jokes to show:
          <select value={amount} onChange={handleChangeAmount}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
        </label>
        <input type='submit' placeholder='type' value='Get Jokes' />
      </form>
      <div className='result-container'>
        <div className='jokes-container'>
          {data.jokes.map((joke: string, i: number) => {
            return (
              <div key={Math.floor(Math.random() * 10000)}>
                <p>
                  {joke} - {data.categories[i]}
                </p>
              </div>
            );
          })}
        </div>
        {show && (
          <div className='analitics-container'>
            <p>Total amount of characters: {data.totalAmountChars}</p>
            <p>
              How often the third letter of the last joke occurs:{' '}
              {data.occurenceOfThird} times
            </p>
            <p>
              Most Common Letter(s): {data.letters.mostCommonLetters.join(',')},
              occurence: {data.letters.occurence} times
            </p>
            <p>
              The dominant category(s):{' '}
              {data.dominantCategory?.category.map((cat: string) => ` ${cat},`)}{' '}
              percentage: {data.dominantCategory?.percentage[0]}
              {' %'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
