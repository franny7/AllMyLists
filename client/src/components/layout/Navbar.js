import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ListContext from '../../context/list/listContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const listContext = useContext(ListContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearLists } = listContext;

  const onLogout = () => {
    logout();
    clearLists();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name.split(' ')[0]}</li>
      <span style={{ paddingRight: '15px' }}> </span>

      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar text-light'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Shopping List',
  icon: 'fa fa-clipboard-list',
};

export default Navbar;
