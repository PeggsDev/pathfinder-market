import './pages/Home/HomePage.scss';
import './App.css'

import NavBar from "./componenets/NavBar/NavBar";
import Router from "./Router";

import {
    BrowserRouter
} from 'react-router-dom'

export const proficiencyEnum = {
    U: 0,
    T: 2,
    E: 4,
    M: 6,
    L: 8
}

export function rollDice(client, die, dieCount, theme) {
    client.current.roll(
        [
            {
                theme: theme,
                type: die,
            }
        ]);
}

export default function App() {

    return (
        <div>
            <BrowserRouter>
                <NavBar/>
                <Router/>
            </BrowserRouter>
        </div>
    );
}