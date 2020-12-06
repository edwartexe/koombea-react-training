import React, { Component } from 'react';
import styles from './App.module.css';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';
import CalendarYearly from './components/Calendar/CalendarYearly';
import CalendarQuarterly from './components/Calendar/CalendarQuarterly';
import CalendarMonthly from './components/Calendar/CalendarMonthly';
import EventList from './components/EventList/EventList';
const faker = require('faker');

const generatorEventList = (size=3) => {
  const eventList = Array(size).fill().map((_,index)=>{
    return (
      {id:index+1, name:faker.name.jobType(), location: faker.address.streetName(), hostname:faker.name.firstName(), type:faker.random.boolean()?"private":"public", date:faker.date.recent()}
    );
  });
  return eventList;
}

class App extends Component {
  state ={
    eventList: generatorEventList(4),
    startDate: "1/1/2020",
    endDate: "31/12/2020",
    period:"Yearly",
    selectAll:false,
    year:"2020"
  };

  setStatePeriod = (val) => {
    this.setState( { period: val } );
  }

  setStateSelectAll = (val)=>{
    this.setState({selectAll : val});
  }

  selectedMode=(mode)=>{
    switch(mode){
      case "Yearly":
        return <CalendarYearly selectAll={this.state.selectAll}/>;
      case "Quarterly":
        return <CalendarQuarterly selectAll={this.state.selectAll}  year={this.state.year}/>;
      case "Monthly": 
        return <CalendarMonthly selectAll={this.state.selectAll}  year={this.state.year}/>;
      }
    }

  render(){
    console.log(this.state.eventList[0]);

    return (
      <div className={styles.App}>
        
        <DateRangePicker 
        setPeriod={this.setStatePeriod}
        setSelectAll={this.setStateSelectAll}
        />
        {this.selectedMode(this.state.period)}
       
        {/*<EventList />*/}
      </div>
    );
  }
}

export default App;
