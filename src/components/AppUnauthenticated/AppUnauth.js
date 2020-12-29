import WindowList from "../WindowList/WindowList";
import WindowLogin from "../WindowLogIn/WindowLogin";
import WindowRegister from "../WindowRegister/WindowRegister";
import { Switch, Route } from "react-router-dom";


function AppUnauth () {
  console.log("unauthorized");
  return (
        <Switch>
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
  );
}

export default AppUnauth;
