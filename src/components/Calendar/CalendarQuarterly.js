import cx from "classnames";
import styles from "./styles.module.css";
import { monthName } from "../../libs/const";

const QuarterElement = (props) => (
  <div
    className={cx(styles.quarter, {
      [styles.selected]: props.m1 <= 3 * props.i && 3 * props.i + 2 <= props.m2,
    })}
    onClick={() => props.action(3 * props.i, 3 * props.i + 2)}
  >
    <div className={styles.quarterNo}> Q{props.i + 1} </div>
    <div className={styles.month}>
      <p className={styles.monthText}>
        {monthName[3 * props.i]} 
      </p>
    </div>
    <div className={styles.month}>
      <p className={styles.monthText}>
        {monthName[3 * props.i + 1]} 
      </p>
    </div>
    <div className={styles.month}>
      <p className={styles.monthText}>
        {monthName[3 * props.i + 2]} 
      </p>
    </div>
  </div>
);

const quartArray = (onClick, month1, month2) => {
  return Array(4)
    .fill()
    .map((_, index) => {
      return (
        <QuarterElement 
        key={index + 1}
        i={index}
        m1={month1}
        m2={month2}
        action={onClick}
        />
      );
    });
};

const CalendarQuarterly = (props) => (
  <div className={styles.calendar}>
    <div className={styles.topBar}>
      <p className={styles.topText}>Year: {props.year}</p>
      <button
        className={styles.topButton}
        onClick={() => props.setYear(props.year - 1)}
      >
        prev
      </button>
      <button
        className={styles.topButton}
        onClick={() => props.setYear(props.year + 1)}
      >
        next
      </button>
    </div>

    <div className={styles.calendarQuarterly}>
      {quartArray(props.setDates, props.month1, props.month2)}
    </div>
  </div>
);

export default CalendarQuarterly;
