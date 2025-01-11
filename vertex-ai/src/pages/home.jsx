import "../styles/pages/home.css";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
        return (
                <div className="App">
                        <Nav />
                        <Header />
                        <Footer />
                </div>
        );
}
