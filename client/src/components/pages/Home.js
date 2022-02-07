import React from 'react';
import Lists from '../lists/Lists';
import ListForm from '../lists/ListForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <ListForm />
      </div>
      <div>
        <Lists />
      </div>
    </div>
  );
};

export default Home;
