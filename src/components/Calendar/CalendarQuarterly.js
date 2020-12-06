import React, {Component} from 'react'
import styles from './styles.module.css';


const CalendarQuarterly = (props)=> (
  <div className={styles.calendar}>
    <div className={styles.topBar}>
      <p className={styles.topText}>Year: {props.year}</p>
      <button className={styles.topButton}>prev</button>
      <button className={styles.topButton}>next</button>
    </div>
    <div className={styles.calendarQuarterly}>
      <div className={styles.quarter}>
        <div className={styles.quarterNo}>Q1</div>
        <div className={styles.month}>Jan</div>
        <div className={styles.month}>Feb</div>
        <div className={styles.month}>Mar</div>
      </div>
      <div className={styles.quarter}>
        <div className={styles.quarterNo}>Q2</div>
        <div className={styles.month}>Apr</div>
        <div className={styles.month}>May</div>
        <div className={styles.month}>Jun</div>
      </div>
      <div className={styles.quarter}>
        <div className={styles.quarterNo}>Q3</div>
        <div className={styles.month}>Jul</div>
        <div className={styles.month}>Ago</div>
        <div className={styles.month}>Sept</div>
      </div>
      <div className={styles.quarter}>
        <div className={styles.quarterNo}>Q4</div>
        <div className={styles.month}>Oct</div>
        <div className={styles.month}>Nov</div>
        <div className={styles.month}>Dec</div>
      </div>
    </div>
  </div>
);

export default CalendarQuarterly;