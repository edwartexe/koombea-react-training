import cx from "classnames";
import styles from "./styles.module.css";
import { monthName } from "../../libs/const";

const quartArray = (onClick, month1, month2) => {
  return Array(4)
    .fill()
    .map((_, index) => {
      return (
        <div
          key={"quart" + index + 1}
          className={cx(styles.quarter, {
            [styles.selected]: month1 <= 3 * index && 3 * index + 2 <= month2,
          })}
          onClick={() => onClick(3 * index, 3 * index + 2)}
        >
          <div className={styles.quarterNo}> Q{index + 1} </div>
          <div className={styles.month}>
            <p className={styles.monthText}>
              {monthName[3 * index]} 
            </p>
          </div>
          <div className={styles.month}>
            <p className={styles.monthText}>
              {monthName[3 * index + 1]} 
            </p>
          </div>
          <div className={styles.month}>
            <p className={styles.monthText}>
              {monthName[3 * index + 2]} 
            </p>
          </div>
        </div>
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
