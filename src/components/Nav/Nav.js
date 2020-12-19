import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import {useHistory } from "react-router-dom";

import {AuthContext} from "../Context/Auth";
import { useContext } from 'react';

function Nav (props) {
  let history = useHistory();
  const {session, setSession} = useContext(AuthContext)

  const logoutAccount = () => {
    setSession({ 
      username: "", 
      id: 0
    });
    localStorage.removeItem("rememberSessionID");
    history.push({pathname:  "/Login"})
  };

  return (
    <nav className={styles.nav}> 
      
      <h1 className={styles.navUser}>
        {(session.username !== "")? "Welcome, "+session.username: ""}
      </h1>
    
      <ul className={styles.navBar}>
        <h2 className={styles.navTitle}>Navigation</h2>

        <li 
          key={1} 
          className={styles.navButton} 
        >  
          <Link to="/List"  className={styles.navLink}>Event List</Link>
        </li>

        {(session.username !== "")? 
          [
          <li 
            key={3} 
            className={styles.navButton} 
          >  
          <Link to="/Create"  className={styles.navLink}>NEW event</Link>
          </li>,
          <li 
            key={0} 
            className={styles.navLogout} 
            onClick={logoutAccount} 
          >  
            Logout 
          </li>
          ]
        : 
          [
          <li 
            key={2} 
            className={styles.navButton} 
          >  
            <Link to="/Register" className={styles.navLink}>Sign Up</Link>
          </li>,
          <li 
            key={0} 
            className={styles.navLogin} 
          >  
            <Link to="/Login" className={styles.navLink}>Login</Link>
          </li>
          ]
        }
        
      </ul>
    </nav>

  );
}


export default Nav;
