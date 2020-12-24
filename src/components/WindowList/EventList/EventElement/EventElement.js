import styles from "./EventElement.module.css";
import starF from "../../../../assets/star_f.png";
import starE from "../../../../assets/star_e.png";

function EventElement (props) { 

  return (
  <li key={props.elem.id} className={styles.event}>
    <p className={styles.eventTitle}> {props.elem.name} </p>
    <p className={styles.eventHost}> Set by: {props.elem.hostname} </p>
    <p className={styles.eventLoc}>
      {" "}
      {props.elem.location + " (" + props.elem.type + ")"}{" "}
    </p>
    <p className={styles.eventDate}>
      {" "}
      {props.elem.date.getFullYear() +
        "-" +
        props.elem.date.getMonth() +
        "-" +
        props.elem.date.getDate()}
    </p>
    {props.showFavButton? 
      <button 
      className={styles.btnFav}
      onClick={()=>props.toggleFav(props.elem)}
      >
        {props.elem.isFav? 
          <img src={starF} alt="is🌟favorite" className={styles.starFav} />
        : 
          <img src={starE} alt="not⭐favorite" className={styles.starFav} />
        }
      </button>
    :
      null
    }
    
  </li>
);

  }

export default EventElement;