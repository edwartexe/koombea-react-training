import React from 'react';
import cx from 'classnames';
import styles from './styles.module.css';



const yearsArray = (start, ammount, onClick,year,selectAll) => {
  let years = Array(ammount).fill().map((_,index)=>{
    return (<li key={"year"+index} className={ cx(styles.year, {[styles.selected]: (year===start+index || selectAll) }) } onClick={()=>onClick(start+index)}>{start+index}</li>);
  });
  return years;
}

//cx(styles.year, {[styles.selected]: (year<=start+index || selectAll) })

const CalendarYearly = (props)=> (
  <div className={styles.calendar}>
    <div className={styles.topBar}> <p className={styles.topText}>Years</p> </div>
    <ul className={styles.calendarYearly}>
      {yearsArray(props.yearLowest,props.yearAmmount,props.setDates,props.year,props.selectAll)}
    </ul>
  </div>
);

export default CalendarYearly;