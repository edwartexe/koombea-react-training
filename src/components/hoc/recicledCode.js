
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
  }
  const eventListWithFav = () => {
    let eList =  fetch("http://localhost:5000/events").then((res) => res.json() );
    let favList = fetch( `http://localhost:5000/favoriteEvents?user_id=${encodeURIComponent( props.userID )}`).then((res) => res.json());

    Promise.all([dataE, dataF])
    .then( (values)=> {
      values[0]
      .map((e) => {
        e.date = new Date(e.date);
        e.isFav = !!values[1].find((f) => f.event_id === e.id);
        return e;
      })
      .sort((a, b) => (a.date > b.date ? 1 : -1));

      setEventList(values[0]);

    });
  }

  useEffect(()=>{
    //componentDidMount
    loadAsyncData();
  },[]) 