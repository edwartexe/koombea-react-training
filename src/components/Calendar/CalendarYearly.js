import cx from "classnames";
import styles from "./styles.module.css";

const yearsArray = (start, ammount, onClick, year, selectAll) => {
  return Array(ammount)
    .fill()
    .map((_, index) => {
      return (
        <li
          key={index}
          className={cx(styles.year, {
            [styles.selected]: year === start + index || selectAll,
          })}
          onClick={() => onClick(start + index)}
        >
          {start + index}
        </li>
      );
    });
};

const CalendarYearly = (props) => (
  <div className={styles.calendar}>
    <div className={styles.topBar}>
      {" "}
      <p className={styles.topText}>Years</p>{" "}
    </div>
    <ul className={styles.calendarYearly}>
      {yearsArray(
        props.yearLowest,
        props.yearAmmount,
        props.setDates,
        props.year,
        props.selectAll
      )}
    </ul>
  </div>
);

export default CalendarYearly;
