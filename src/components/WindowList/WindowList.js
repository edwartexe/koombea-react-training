import { useState } from "react";
import styles from "./WindowList.module.css";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import CalendarYearly from "../Calendar/CalendarYearly";
import CalendarQuarterly from "../Calendar/CalendarQuarterly";
import CalendarMonthly from "../Calendar/CalendarMonthly";
import EventList from "./EventList/EventList";
import { server } from "../../libs/const";

import { useQuery, useMutation, queryCache } from "react-query";

import {AuthContext} from "../Context/Auth";
import { useContext } from 'react';

const fetchEvents = async () => {
  const res= await fetch(server+"events");
  return res.json();
}

const fetchFavs = async (key, userid) => {
  const res= await fetch(`${server}favoriteEvents?user_id=${encodeURIComponent(userid)}`);
  return res.json();
}

const createFav = async (newFav)=> {
  const res = await fetch(server+"favoriteEvents", {
        method: "POST",
        headers: { "Content-Type": "application/json",  },
        body: JSON.stringify({ ...newFav }),
      });
  const {favoriteEvent} = await res.json();
  return favoriteEvent;
}

const removeFav = async (favID)=> {
  const res = await fetch(`${server}favoriteEvents/${encodeURIComponent( favID.id )}`, {
        method: "DELETE"
      });
  const {deletion} = await res.json();
  return deletion;
}




function WindowList (props) {
  const {session} = useContext(AuthContext)

  //query hooks
  const {data: dataE,  status: statusE} = useQuery("events", fetchEvents);
  const {data: dataF,  status: statusF} = useQuery(["favs", session.id],fetchFavs);

  const [insertFav] = useMutation(createFav, {
    onSuccess: (insertedFav)=>{
      queryCache.refetchQueries("favs");
      /*queryCache.setQueryData("favs", (current) => [
        ...current,
        insertedFav,
      ]);*/
    }
  });
  
  const [deleteFav] = useMutation(removeFav, {
    onSuccess: ()=>{
      queryCache.refetchQueries("favs");
    }
  });

  //local states
  const [period,setPeriod] = useState("Yearly");
  const [yearLowerLimit] = useState(2018);
  const [yearAmmountLimit] = useState(5);
  const [date, setDate] = useState({
    year: 2020,
    selectAll: true,
    startDate: new Date("2020-1-2"),
    endDate: new Date("2022-12-31")
  });

  const eventListWithFav = () => {
    return dataE
    .map((e) => {
      e.date = new Date(e.date);
      e.isFav = !!dataF.find((f) => f.event_id === e.id);
      return e;
    })
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  }

  const setFavorite = (usrId, eventID) => {
    let gottenFav = dataF.find((f) => f.event_id === eventID && f.user_id === usrId);
    if(!!gottenFav){
      //it exits
      deleteFav({ id: gottenFav.id  });
    }else{
      //no result, create
      insertFav({ user_id: usrId, event_id: eventID  });
    }
  };

  const setStateSelectAll = (val) => {
    if (val) {
      let firstDay = new Date(yearLowerLimit, 0, 1);
      let lastDay = new Date(
        yearLowerLimit + yearAmmountLimit,
        11,
        31
      );
      setDate({ 
        ...date,
        selectAll: val,
        startDate: firstDay,
        endDate: lastDay 
      });
    }
  };
  
  const setStateYear = (val) => {
    const firstDay = new Date(val, date.startDate.getMonth(), 1);
    const lastDay = new Date(val, date.endDate.getMonth() + 1, 0);

    setDate({ 
      ...date,
      year:val,
      startDate: firstDay,
      endDate: lastDay 
    });
  };

  const setStateDateFromYear = (year) => {
    let firstDay = new Date(year, 0, 1);
    let lastDay = new Date(year, 11, 31);
    setDate({ 
      year: year ,
      startDate: firstDay ,
      endDate: lastDay ,
      selectAll: false 
    });
  };

  const setStateDateFromQuarter = (month1, month2) => {
    let firstDay = new Date(date.year, month1, 1);
    let lastDay = new Date(date.year, month2 + 1, 0);

    setDate({ 
      ...date,
      startDate: firstDay,
      endDate: lastDay,
      selectAll: false 
    });
  };

  const setStateDateFromMonth = (month) => {
    let lastDay = new Date(date.year, month + 1, 0);

    if (month <= date.startDate.getMonth() || month === date.endDate.getMonth() ) {
      let firstDay = new Date(date.year, month, 1);
      setDate({ 
        ...date,
        startDate: firstDay,
        endDate: lastDay,
        selectAll: false
      });
    } else {
      setDate({ 
        ...date,
        endDate: lastDay,
        selectAll: false
      });
    }
  };

  const calendarMode= (mode) => {
    switch (mode) {
      case "Yearly":
        return (
          <CalendarYearly
            year={date.year}
            month1={date.startDate.getMonth()}
            month2={date.endDate.getMonth()}
            yearLowest={yearLowerLimit}
            yearAmmount={yearAmmountLimit}
            selectAll={date.selectAll}
            setDates={setStateDateFromYear}
          />
        );
      case "Quarterly":
        return (
          <CalendarQuarterly
            selectAll={date.selectAll}
            year={date.year}
            month1={date.startDate.getMonth()}
            month2={date.endDate.getMonth()}
            setYear={setStateYear}
            setDates={setStateDateFromQuarter}
          />
        );
      default://case "Monthly":
        return (
          <CalendarMonthly
            selectAll={date.selectAll}
            year={date.year}
            month1={date.startDate.getMonth()}
            month2={date.endDate.getMonth()}
            setYear={setStateYear}
            setDates={setStateDateFromMonth}
          />
        );
    }
  };

    return (
      <div className={styles.Window}>
        <DateRangePicker
          setPeriod={setPeriod}
          selectAll={date.selectAll}
          setSelectAll={setStateSelectAll}
          selectAllenabled={period !== "Yearly"}
          dateStart={date.startDate}
          dateEnd={date.endDate}
        >
          {calendarMode(period)}
        </DateRangePicker>

        {(statusE === 'loading' || statusF=== 'loading') && (
         console.log("loading")
        )}
        
        {(statusE === 'error' || statusF=== 'error') && (
          console.log("error")
        )}
        {statusE === 'success' && statusF=== 'success' && (
          <EventList
            eventList={eventListWithFav()}
            dateStart={date.startDate}
            dateEnd={date.endDate}
            username={session.username}
            userID={session.id}
            setFav={setFavorite}
          />
        )}
      </div>
    );
  
}

export default WindowList;
