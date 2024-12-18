import "./signin.css";
import Nav from "../components/nav";
import Footer from "../components/footer";
import SigninForm from "../components/signinform";

export default function Login() {
        return (
                <div className="App">
                        <Nav />
                        <SigninForm />
                        <Footer />
                </div>
        );
}
