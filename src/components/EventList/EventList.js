import React, { Component } from 'react';
import styles from './EventList.modules.css';

class EventList extends Component {
  state ={ };

  render(){
    return (
      <div className={styles.eventList}>
        <div className={styles.inputs}>
          <label for="name">Event Name: <input type="text" id="name" name="name" /></label>
          <label for="hostname">Host Name: <input type="text" id="hostname" name="hostname" /></label>
          <label for="eventtype">Event Type: <input type="text" id="eventtype" name="eventtype" /></label>
          <button>Date</button>
        </div>
        <div className={styles.displayList}>

        </div>
      </div>
    );
  }
}

export default EventList;
