import cx from "classnames";
import styles from "./styles.module.css";

const YearElement = (props) => (
  <li
    className={cx(styles.year, {
      [styles.selected]: props.selectedYear === props.myYear || props.selectAll,
    })}
    onClick={() => props.action(props.myYear)}
  >
    {props.myYear}
  </li>
);

const yearsArray = (start, ammount, onClick, year, selectAll) => {
  return Array(ammount)
    .fill()
    .map((_, index) => {
      return (
        <YearElement
          key={index}
          i={index}
          selectedYear={year}
          myYear={start + index}
          selectAll={selectAll}
          action={onClick}
        />
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
