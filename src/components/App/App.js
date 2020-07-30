import React from 'react';
import {Switch, Route,useHistory} from "react-router-dom";

//logic----------------------------------------------------------------------------
import {loggedInUserState} from "../../modules/globalRecoilStates";
import RouteData from "../../modules/classes/RouteData";

//components-----------------------------------------------------------------------
import RegisterScreen from "../screens/registerScreen/registerScreen";
import LoginScreen from "../screens/loginScreen/loginScreen";
import DashboardScreen from "../screens/dashboardScreen/dashboardScreen";

import PopupMessage from "../general/popupMessage/popupMessage";
import {routes} from "../../modules/constants";
import {authApi} from "../../modules/api";
import UserData from "../../modules/classes/UserData";

//data----------------------------------------------------------------------------


function App() {
    const [loggedInUser,setLoggedInUser] = loggedInUserState()
    const history = useHistory()

    function LoginAfterRegister(email, password){
        (async ()=>{
            const {ok: loginOk, user} = await authApi.login(email, password)
            if (loginOk) {
                setLoggedInUser(new UserData(user))
                history.push(routes.DASHBOARD)
            }
        })()

    }

    const routesDataArr = [
        new RouteData(routes.REGISTER, <RegisterScreen onRegister={LoginAfterRegister}/>),
        new RouteData(routes.LOGIN, <LoginScreen onLogin={()=>history.push(routes.DASHBOARD)}/>),
        new RouteData(routes.DASHBOARD,<DashboardScreen/>),
        // new RouteData(routes.REGISTER,<RegisterScreen/>),
    ]

    function addRoute({path, component}) {
        return <Route key={path} exact path={path} render={()=>
                <>{component}</>
        }/>


    }

    return (<div>
            <Switch>
                {routesDataArr.map(addRoute)}
            </Switch>


            <PopupMessage/>

        </div>
    );
}

export default App;
