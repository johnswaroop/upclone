import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Signup from "./routes/Signup";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Signup />
        </Route>
        <Route exact path="/trainer">
          
        </Route>
        <Route exact path="/job">
     
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
