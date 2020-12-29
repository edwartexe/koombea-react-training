import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../Context/Auth";
import { useState, useContext } from "react";

import {
  Box,
  Heading,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const NavItems = (props) => (
  <Button
    as="li"
    align="center"
    height="100%"
    borderRadius="0"
    p="0"
    color="#6f7287"
    bg={props.login ? "#cfc" : "#fff"}
    _hover={{
      bg: props.login ? "#9f9" : "#ddd",
      color: "#39364f",
    }}
  >
    <Link to={props.to} className={styles.navLink}>
      {props.children}
    </Link>
  </Button>
);

const NavLogout = (props) => (
  <Menu>
    <MenuButton
      as={Button}
      align="center"
      height="100%"
      borderRadius="0"
      p="5px 20px"
      color="#6f7287"
      bg="#fff"
      _hover={{
        bg: "#ddd",
        color: "#39364f",
      }}
    >
      {props.usr} ▼
    </MenuButton>
    <MenuList p="0">
      <MenuItem>Hello There...</MenuItem>
      <MenuItem>General Kenobi!</MenuItem>

      <MenuItem
        key={0}
        onClick={props.action}
        align="center"
        height="100%"
        borderRadius="0"
        p="5px 20px"
        color="#6f7287"
        bg="#fcc"
        _hover={{
          bg: "#f99",
          color: "#39364f",
        }}
      >
        Logout
      </MenuItem>
    </MenuList>
  </Menu>
);

function Nav2(props) {
  let history = useHistory();
  const { session, setSession } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const logoutAccount = () => {
    setSession(null);
    localStorage.removeItem("rememberSessionID");
    history.push({ pathname: "/Login" });
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
      zIndex="1"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"} py="12px">
          Not-EventBrite
        </Heading>
      </Flex>

      <Box
        display={{ sm: "block", md: "none" }}
        onClick={() => setShow(!show)}
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
        flexDirection={{ sm: "row", md: "row-reverse" }}
        flexGrow={1}
      >
        {session
          ? [
              <NavLogout
                key={0}
                action={logoutAccount}
                usr={session.username}
              />,
              <NavItems key={3} to="/Create">
                NEW event
              </NavItems>,
            ]
          : [
              <NavItems key={0} to="/Login" login={true}>
                Login
              </NavItems>,
              <NavItems key={2} to="/Register">
                Sign Up
              </NavItems>,
            ]}
        <NavItems key={1} to="/List">
          Browse Events
        </NavItems>
      </Box>
    </Flex>
  );
}

export default Nav2;
