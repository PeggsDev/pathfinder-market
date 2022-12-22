import './pages/HomePage.scss';

import NavBar from "./componenets/NavBar/NavBar";
import Pages from "./pages/Pages";

import {
    BrowserRouter
} from 'react-router-dom'

export default function App() {

    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Pages />
            </BrowserRouter>
        </div>
    );
}