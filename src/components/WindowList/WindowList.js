import { Component } from "react";
import styles from "./WindowList.module.css";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import CalendarYearly from "../Calendar/CalendarYearly";
import CalendarQuarterly from "../Calendar/CalendarQuarterly";
import CalendarMonthly from "../Calendar/CalendarMonthly";
import EventList from "../EventList/EventList";

/*
const faker = require("faker");

const generatorEventList = (size = 3) => {
  return Array(size)
    .fill()
    .map((_, index) => {
      return {
        id: index + 1,
        name: faker.git.commitMessage(),
        location: faker.address.streetName(),
        hostname: faker.name.firstName(),
        type: faker.random.boolean() ? "Private" : "Public",
        date: faker.date.between("2018-01-01", "2022-01-05"),
      };
    })
    .sort((a, b) => (a.date > b.date ? 1 : -1));
};*/

class WindowList extends Component {
  state = {
    eventList: [],
    startDate: new Date("2018-1-2"),
    endDate: new Date("2022-12-31"),
    yearLowerLimit: 2018,
    yearAmmountLimit: 5,
    period: "Yearly",
    selectAll: true,
    year: 2020,
    month1: 0,
    month2: 11,
    loading: false,
  };

  async componentDidMount() {
    let eList = await fetch("http://localhost:5000/events").then((res) => res.json() );

    let favList = await fetch( `http://localhost:5000/favoriteEvents?user_id=${encodeURIComponent( this.props.userID )}`)
    .then((res) => res.json());

    eList
      .map((e) => {
        e.date = new Date(e.date);
        e.isFav = !!favList.find((f) => f.event_id === e.id);
        return e;
      })
      .sort((a, b) => (a.date > b.date ? 1 : -1));

    this.setState({ eventList: eList });
  }

  setFavorite = (usrId, eventID) => {
    fetch( `http://localhost:5000/favoriteEvents?user_id=${encodeURIComponent( usrId )}&event_id=${encodeURIComponent( eventID )}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length === 0) {
          //no result, create
          fetch("http://localhost:5000/favoriteEvents", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: usrId,
              event_id: eventID,
            }),
          }).then(
            //alert("favorito agregado")
            this.setStateEventFav(eventID, true)
          );
        } else {
          //result exists, delete
          fetch( `http://localhost:5000/favoriteEvents/${encodeURIComponent( result[0].id )}`,
            {
              method: "DELETE",
            }
          )
            .then((res) => res.json())
            .then((result) => {
              //alert("favorito eliminado")
              this.setStateEventFav(eventID, false);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
  };

  setStateEventFav = (eventID, val) => {
    let temp = this.state.eventList;
    temp.find((e) => e.id === eventID).isFav = val;
    this.setState({ eventList: temp });
  };

  setStatePeriod = (val) => {
    this.setState({ period: val });
  };

  setStateSelectAll = (val) => {
    this.setState({ selectAll: val });
    if (val) {
      let firstDay = new Date(this.state.yearLowerLimit, 0, 1);
      let lastDay = new Date(
        this.state.yearLowerLimit + this.state.yearAmmountLimit,
        11,
        31
      );
      this.setState({ startDate: firstDay });
      this.setState({ endDate: lastDay });
    }
  };

  setStateYear = (val) => {
    this.setState({ year: val });
    let firstDay = this.state.startDate;
    let lastDay = this.state.endDate;

    firstDay = new Date(val, firstDay.getMonth(), 1);
    lastDay = new Date(val, lastDay.getMonth() + 1, 0);

    this.setState({ startDate: firstDay });
    this.setState({ endDate: lastDay });
  };

  setStateDateFromYear = (year) => {
    let firstDay = new Date(year, 0, 1);
    let lastDay = new Date(year, 11, 31);
    this.setState({ year: year });
    this.setState({ month1: 0 });
    this.setState({ month2: 11 });
    this.setState({ startDate: firstDay });
    this.setState({ endDate: lastDay });
    this.setState({ selectAll: false });
  };

  setStateDateFromQuarter = (month1, month2) => {
    let firstDay = new Date(this.state.year, month1, 1);
    let lastDay = new Date(this.state.year, month2 + 1, 0);

    this.setState({ month1: month1 });
    this.setState({ month2: month2 });

    this.setState({ startDate: firstDay });
    this.setState({ endDate: lastDay });
    this.setState({ selectAll: false });
  };

  setStateDateFromMonth = (month) => {
    let firstDay = new Date(this.state.year, month, 1);
    let lastDay = new Date(this.state.year, month + 1, 0);
    if (month <= this.state.month1 || month === this.state.month2) {
      this.setState({ month1: month });
      this.setState({ month2: month });
      this.setState({ startDate: firstDay });
    } else {
      this.setState({ month2: month });
    }
    this.setState({ endDate: lastDay });
    this.setState({ selectAll: false });
  };

  selectedMode = (mode) => {
    switch (mode) {
      case "Yearly":
        return (
          <CalendarYearly
            year={this.state.year}
            month1={this.state.month1}
            month2={this.state.month2}
            yearLowest={this.state.yearLowerLimit}
            yearAmmount={this.state.yearAmmountLimit}
            selectAll={this.state.selectAll}
            setDates={this.setStateDateFromYear}
          />
        );
      case "Quarterly":
        return (
          <CalendarQuarterly
            selectAll={this.state.selectAll}
            year={this.state.year}
            month1={this.state.month1}
            month2={this.state.month2}
            setYear={this.setStateYear}
            setDates={this.setStateDateFromQuarter}
          />
        );
      case "Monthly":
        return (
          <CalendarMonthly
            selectAll={this.state.selectAll}
            year={this.state.year}
            month1={this.state.month1}
            month2={this.state.month2}
            setYear={this.setStateYear}
            setDates={this.setStateDateFromMonth}
          />
        );
    }
  };

  render() {
    return (
      <div className={styles.Window}>
        <DateRangePicker
          setPeriod={this.setStatePeriod}
          selectAll={this.state.selectAll}
          setSelectAll={this.setStateSelectAll}
          selectAllenabled={this.state.period !== "Yearly"}
          dateStart={this.state.startDate}
          dateEnd={this.state.endDate}
        >
          {this.selectedMode(this.state.period)}
        </DateRangePicker>
        <EventList
          eventList={this.state.eventList}
          dateStart={this.state.startDate}
          dateEnd={this.state.endDate}
          username={this.props.username}
          userID={this.props.userID}
          setFav={this.setFavorite}
        />
      </div>
    );
  }
}

export default WindowList;
