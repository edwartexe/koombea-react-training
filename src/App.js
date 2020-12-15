import { Component } from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import WindowList from "./components/WindowList/WindowList";
import WindowCreate from "./components/WindowCreateEvent/WindowCreateEvent";
import WindowLogin from "./components/WindowLogIn/WindowLogin";
import WindowRegister from "./components/WindowRegister/WindowRegister";
import { useQuery } from "react-query";

class App extends Component {
  state = {
    username: "",
    userID: 0,
    window: "",
    responceMsg: "",
  };

  setAccount = (usr, pas) => {
    this.setState({ loading: true }, () => {
      fetch(
        `http://localhost:5000/users?username=${encodeURIComponent(
          usr
        )}&pass=${encodeURIComponent(pas)}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.length > 0) {
            return this.setState({
              username: result[0].username,
              userID: result[0].id,
              window: "List",
              responceMsg: "",
            });
          } else {
            return this.setState({
              responceMsg: "Incorrect Username or Password",
            });
          }
        })
        .catch(console.log);
    });
  };

  logoutAccount = () => {
    this.setState({ username: "", userID: 0, window: "Login" });
  };

  setStateWindow = (val) => {
    this.setState({ window: val });
  };

  selectedWindow = (window) => {
    switch (window) {
      case "List":
        return (
          <WindowList
            username={this.state.username}
            userID={this.state.userID}
          />
        );
      case "Create":
        return (
          <WindowCreate
            username={this.state.username}
            regMsg={this.state.responceMsg}
            setWindow={this.setStateWindow}
          />
        );
      case "Register":
        return (
          <WindowRegister
            username={this.state.username}
            regMsg={this.state.responceMsg}
            setWindow={this.setStateWindow}
          />
        );
      default:
        return (
          <WindowLogin
            username={this.state.username}
            login={this.setAccount}
            loginMsg={this.state.responceMsg}
          />
        );
    }
  };

  render() {
    return (
      <div className={styles.App}>
        <Nav
          username={this.state.username}
          setWindow={this.setStateWindow}
          logout={this.logoutAccount}
        />
        {this.selectedWindow(this.state.window)}
      </div>
    );
  }
}

export default App;
