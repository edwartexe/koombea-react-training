import { Component } from "react";
import styles from "./EventList.module.css";
import EventElement from "./EventElement/EventElement";

class EventList extends Component {
  state = {
    eventName: "",
    hostName: "",
    eventType: "Any",
    favFilter: false
  };

  setStateGeneric = (type, val) => {
    this.setState({[type]: val});
  }

  eventArray = () => {
    let eventCards = this.props.eventList.map( 
      (elem) => {
      if (
        (
          this.props.dateStart <= elem.date &&
          elem.date <= this.props.dateEnd
        )
        && (
          elem.name
            .toLowerCase()
            .includes(this.state.eventName.toLowerCase()) &&
          elem.hostname
            .toLowerCase()
            .includes(this.state.hostName.toLowerCase())
        ) 
        && (
          this.state.eventType === "Any" ||
          elem.type === this.state.eventType
        ) 
        && (
          (this.state.favFilter && elem.isFav) || 
          !this.state.favFilter
        ) 
        ){
          return (
            <EventElement 
              elem={elem}
              userID={this.props.userID}
              setFav={this.props.setFav}
            />
          );
      }      
    });
    return eventCards;
  };





  render() {
    return (
      <div className={styles.eventList}>
        <div className={styles.inputRow}>
          <label className={styles.input} htmlFor="name">
            Event Name:
            <input
              type="text"
              id="name"
              onChange={(e) => this.setStateGeneric("eventName", e.target.value)}
            />
          </label>

          <label className={styles.input} htmlFor="hostname">
            Host Name:
            <input
              type="text"
              id="hostname"
              onChange={(e) => this.setStateGeneric("hostName", e.target.value)}
            />
          </label>

          <label className={styles.input} htmlFor="eventtype">
            Event Type:
            <select
              id="eventtype"
              onChange={(e) => this.setStateGeneric("eventType", e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </label>

          {this.props.userID!==0? 
            <label htmlFor="favFilter">
              Solo Favoritos:
              <input
                type="checkbox"
                id="favFilter"
                name="favFilter"
                checked={this.props.favFilter}
                onChange={(e) => this.setStateGeneric("favFilter", e.target.checked)}
              />
            </label>
          :
            null
          }
        </div>

        <ul className={styles.displayList}>{this.eventArray()}</ul>
      </div>
    );
  }
}

export default EventList;
