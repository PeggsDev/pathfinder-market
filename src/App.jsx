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

export const proficiencyColourEnum = {
    'U': '#1880b7',
    'T': '#25a815',
    'E': '#d7bf59',
    'M': '#FE9920',
    'L': '#FA7921'
}
// export const pathfinderActionIconsEnum = {
//     0: <FreeActionIcon />
// }

export function rollDice(client, die, dieCount, theme) {
    const rollArray = []
    for (let i = 0; i < dieCount; i++) {
        rollArray.push(
            {
                theme: theme,
                type: die,
            }
        )
    }
    client.current.roll(rollArray);
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