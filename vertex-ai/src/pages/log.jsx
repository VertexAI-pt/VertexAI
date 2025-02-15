import "../styles/pages/log.css";
import Nav from "../components/nav.jsx";
import Login from "../components/login.jsx";
import Signin from "../components/signin.jsx";

export default function Log() {
        return (
                <div className="App">
                        <Nav />
                        <div className="Auth-Container">
                                <div className="Auth-Column">
                                        <Signin />
                                </div>
                                <div className="Auth-Column">
                                        <Login />
                                </div>
                        </div>
                </div>
        );
}
