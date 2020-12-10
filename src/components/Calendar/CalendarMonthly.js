import cx from "classnames";
import styles from "./styles.module.css";
import {monthName} from "../../libs/const";

const monthArray = (onClick, month1, month2) => {
  return(
    monthName.map((name, index)=>{
      return (
        <div 
          key={index} 
          className={ cx(styles.month, {[styles.selected]: (month1 <= index && index <= month2) }) } 
          onClick={() => onClick(index)}
        >
          {name}
        </div>);
    })
  );
}


const CalendarMonthly = (props)=> (
  <div className={styles.calendar}>
    <div className={styles.topBar}>
      <p className = {styles.topText}>Year: {props.year}</p>
      <button 
        className = {styles.topButton} 
        onClick = {() => props.setYear(props.year - 1)}
      >
        prev
      </button>
      <button 
        className = {styles.topButton} 
        onClick = {() => props.setYear(props.year + 1)}
      >
        next
      </button>
    </div>
    <div className={styles.calendarMonthly}>
      {monthArray(props.setDates, props.month1, props.month2)}
    </div>
  </div>
);

export default CalendarMonthly;