import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
//routes
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import PostJob from './routes/PostJob';
import DevForm from "./routes/DevForm";

const FREELANCE = "freelance"
const HIRE = "hire"

const RedirectSignin = ({ comp, userType }) => {
  let token = localStorage.getItem('token');
  let savedUserType = localStorage.getItem('userType');
  let history = useHistory();
  if (token && savedUserType && (savedUserType === userType)) {
    return comp
  }
  else {
    history.push("/signin");
    return null
  }
}

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
          {<RedirectSignin comp={<PostJob />} userType={HIRE} />}
        </Route>
        <Route exact path="/devform">
          {<RedirectSignin comp={<DevForm />} userType={FREELANCE} />}
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
