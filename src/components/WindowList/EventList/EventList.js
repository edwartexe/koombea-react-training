import { useState } from "react";
import styles from "./EventList.module.css";
import EventElement from "./EventElement/EventElement";
import { server } from "../../../libs/const";

import {useMutation } from "react-query";

import {AuthContext} from "../../../Context/Auth";
import { useContext } from 'react';

import axios from 'axios';

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

  const [eventName,setName] = useState("");
  const [hostName,setHost] = useState("");
  const [eventType,setType] = useState("Any");
  const [favFilter,setFavFilter] = useState(false);
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
    let eventCards = myList.map( 
      (elem) => {
      if (
        (
          props.dateStart <= elem.date &&
          elem.date <= props.dateEnd
        )
        && (
          elem.name
            .toLowerCase()
            .includes(eventName.toLowerCase()) &&
          elem.hostname
            .toLowerCase()
            .includes(hostName.toLowerCase())
        ) 
        && (
          eventType === "Any" ||
          elem.type === eventType
        ) 
        && (
          (favFilter && elem.isFav) || 
          !favFilter
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
      <div className={styles.inputRow}>
        <label className={styles.input} htmlFor="name">
          Event Name:
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className={styles.input} htmlFor="hostname">
          Host Name:
          <input
            type="text"
            id="hostname"
            onChange={(e) => setHost(e.target.value)}
          />
        </label>

        <label className={styles.input} htmlFor="eventtype">
          Event Type:
          <select
            id="eventtype"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </label>

        {session? 
          <label htmlFor="favFilter">
            Solo Favoritos:
            <input
              type="checkbox"
              id="favFilter"
              name="favFilter"
              checked={props.favFilter}
              onChange={(e) => setFavFilter( e.target.checked)}
            />
          </label>
        :
          null
        }
      </div>

      <ul className={styles.displayList}>{eventArray()}</ul>
    </div>
  );
  
}

export default EventList;
