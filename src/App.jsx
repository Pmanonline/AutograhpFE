import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LifestyleLayout from "./components/LifestyleLayout";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Layout from "./components/Dashboard_Admin/AdminLayout";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import Society from "./pages/Society";
import DigitalEditions from "./pages/DigitalEdition";
import SingleDigitalEdition from "./pages/SingleDigitalEdition";
import Events from "./pages/Events";
import LifeStyle from "./pages/LifeStyle";
import Food from "./pages/Food";
import Wedding from "./pages/Weddings";
import Parenting from "./pages/Parenting";
import Travel from "./pages/Travel";
import HealthFitness from "./pages/HealthFitness";
import Entertainment from "./pages/Entertainment";
import Shopping from "./pages/shopping";
import Business from "./pages/Business";
import Awards from "./pages/Awards";
import RegisterUser from "./pages/RegisterUser";
import RegisterAdmin from "./pages/RegisterAdmin";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordResset";
import Login from "./pages/login";
import ContactUs from "./pages/Contactus";
import SingleContent from "./pages/singleContent";
import ResponsiveNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import SingleVideoPage from "./pages/SingleShortVideo";

// AdminDashboad
// Admin
import AdminDashboard from "./pages/newAdminDashBoardPages/AdminDashboard";
import FashionList from "./pages/newAdminDashBoardPages/AdminFashionList";
import CreateFashion from "./pages/newAdminDashBoardPages/CreateFashion";
import Authors from "./pages/newAdminDashBoardPages/AdminAuthorList";
import CreateAuthor from "./pages/newAdminDashBoardPages/CreateAuthor";
import AllVideosList from "./pages/newAdminDashBoardPages/AllVideoLists";
import CreateVideos from "./pages/newAdminDashBoardPages/CreatVideos";
import FamilyList from "./pages/newAdminDashBoardPages/AdminFamilyList";
import CreateFamily from "./pages/newAdminDashBoardPages/CreateFamily";
import DigialEditionsLists from "./pages/newAdminDashBoardPages/DigialEditionsLists";
import CreateDigitalEDT from "./pages/newAdminDashBoardPages/CreateDigitalEDT";
import LatestList from "./pages/newAdminDashBoardPages/AdminLatestList";
import CreateLatest from "./pages/newAdminDashBoardPages/CreateLatest";
import CreateNews from "./pages/newAdminDashBoardPages/CreateNews";
import AdminNewsLists from "./pages/newAdminDashBoardPages/AdminNewsLists";
import Celebrities from "./pages/Celebrities";
// import FlipBook from "./testing";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/DashBoard");

  return (
    <>
      <ScrollToTop />
      {!isDashboardRoute && <ResponsiveNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RegisterUser" element={<RegisterUser />} />
        <Route path="/RegisterAdmin" element={<RegisterAdmin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<PasswordReset />} />
        <Route path="/content/:slug?" element={<SingleContent />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/Society" element={<Society />} />
        <Route path="/DigitalEditions" element={<DigitalEditions />} />
        <Route
          path="/digital-edition/:slug?"
          element={<SingleDigitalEdition />}
        />
        {/* <Route path="/FlipBook" element={<FlipBook />} /> */}
        <Route path="/Events" element={<Events />} />
        <Route path="entertainment" element={<Entertainment />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="business" element={<Business />} />
        <Route path="awards" element={<Awards />} />
        <Route path="celebrities" element={<Celebrities />} />
        <Route path="video/:slug?" element={<SingleVideoPage />} />
        <Route path="/contactUs" element={<ContactUs />} />

        {/* Lifestyle section with nested routes */}
        <Route path="/lifeStyle" element={<LifestyleLayout />}>
          <Route index element={<LifeStyle />} />
          <Route path="home" element={<LifeStyle />} />
          <Route path="food" element={<Food />} />
          <Route path="weddings" element={<Wedding />} />
          <Route path="parenting" element={<Parenting />} />
          <Route path="travel" element={<Travel />} />
          <Route path="health-fitness" element={<HealthFitness />} />
        </Route>

        {/* Protected Admin routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route element={<Layout />}>
            <Route path="/DashBoard/" element={<AdminDashboard />} />
            <Route
              path="/DashBoard/Admin/FashionList"
              element={<FashionList />}
            />
            <Route
              path="/DashBoard/Admin/CreateFashion/:fashionId?"
              element={<CreateFashion />}
            />
            <Route path="/DashBoard/Admin/Authors" element={<Authors />} />
            <Route
              path="/DashBoard/Admin/CreateAuthor"
              element={<CreateAuthor />}
            />
            <Route
              path="/DashBoard/Admin/AllVideosList"
              element={<AllVideosList />}
            />
            <Route
              path="/DashBoard/Admin/CreateVideos/:videoId?"
              element={<CreateVideos />}
            />
            <Route
              path="/DashBoard/Admin/FamilyList"
              element={<FamilyList />}
            />
            <Route
              path="/DashBoard/Admin/CreateFamily/:familyId?"
              element={<CreateFamily />}
            />
            {/* popCulture */}
            <Route
              path="/DashBoard/Admin/DigialEditions"
              element={<DigialEditionsLists />}
            />
            <Route
              path="/DashBoard/Admin/CreateDigitalEDT/:digitalEditionId?"
              element={<CreateDigitalEDT />}
            />
            {/* Latest */}
            <Route
              path="/DashBoard/Admin/LatestList"
              element={<LatestList />}
            />
            <Route
              path="/DashBoard/Admin/CreateLatestPost/:postId?"
              element={<CreateLatest />}
            />
            {/* News */}
            <Route
              path="/DashBoard/Admin/EssentialNews"
              element={<AdminNewsLists />}
            />
            <Route
              path="/DashBoard/Admin/CreateNews/:newsId?"
              element={<CreateNews />}
            />
          </Route>
        </Route>
        {/* Protected Admin Dashboard routes */}
      </Routes>

      {!isDashboardRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
