import {
    Routes, Route, useParams
} from 'react-router-dom'

import HomePage from "./pages/Home/HomePage";
import SourceBookDetailsPage from "./pages/SourceBookDetailsPage";
import CharacterBuilder from "./pages/CharacterManagement/CharacterBuilder";
import CharacterSheet from "./pages/CharacterManagement/CharacterSheet";
import AccountLogin from "./pages/AccountManagement/AccountLogin";
import {ConditionsDataProvider} from "./contexts/ConditionsCtx";
import AccountRegistration from "./pages/AccountManagement/AccountRegistration";
import Dashboard from "./pages/AccountManagement/Dashboard";
import {ArmorClassCtx, ArmorClassDataProvider} from "./contexts/ArmorClassCtx";
import {ToastPortalDataProvider} from "./contexts/ToastPortalCtx";

export default function Router() {
    return (
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/account/login'} element={<AccountLogin/>}/>
            <Route path={'/account/registration'} element={<AccountRegistration/>}/>
            <Route path={'/account/dashboard'} element={<Dashboard/>}/>
            <Route path={'/details'} element={<SourceBookDetailsPage/>}/>
            <Route path={'/goblins-cauldron/build'} element={<CharacterBuilder/>}/>
            <Route path={'/goblins-cauldron/character-sheet/:id'} element={
                <ToastPortalDataProvider>
                    <ConditionsDataProvider>
                        <ArmorClassDataProvider>
                            <CharacterSheet/>
                        </ArmorClassDataProvider>
                    </ConditionsDataProvider>
                </ToastPortalDataProvider>
            }/>
        </Routes>
    )
}