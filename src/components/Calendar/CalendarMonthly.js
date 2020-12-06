import React, {Component} from 'react'
import styles from './styles.module.css';


const CalendarMonthly = (props)=> (
  <div className={styles.calendar}>
    <div className={styles.topBar}>
      <p className={styles.topText}>Year: {props.year}</p>
      <button className={styles.topButton}>prev</button>
      <button className={styles.topButton}>next</button>
    </div>
    <div className={styles.calendarMonthly}>
      <div className={styles.month}>Jan</div>
      <div className={styles.month}>Feb</div>
      <div className={styles.month}>Mar</div>
      <div className={styles.month}>Apr</div>
      <div className={styles.month}>May</div>
      <div className={styles.month}>Jun</div>
      <div className={styles.month}>Jul</div>
      <div className={styles.month}>Ago</div>
      <div className={styles.month}>Sept</div>
      <div className={styles.month}>Oct</div>
      <div className={styles.month}>Nov</div>
      <div className={styles.month}>Dec</div>
    </div>
  </div>
);

export default CalendarMonthly;