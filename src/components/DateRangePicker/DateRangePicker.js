import React, {Component} from 'react'
import styles from './DateRangePicker.module.css';


const DateRangePicker = (props)=> (
  <div className={styles.layout}>
    <h2>Period of Time</h2>
    
    <label for="period1"><input type="radio" id="period1" name="period" value="Yearly" onClick={()=>props.setPeriod("Yearly")}/> Yearly</label>
    <label for="period2"><input type="radio" id="period2" name="period" value="Quarterly" onClick={()=>props.setPeriod("Quarterly")}/> Quarterly </label>
    <label for="period3"><input type="radio" id="period3" name="period" value="Monthly" onClick={()=>props.setPeriod("Monthly")}/> Monthly</label>

    <label for="selectAll"><input type="checkbox" id="selectAll" name="selectAll" onChange={(e)=>props.setSelectAll(e.target.checked)} /> Select All</label>

    <div>
      <input type="date" id="startDate" name="startDate"/>
      <input type="date" id="endDate" name="endDate"/>
    </div>
  </div>
  );

export default DateRangePicker;