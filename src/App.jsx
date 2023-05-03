import axios from 'axios';
import './index.css';
import sqlServer from './assets/sql-server.png';
import { useState } from 'react';

export default function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  const generateQuery = async () => {
    const response = await axios.post(
      'https://sql-ai.onrender.com/generate',
      {
        queryDescription: userPrompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
    return data.sqlQuery.trim();
  };

  return (
    <div className='flex flex-col items-center pt-20 text-gray-700 font-normal'>
      <img src={sqlServer} className='w-12' alt='SQL' />
      <h3 className='text-4xl leading-10 font-bold text-gray-800 my-4'>
        Generate SQL
      </h3>
      <form className='flex flex-col w-80' onSubmit={onSubmit}>
        <input
          type='text'
          name='query-description'
          placeholder='Describe your query'
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className='border border-teal-500 px-4 py-3 rounded-md mb-5 outline-teal-500 placeholder-gray-500 focus:bg-gray-200'
        />
        <input
          type='submit'
          value='Generate query'
          className='px-4 py-3 text-white bg-teal-500 rounded-md text-center cursor-pointer'
        />
      </form>
      <div className='mt-5 max-w-screen-lg'>
        <div className='border rounded-md p-4 max-h-64 overflow-y-auto'>
          <pre className='whitespace-pre-wrap break-words'>{sqlQuery}</pre>
        </div>
      </div>
    </div>
  );
}
