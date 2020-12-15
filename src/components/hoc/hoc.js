import { Component } from "react";


function CheckUsername(usr) {
  const data = useQuery({ name: usr }, () =>
    fetch(`http://localhost:5000/users?name=${encodeURIComponent(usr)}`).then(res =>
      res.json()
    )
  )

  console.log(data)

  return false;
}

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useMyHook();
    return <Component {...props} myHookValue={myHookValue} />;
  }
}

class MyDiv extends Component {
  render(){
    return <div>{this.props.myHookValue}</div>;
  }
}

export default withMyHook(MyDiv)