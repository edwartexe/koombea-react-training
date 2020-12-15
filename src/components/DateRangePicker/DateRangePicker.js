import styles from "./DateRangePicker.module.css";

const DateRangePicker = (props) => (
<div className={styles.wrapper}>
  <div className={styles.layout}>
    <h2>Select Timeframe</h2>
    <label htmlFor="period1">
      <input
        type="radio"
        id="period1"
        name="period"
        onClick={() => props.setPeriod("Yearly")}
      />
      Yearly
    </label>

    <label htmlFor="period2">
      <input
        type="radio"
        id="period2"
        name="period"
        onClick={() => props.setPeriod("Quarterly")}
      />
      Quarterly
    </label>

    <label htmlFor="period3">
      <input
        type="radio"
        id="period3"
        name="period"
        onClick={() => props.setPeriod("Monthly")}
      />
      Monthly
    </label>

    <label htmlFor="selectAll">
      <input
        type="checkbox"
        id="selectAll"
        name="selectAll"
        checked={props.selectAll}
        disabled={props.selectAllenabled ? "disabled" : ""}
        onChange={(e) => props.setSelectAll(e.target.checked)}
      />
      Select All
    </label>

    <div className={styles.dateDisplay}>
      <p className={styles.dateBlock}>
        {" "}
        {props.dateStart.getFullYear() +
          "-" +
          (props.dateStart.getMonth() + 1) +
          "-" +
          props.dateStart.getDate()}
      </p>
      <p className={styles.dateBlock}>
        {" "}
        {props.dateEnd.getFullYear() +
          "-" +
          (props.dateEnd.getMonth() + 1) +
          "-" +
          props.dateEnd.getDate()}
      </p>
    </div>

  </div>
  {props.children}
</div>
);

export default DateRangePicker;
