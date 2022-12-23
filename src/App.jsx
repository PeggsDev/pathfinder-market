import './pages/HomePage.scss';
import './App.css'

import NavBar from "./componenets/NavBar/NavBar";
import Router from "./Router";

import {
    BrowserRouter
} from 'react-router-dom'

export default function App() {

    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Router />
            </BrowserRouter>
        </div>
    );
}