import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthLoader from "./AuthLoader";

export default function App() {
    return (
        <Router>
            <Routes>
                {/* ROOT handles everything */}
                <Route path="/" element={<AuthLoader />} />
            </Routes>
        </Router>
    );
}