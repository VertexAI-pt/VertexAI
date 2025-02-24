import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Chat from "./pages/chat";
import Error404 from "./pages/error404";
import Log from "./pages/log";
import About from "./pages/about";
import Products from "./pages/products";
import Contact from "./pages/contact";
import Terms from "./pages/terms";

export default function App() {
        return (
                <div>
                        <BrowserRouter>
                                <Routes>
                                        <Route index element={<Home />} />

                                        <Route
                                                path="/home"
                                                element={<Home />}
                                        />
                                        <Route path="/VEX" element={<Chat />} />

                                        <Route
                                                path="/about-us"
                                                element={<About />}
                                        />

                                        <Route
                                                path="/products"
                                                element={<Products />}
                                        />

                                        <Route
                                                path="/contact"
                                                element={<Contact />}
                                        />

                                        <Route
                                                path="/terms-of-service"
                                                element={<Terms />}
                                        />

                                        <Route
                                                path="*"
                                                element={<Error404 />}
                                        />

                                        <Route path="/log" element={<Log />} />
                                </Routes>
                        </BrowserRouter>
                </div>
        );
}
