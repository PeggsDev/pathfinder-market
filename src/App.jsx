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
    'U': '#939292',
    'T': '#4e62fc',
    'E': '#b01dff',
    'M': '#fcbc3a',
    'L': '#ff2f2f'
}

export const proficiencies = [
    {value: 'U', label: 'Untrained'},
    {value: 'T', label: 'Trained'},
    {value: 'E', label: 'Expert'},
    {value: 'M', label: 'Master'},
    {value: 'L', label: 'Legendary'}
]

export const abilities = [
    {value: 'strength', label: 'Strength'},
    {value: 'dexterity', label: 'Dexterity'},
    {value: 'constitution', label: 'Constitution'},
    {value: 'intelligence', label: 'Intelligence'},
    {value: 'wisdom', label: 'Wisdom'},
    {value: 'charisma', label: 'Charisma'}

]

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