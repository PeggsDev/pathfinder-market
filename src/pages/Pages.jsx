import {
    Routes, Route
} from 'react-router-dom'

import HomePage from "./HomePage";
import SourceBookDetailsPage from "./SourceBookDetailsPage";

export default function Pages() {
    return (
        <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/details' exact element={<SourceBookDetailsPage />} />
        </Routes>
    )
}