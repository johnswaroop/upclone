import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//routes
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import PostJob from './routes/PostJob';

let token = localStorage.getItem('token');

function Router() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Signup />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/postjob">
          {token ? <PostJob /> : <Signin />}
        </Route>
        {/* <Route exact path="/postjobReview">
          <PostJobReview />
        </Route> */}
        <Route exact path="/trainer">

        </Route>
        <Route exact path="/job">

        </Route>
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default Router;
