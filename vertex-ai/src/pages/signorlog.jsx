import "./signorlog.css";
import Nav from "../components/nav.jsx";

export default function Signorlog() {
        return (
                <div className="App">
                        <Nav />
                        <div className="Sign-Or-Log">
                                <div className="Sign-In">
                                        <a
                                                className="SignIn-Button"
                                                href="/signin"
                                        >
                                                Create an Account
                                        </a>
                                </div>
                                <div className="Log-In">
                                        <a
                                                className="LogIn-Button"
                                                href="/signup"
                                        >
                                                Log-In
                                        </a>
                                </div>
                        </div>
                </div>
        );
}
