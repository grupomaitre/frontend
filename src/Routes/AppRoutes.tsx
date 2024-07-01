import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./AllRoutes";
import PageNotFound from "../Error/PageNotFound";


const AppRoutes = () => {
    return (
        <Routes>
            {publicRoutes.map((route: any, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                />
            ))}
            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
}

export default AppRoutes