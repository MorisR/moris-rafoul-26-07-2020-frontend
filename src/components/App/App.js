import React, {useEffect} from 'react';
import {Switch, Route, useHistory, useLocation} from "react-router-dom";

//logic----------------------------------------------------------------------------
import {loggedInUserState} from "../../modules/globalRecoilStates";
import RouteData from "../../modules/classes/RouteData";

//components-----------------------------------------------------------------------
import RegisterScreen from "../screens/registerScreen";
import LoginScreen from "../screens/loginScreen";
import DashboardScreen from "../screens/dashboardScreen";

import PopupMessage from "../general/popupMessage";
import {routes} from "../../modules/constants";
import {authApi} from "../../modules/api";
import UserData from "../../modules/classes/UserData";

//data----------------------------------------------------------------------------


function App() {
    const [loggedInUser, setLoggedInUser] = loggedInUserState()
    const history = useHistory()
    const location = useLocation()


    const routesDataArr = [
        new RouteData(routes.REGISTER, <RegisterScreen onRegister={LoginAfterRegister}/>),
        new RouteData(routes.LOGIN, <LoginScreen onLogin={()=>history.push(routes.DASHBOARD)}/>),
        new RouteData(routes.DASHBOARD,<DashboardScreen/>),
    ]


    function redirectIfLoggedIn(route) {

        if (loggedInUser.isLoggedIn())
            history.push(route)

    }
    function redirectIfLoggedOut(route) {

        if (!loggedInUser.isLoggedIn())
            history.push(route)

    }
    function LoginAfterRegister(email, password) {
        (async () => {
            const {ok: loginOk, user} = await authApi.login(email, password)
            if (loginOk) {
                setLoggedInUser(new UserData(user))
                history.push(routes.DASHBOARD)
            }
        })()

    }
    function addRoute({path, onBeforeRender, component}) {
        onBeforeRender && onBeforeRender()
        return <Route key={path} exact path={path}>
            <>{component}</>
        </Route>
    }
    function  limitRoutes(){
        switch (location.pathname) {
            case routes.LOGIN:
            case routes.REGISTER:
                redirectIfLoggedIn(routes.DASHBOARD)
                break;
            default:
                redirectIfLoggedOut(routes.LOGIN)
        }
    }


    useEffect(() => {
        loggedInUser.checkAndUpdateUserState()
        limitRoutes()

    }, [location,loggedInUser]);

    return (<div>
            <Switch>
                {routesDataArr.map(addRoute)}
            </Switch>

            <PopupMessage/>

        </div>
    );
}

export default App;
