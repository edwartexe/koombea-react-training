import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import {useHistory } from "react-router-dom";

import {AuthContext} from "../../Context/Auth";
import {useState, useContext } from 'react';

import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import cx from "classnames";

const NavItems = (props) => (
  <Text 
    as="li"
    align="center" 
    className={cx(styles.navButton, {
      [styles.navLogin]: props.login
    })}
  >  
    <Link 
    to={props.to}
    className={styles.navLink}
    >
      {props.children}
    </Link>
  </Text>
);

const NavLogout = (props)=>(
  <li 
    key={0} 
    className={styles.navLogout} 
    onClick={props.action} 
  >  
    Logout 
  </li>
);



function Nav (props) {
  let history = useHistory();
  const {session, setSession} = useContext(AuthContext);
  const [show, setShow] = useState(false);
 

  const logoutAccount = () => {
    setSession(null);
    localStorage.removeItem("rememberSessionID");
    history.push({pathname:  "/Login"})
  };

  return (
    <nav className={styles.nav}> 
      
      <h1 className={styles.navUser}>
        {session? "Welcome, "+session.username: ""}
      </h1>
    
      <ul className={styles.navBar}>
        <h2 className={styles.navTitle}>Navigation</h2>

        <NavItems key={1} to="/List">Event List</NavItems>

        {session? 
          [
          <NavItems key={3} to="/Create">NEW event</NavItems>,
          <NavLogout key={0} action={logoutAccount} />
          ]
        : 
          [
          <NavItems key={2} to="/Register">Sign Up</NavItems>,
          <NavItems key={0} to="/Login" login={true}>Login</NavItems>
          ]
        }
        
      </ul>
    </nav>

  );
}




export default Nav2;












function Nav2 (props)  {
  let history = useHistory();
  const {session, setSession} = useContext(AuthContext);
  const [show, setShow] = useState(false);
 

  const logoutAccount = () => {
    setSession(null);
    localStorage.removeItem("rememberSessionID");
    history.push({pathname:  "/Login"})
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      min-height="72px"
      pl="24px"
      bg="white"
      color="#6f7287"
      boxShadow="md" 
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading 
          as="h1" 
          size="lg" 
          letterSpacing={"-.1rem"}
          py="12px"
        >
          Not-EventBrite
        </Heading>
        <Text 
          as="h2"
          size="m" 
          pt="24px"
          pb="12px"
          pl="5px"
        >
          {session? "Welcome, "+session.username: ""}
        </Text>
      </Flex>

      <Box 
      display={{ sm: "block", md: "none" }} 
      onClick={()=>setShow(!show)}
      pr="24px"
      >
        <svg
          fill="#6f7287"
          width="22px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        as="ul"
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        height="full"
        flexDirection={{sm:"row", md:"row-reverse"}}
        flexGrow={1}
      >

        {session? 
          [
          <NavLogout key={0} action={logoutAccount} />,
          <NavItems key={3} to="/Create">NEW event</NavItems>
          ]
        : 
          [
          <NavItems key={0} to="/Login" login={true}>Login</NavItems>,
          <NavItems key={2} to="/Register">Sign Up</NavItems>
          ]
        }
        <NavItems key={1} to="/List">Event List</NavItems>
      </Box>
    </Flex>
  );
};