import "../styles/pages/log.css";
import Nav from "../components/nav.jsx";
import Login from "../components/login.jsx";
import Signin from "../components/signin.jsx";

export default function Log() {
        return (
                <div className="app">
                        <Nav />
                        <div className="auth-container">
                                <div className="auth-column signin-column">
                                        <Signin />
                                </div>
                                <div className="auth-column login-column">
                                        <Login />
                                </div>
                        </div>
                </div>
        );
}
