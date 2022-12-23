import {
    Routes, Route
} from 'react-router-dom'

import HomePage from "./pages/Home/HomePage";
import SourceBookDetailsPage from "./pages/SourceBookDetailsPage";

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/details' element={<SourceBookDetailsPage />} />
        </Routes>
    )
}