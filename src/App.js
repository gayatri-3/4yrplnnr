import { Switch, Route, Routes, BrowserRouter } from "react-router-dom";

import Planner from "./pages/planner";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Planner />} />
                {/* <Route exact path="/Postings" element={<PagePosts />} /> */}
                {/* <Route path="*" element={<Error />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
