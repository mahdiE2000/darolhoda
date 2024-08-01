import React, { Component, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
const Login = React.lazy(() => import("./views/pages/login/Login"));
import 'bootstrap-icons/font/bootstrap-icons.css';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

class App extends Component {
    render() {
        return (
            <Suspense fallback={loading}>
                <Routes>
                    <Route path="*" element={<DefaultLayout />} />
                </Routes>
            </Suspense>
        );
    }
}

export default App;
