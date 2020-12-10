import { Component } from "react";
import styles from "./EventList.module.css";

class EventList extends Component {
  state = {
    eventName: "",
    hostName: "",
    eventType: "Any",
  };

  setStateName = (val) => {
    this.setState({ eventName: val });
  };
  setStateHost = (val) => {
    this.setState({ hostName: val });
  };
  setStateType = (val) => {
    this.setState({ eventType: val });
  };

  eventArray = () => {
    let eventList = this.props.eventList;
    let date1 = this.props.dateStart;
    let date2 = this.props.dateEnd;

    let eventCards = eventList.map((elem, index) => {
      if (date1 <= elem.date && elem.date <= date2) {
        if (
          elem.name
            .toLowerCase()
            .includes(this.state.eventName.toLowerCase()) &&
          elem.hostname
            .toLowerCase()
            .includes(this.state.hostName.toLowerCase())
        ) {
          if (
            this.state.eventType === "Any" ||
            elem.type === this.state.eventType
          ) {
            return (
              <li key={index} className={styles.event}>
                <p className={styles.eventTitle}> {elem.name} </p>
                <p className={styles.eventHost}> Set by: {elem.hostname} </p>
                <p className={styles.eventLoc}>
                  {" "}
                  {elem.location + " (" + elem.type + ")"}{" "}
                </p>
                <p className={styles.eventDate}>
                  {" "}
                  {elem.date.getFullYear() +
                    "-" +
                    elem.date.getMonth() +
                    "-" +
                    elem.date.getDate()}
                </p>
              </li>
            );
          }
        }
      }
    });
    return eventCards;
  };

  render() {
    return (
      <div className={styles.eventList}>
        <div className={styles.inputRow}>
          <label className={styles.input} for="name">
            Event Name:
            <input
              type="text"
              id="name"
              onChange={(e) => this.setStateName(e.target.value)}
            />
          </label>

          <label className={styles.input} for="hostname">
            Host Name:
            <input
              type="text"
              id="hostname"
              onChange={(e) => this.setStateHost(e.target.value)}
            />
          </label>

          <label className={styles.input} for="eventtype">
            Event Type:
            <select
              id="eventtype"
              onChange={(e) => this.setStateType(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </label>
        </div>

        <ul className={styles.displayList}>{this.eventArray()}</ul>
      </div>
    );
  }
}

export default EventList;
