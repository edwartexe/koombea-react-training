import styles from "./Nav.module.css";

const Nav = (props) => (
    <nav className={styles.nav}> 
      
      <h1 className={styles.navUser}>
        {(props.username !== "")? "Welcome, "+props.username: ""}
      </h1>
    
      <ul className={styles.navBar}>
        <h2 className={styles.navTitle}>Navigation</h2>

        <li 
          key={1} 
          className={styles.navButton} 
          onClick={() => props.setWindow("List")} 
        >  
          Event List  
        </li>

        {(props.username !== "")? 
          [
          <li 
            key={3} 
            className={styles.navButton} 
            onClick={() => props.setWindow("Create")} 
          >  
            NEW event  
          </li>,
          <li 
            key={0} 
            className={styles.navLogout} 
            onClick={() => props.logout()} 
          >  
            Logout 
          </li>
          ]
        : 
          [
          <li 
            key={2} 
            className={styles.navButton} 
            onClick={() => props.setWindow("Register")} 
          >  
            Sign Up  
          </li>,
          <li 
            key={0} 
            className={styles.navLogin} 
            onClick={() => props.setWindow("Login")} 
          >  
            Login 
          </li>
          ]
        }
        
      </ul>
    </nav>

);

export default Nav;
