import "./login.css";
import Nav from "../components/nav";
import LoginForm from "../components/loginform";
import Footer from "../components/footer";

export default function Login() {
        return (
                <div className="App">
                        <Nav />
                        <LoginForm />
                        <Footer />
                </div>
        );
}
