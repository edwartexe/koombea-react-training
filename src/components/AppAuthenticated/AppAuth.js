
import WindowList from "../WindowList/WindowList";
import WindowCreate from "../WindowCreateEvent/WindowCreateEvent";
import { Switch, Route } from "react-router-dom";


function AppAuth () {
  console.log("authorized");
  return (
        <Switch>
          <Route path="/Create">
            <WindowCreate />
          </Route>
          <Route path="/">
            <WindowList />
          </Route>
        </Switch>
  );
}

export default AppAuth;
