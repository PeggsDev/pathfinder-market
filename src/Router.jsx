import {
    Routes, Route, useParams
} from 'react-router-dom'

import HomePage from "./pages/Home/HomePage";
import SourceBookDetailsPage from "./pages/SourceBookDetailsPage";
import CharacterBuilder from "./pages/CharacterManagement/CharacterBuilder";
import CharacterSheet from "./pages/CharacterManagement/CharacterSheet";
import Login from "./pages/Login";
import {ConditionsDataProvider} from "./contexts/ConditionsCtx";

export default function Router() {
    return (
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/auth/login'} element={<Login/>}/>
            <Route path={'/details'} element={<SourceBookDetailsPage/>}/>
            <Route path={'/goblins-cauldron/build'} element={<CharacterBuilder/>}/>
            <Route path={'/goblins-cauldron/character-sheet/:id'} element={
                <ConditionsDataProvider>
                    <CharacterSheet/>
                </ConditionsDataProvider>
            }/>
        </Routes>
    )
}