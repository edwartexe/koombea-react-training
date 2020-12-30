import * as React from 'react';
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";

import {ReactQueryDevtools} from "react-query-devtools";
import {  BrowserRouter, HashRouter} from "react-router-dom";


import {AuthContext} from "./Context/Auth";
import { useContext, Suspense } from 'react';

import Loading from "./components/AppLoading/AppLoading";
const AppAuth = React.lazy(() => import("./components/AppAuthenticated/AppAuth"));
const AppUnauth = React.lazy(() => import("./components/AppUnauthenticated/AppUnauth"));

function App () {
  const { session} = useContext(AuthContext);

  return (
    <Suspense fallback={<Loading />}>
      <HashRouter>
        <div className={styles.App}>
          <Nav />
          {session? 
            <AppAuth />
          : 
            <AppUnauth />
          }
        </div>
        <ReactQueryDevtools initialISOpen={false}/>
      </HashRouter>
    </Suspense>
  );
      
}
{ /*basename="/koombea-react-training"*/}
export default App;
