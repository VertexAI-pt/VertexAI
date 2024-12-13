import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Chat from "./pages/chat";
import Error404 from "./pages/error404";

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
                                        <Route
                                                path="/chat"
                                                element={<Chat />}
                                        />

                                        <Route
                                                path="*"
                                                element={<Error404 />}
                                        />
                                </Routes>
                        </BrowserRouter>
                </div>
        );
}
