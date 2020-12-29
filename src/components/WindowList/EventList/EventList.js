import { useState } from "react";
import styles from "./EventList.module.css";
import EventElement from "./EventElement/EventElement";
import { server } from "../../../libs/const";

import {useMutation } from "react-query";

import {AuthContext} from "../../../Context/Auth";
import { useContext } from 'react';

import axios from 'axios';

import searchIcon from "../../../assets/search.png";

import { Box, Flex, Input} from "@chakra-ui/react";


const createFav = async (newFav)=> {
  const res = await axios
  .post(
    server+"favoriteEvents", 
    {...newFav});
  let responseOK = res && res.status === 200 && res.statusText === 'OK';
  if (responseOK) {
    return res.data;
  }
}

const removeFav = async (favID)=> {
  const res = await axios
  .delete( `${server}favoriteEvents/${ favID.id }`);
  let responseOK = res && res.status === 200 && res.statusText === 'OK';
  if (responseOK) {
    return res.data;
  }
}



function EventList (props) {
  const {session} = useContext(AuthContext);

  const [searchTag,setSearch] = useState("");
  const [myList, setMyList] = useState(props.eventList);
  const [createFavMutation] = useMutation(createFav);
  const [removeFavMutation] = useMutation(removeFav);

  const toggleFav = (event) => {
    let temp = myList
    
    if(event.isFav){
      temp.find( e => e.id === event.id ).isFav = false;
      setMyList(temp);

      axios
      .get(`${server}favoriteEvents?user_id=${session.id}&event_id=${event.id}`)
      .then(function (res) {
        if (res.data.length > 0) {

          removeFavMutation({ id: res.data[0].id }, {
            onSuccess: ()=>{
              props.refetchFav();
              console.log("deleted success");
            },
            onError: ()=>{
              console.log("deleted error");
    
              temp.find( e => e.id === event.id ).isFav = true;
              setMyList(temp);
            }
          });
          
        } else {
          console.log("nothing to remove");
        }
      }).catch(
        console.log
      );
      
    }else{
      temp.find( e => e.id === event.id ).isFav = true;
      setMyList(temp);

      createFavMutation({ user_id: session.id, event_id: event.id}, {
        onSuccess: ()=>{
          props.refetchFav();
          console.log("insert success");
        },
        onError: ()=>{
          console.log("insert error");
          
          temp.find( e => e.id === event.id ).isFav = false;
          setMyList(temp);
        }
      });
    }
  }

  const eventArray = () => {
    let searchTags = searchTag.split(" ").map(function(v) {
      return v.toLowerCase();
    });
    searchTags = searchTags.filter(function (value, index, thisArray) {
      return thisArray.indexOf(value) === index && !!value;
    });
    console.log(searchTags);
    let eventCards = myList.map( 
      (elem) => {
      if (
        (
          props.dateStart <= elem.date &&
          elem.date <= props.dateEnd
        )
        && (
          searchTags.reduce((acum, current)=>{
            return acum 
            && (
              elem.name.toLowerCase().includes(current) ||
              elem.hostname.toLowerCase().includes(current) ||
              elem.type.toLowerCase().includes(current) ||
              current.replaceAll("\\s+", "")===""
            );
          }, true)
        )
        && (
          (props.favFilter && elem.isFav) || 
          !props.favFilter
        ) 
        ){
          return (
            <EventElement 
              key={elem.id}
              elem={elem}
              showFavButton={!!session}
              userID={session? session.id:0}
              toggleFav={toggleFav}
            />
          );
      }else{
        return null;
      }    
    });
    return eventCards;
  };


  return (
    <div className={styles.eventList}>

      <Flex
        as="ul"
        direction="column"
        p="0"
        h="0"
        flex="1 1 auto"
        overflowY="auto"
      >
        <Box
          p="5px 15px"
          w={{sm:"auto", lg:"760px"}} 
        >
          <Flex>
            <img src={searchIcon} alt="search" className={styles.searchIcon} />
            
            <Input
              placeholder="Search Anything"
              fontSize="14px"
              fontWeight="400"
              flex="1 1 0%"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Flex>
          
          {eventArray()}
        </Box>
      </Flex>
    </div>
  );
  
}

export default EventList;
