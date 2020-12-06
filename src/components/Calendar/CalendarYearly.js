import React, {Component} from 'react'
import styles from './styles.module.css';

const yearsArray = (start, ammount) => {
  let years = Array(ammount).fill().map((_,index)=>{
    return (<li key={"year"+index} className={styles.year}>{start+index}</li>);
  });
  return years;
}

const CalendarYearly = (props)=> (
  <div className={styles.calendar}>
    <div className={styles.topBar}> <p className={styles.topText}>Years</p> </div>
    <ul className={styles.calendarYearly}>
      {yearsArray(2020,10)}
    </ul>
  </div>
);

export default CalendarYearly;