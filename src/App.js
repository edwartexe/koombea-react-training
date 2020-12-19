import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import WindowList from "./components/WindowList/WindowList";
import WindowCreate from "./components/WindowCreateEvent/WindowCreateEvent";
import WindowLogin from "./components/WindowLogIn/WindowLogin";
import WindowRegister from "./components/WindowRegister/WindowRegister";

import MyProvider from "./components/Context/Auth";

import {ReactQueryDevtools} from "react-query-devtools";

import {  BrowserRouter, Switch, Route } from "react-router-dom";


function App () {

  return (
    <MyProvider>
      <BrowserRouter>
        <div className={styles.App}>
          <Nav />
          <Switch>
              <Route path="/Create">
                <WindowCreate />
              </Route>
              <Route path="/Register">
                <WindowRegister  />
              </Route>
              <Route path="/Login">
                <WindowLogin />
              </Route>
              <Route path="/">
                <WindowList />
              </Route>
            </Switch>
          </div>

          <ReactQueryDevtools initialISOpen={false}/>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
