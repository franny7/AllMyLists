import React, { useContext, useEffect } from 'react';
import Lists from '../lists/Lists';
import ListForm from '../lists/ListForm';
import ListFilter from '../lists/ListFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ListForm />
      </div>
      <div>
        <ListFilter />
        <Lists />
      </div>
    </div>
  );
};

export default Home;
