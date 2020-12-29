import styles from "./EventElement.module.css";
import starF from "../../../../assets/star_f.png";
import starE from "../../../../assets/star_e.png";
import { monthName, weekName } from "../../../../libs/const";

import { Flex, Text, Button } from "@chakra-ui/react";

function EventElement(props) {
  return (
    <Flex
      key={props.elem.id}
      as="li"
      direction="column"
      flex="1"
      minWidth="300px"
      m="5px"
      p="15px"
      pos="relative"
      bg="#fff"
      borderRadius="3px"
      boxShadow="md"
      transition="box-shadow 0.3s ease-in-out"
      _hover={{
        boxShadow: "dark-lg",
      }}
    >
      <Text
        fontSize="14px"
        lineHeight="16px"
        fontWeight="700"
        color="#d1410c"
        mb="4px"
      >
        {weekName[props.elem.date.getDay()] +
          ", " +
          monthName[props.elem.date.getMonth()] +
          " " +
          props.elem.date.getDate() +
          ", " +
          props.elem.date.getFullYear()}
      </Text>

      <Text
        fontSize="18px"
        lineHeight="24px"
        letterSpacing="0.25"
        fontWeight="600"
        m="0"
      >
        {props.elem.name}
      </Text>

      <Text
        fontSize="14px"
        lineHeight="20px"
        fontWeight="400"
        m="0"
        color="#6f7287"
      >
        Host: {props.elem.hostname} <br />
        At: {props.elem.location}
        {props.elem.type === "Private" ? " (" + props.elem.type + ")" : null}
      </Text>

      {props.showFavButton ? (
        <Button
          p="0"
          borderRadius="100%"
          pos="absolute"
          top="15px"
          right="15px"
          bg="none"
          onClick={() => props.toggleFav(props.elem)}
        >
          {props.elem.isFav ? (
            <img src={starF} alt="is🌟favorite" className={styles.starFav} />
          ) : (
            <img src={starE} alt="not⭐favorite" className={styles.starFav} />
          )}
        </Button>
      ) : null}
    </Flex>
  );
}

export default EventElement;
