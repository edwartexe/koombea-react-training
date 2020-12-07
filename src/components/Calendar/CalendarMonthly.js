import React from 'react';
import cx from 'classnames';
import styles from './styles.module.css';

const monthArray = (onClick,month1,month2) => {
  const monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Agu","Sept","Oct","Nov","Dec"];
  let months = Array(12).fill().map((_,index)=>{
    return (<div key={"month"+index} className={ cx(styles.month, {[styles.selected]: (month1<=index && index<=month2) }) } onClick={()=>onClick(index)}>{monthName[index]}</div>);
  });
  return months;
}


const CalendarMonthly = (props)=> (
  <div className={styles.calendar}>
    <div className={styles.topBar}>
      <p className={styles.topText}>Year: {props.year}</p>
      <button className={styles.topButton} onClick={()=>props.setYear(props.year-1)}>prev</button>
      <button className={styles.topButton} onClick={()=>props.setYear(props.year+1)}>next</button>
    </div>
    <div className={styles.calendarMonthly}>
      {monthArray(props.setDates,props.month1,props.month2)}
    </div>
  </div>
);

export default CalendarMonthly;