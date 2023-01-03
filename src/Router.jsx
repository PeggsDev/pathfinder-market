import {
    Routes, Route
} from 'react-router-dom'

import HomePage from "./pages/Home/HomePage";
import SourceBookDetailsPage from "./pages/SourceBookDetailsPage";
import CharacterBuilder from "./pages/CharacterManagement/CharacterBuilder";
import CharacterSheet from "./pages/CharacterManagement/CharacterSheet";

export default function Router() {
    return (
        <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/details'} element={<SourceBookDetailsPage />} />
            <Route path={'/character/build'} element={<CharacterBuilder />} />
            <Route path={'/character/character-sheet'} element={<CharacterSheet />} />
        </Routes>
    )
}