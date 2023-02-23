import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Store/auth-context';
import { useHistory } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const logOutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  useEffect(() => {
    if (!authCtx.login) {
      return;
    }
    setTimeout(() => {
      authCtx.logout();
    }, 1 * 5 * 60 * 1000);
  }, [authCtx]);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
          {isLoggedIn && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          )}
          {isLoggedIn && (
          <li>
            <button onClick={logOutHandler}>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
