import React, {useEffect, useState} from 'react';
import {Switch, Route, useHistory, useLocation} from "react-router-dom";

//logic----------------------------------------------------------------------------
import {
    loggedInUserState,
    selectedMessagesArrayState,
    selectedNavBarItemState
} from "../../modules/globalRecoilStates";
import RouteData from "../../modules/classes/RouteData";
import {authApi, messagesApi} from "../../modules/api";
import {routes} from "../../modules/constants";


//components-----------------------------------------------------------------------
import RegisterScreen from "../screens/registerScreen";
import LoginScreen from "../screens/loginScreen";
import DashboardScreen from "../screens/dashboardScreen";
import PopupMessage from "../general/popupMessage";
import * as constants from "../../modules/constants";




function App() {
    const [loggedInUser] = loggedInUserState()
    const [, setSelectedMessagesArray] = selectedMessagesArrayState()
    const [, setSelectedNavBarItem] = selectedNavBarItemState()
    const [initialized, setInitialized] = useState(false)
    const history = useHistory()
    const location = useLocation()


    const routesDataArr = [
        new RouteData(routes.REGISTER, <RegisterScreen onRegister={onUserRegister}/>),
        new RouteData(routes.LOGIN, <LoginScreen onLogin={onUserLogin}/>),
        new RouteData(routes.DASHBOARD, <DashboardScreen/>),
    ]


    useEffect(() => {

        (async ()=>{
            const user = await loggedInUser.checkAndUpdateUserState();

            limitRoutesAccess();

            if (!initialized && user)
            {
                loadDashboardAfterLogin();
                setInitialized(true)
            }
        })()

    }, [location, loggedInUser]);


    function redirectIfLoggedIn(route) {

        if (loggedInUser.isLoggedIn())
            history.push(route)

    }
    function redirectIfLoggedOut(route) {

        if (!loggedInUser.isLoggedIn())
            history.push(route)

    }
    function limitRoutesAccess() {
        switch (location.pathname) {
            case routes.LOGIN:
            case routes.REGISTER:
                redirectIfLoggedIn(routes.DASHBOARD)
                break;
            default:
                redirectIfLoggedOut(routes.LOGIN)
        }
    }
    function onUserRegister(email,password) {
            authApi.login(email,password)
                .then(loggedInUser.checkAndUpdateUserState)
                .then(loadDashboardAfterLogin)
    }
    function onUserLogin() {
        loggedInUser.checkAndUpdateUserState()
            .then(loadDashboardAfterLogin)
    }
    function loadDashboardAfterLogin() {
        (async () => {

            history.push(routes.DASHBOARD)
            setSelectedNavBarItem(constants.navBarItemsNames.INBOX)
            const messagesRawArray = await messagesApi.getReceived()


            const messagesArrayClasses = messagesApi.rawArrayToClassesArray(messagesRawArray)
            setSelectedMessagesArray(messagesArrayClasses)

        })()
    }


    function renderRoute({path, onBeforeRender, component}) {
        onBeforeRender && onBeforeRender()
        return <Route key={path} exact path={path}>
            <>{component}</>
        </Route>
    }


    return (<div>
        <Switch>
            {routesDataArr.map(renderRoute)}
        </Switch>

        <PopupMessage/>

    </div>);
}

export default App;
