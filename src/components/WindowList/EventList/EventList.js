import { useState } from "react";
import styles from "./EventList.module.css";
import EventElement from "./EventElement/EventElement";

function EventList (props) {

  const [eventName,setName] = useState("");
  const [hostName,setHost] = useState("");
  const [eventType,setType] = useState("Any");
  const [favFilter,setFavFilter] = useState(false);

  /*const setStateGeneric = (type, val) => {
    setState({[type]: val});
  }*/

  const eventArray = () => {
    let eventCards = props.eventList.map( 
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
              userID={props.userID}
              setFav={props.setFav}
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

        {props.userID!==0? 
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
