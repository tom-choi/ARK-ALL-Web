import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import CampusLoop from "./pages/CampusLoop";
import Info from "./pages/Info";
import User from "./pages/User";
import Activities from "./pages/Activities";
import Organizations from "./pages/Organizations";
import News from "./pages/News";
import UMActivities from "./pages/UMActivities";
import Layout from "./layout/Layout";
import About from "./pages/About";
import ShowActivities from "./show/ShowActivities"
import ShowOrganizations from "./show/ShowOrganizations"
import ShowNews from "./show/ShowNews";
import ShowUMActivities from "./show/ShowUMActivities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} >
            <Route path="activities" element={<Activities />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="news" element={<News />} />
            <Route path="um-activities" element={<UMActivities />} />
          </Route>
          <Route path="/services" element={<Services />} />
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/campus-loop" element={<CampusLoop />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail" element={<Layout />}>
          <Route path="activities" element={<ShowActivities />}>
            <Route path=":id" element={<ShowActivities />} />
          </Route>
          <Route path="organizations" element={<ShowOrganizations />}>
            <Route path=":id" element={<ShowOrganizations />} />
          </Route>
          <Route path="news" element={<ShowNews />}>
            <Route path=":id/:lang" element={<ShowNews />} />
          </Route>
          <Route path="um-activities" element={<ShowUMActivities />}>
            <Route path=":id/:lang" element={<ShowUMActivities />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
