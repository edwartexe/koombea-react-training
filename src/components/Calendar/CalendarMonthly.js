import cx from "classnames";
import styles from "./styles.module.css";
import { monthName } from "../../libs/const";

const MonthElement = (props) => (
  <div
    className={cx(styles.month, {
      [styles.selected]: props.m1 <= props.i && props.i <= props.m2,
    })}
    onClick={() => props.action(props.i)}
  >
    <p className={styles.monthText}>{props.name}</p>
  </div>
);

const monthArray = (onClick, month1, month2) => {
  return monthName.map((name, index) => {
    return (
      <MonthElement
        key={index}
        i={index}
        name={name}
        m1={month1}
        m2={month2}
        action={onClick}
      />
    );
  });
};

const CalendarMonthly = (props) => (
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
    <div className={styles.calendarMonthly}>
      {monthArray(props.setDates, props.month1, props.month2)}
    </div>
  </div>
);

export default CalendarMonthly;
