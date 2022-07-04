import "./App.css";
import Cards from "./pages/BuySell";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Bcards from "./pages/LostFound";

import ProductDetails from "./pages/ProductDetailsBuySell";
import LoginSignUp from "./pages/Login";
import Homepage from "./pages/homepage/Homepage";

import LostFoundItemDetails from "./pages/ProductDetailsLostFound";
import AddItem from "./pages/AdditemsLostFound";
import OtpPage from "./pages/OtpPage";
import SignUpForm from "./pages/SignUpForm";
import Requirement from "./pages/Requirement";
import Edit_MyRequirement from "./pages/EditMyRequirement";

import Edit_MyBuySellItems from "./pages/EditMyBuySellItems";

import EditMyLostFoundItems from "./pages/EditMyLostFoundItems";
import ChatRoom from "./components/ChatComponents/ChatRoom/ChatRoom";
import Sidebar from "./components/Sidebar/Sidebar";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPassword from "./pages/ResetPassword";
import LostFoundResponses from "./pages/LostFoundResponses";
import Messenger from "./pages/Messenger";
import EditProfile from "./pages/EditProfile";
import ProfilePage from "./pages/profile/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./components/NotFound/NotFound";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#FFFF00",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<Homepage />}></Route>

            <Route path="*" exact element={<NotFound />}></Route>

            <Route path="/loginSignUp" exact element={<LoginSignUp />}></Route>
            <Route exact path="/signUpForm" element={<SignUpForm />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/otpPage" element={<OtpPage />} />
            <Route exact path="/buySell" element={<Cards />} />
            <Route exact path="/lostFound" element={<Bcards />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/requirements" element={<Requirement />} />
            <Route exact path="/resetPassword" element={<ResetPassword />} />
            <Route exact path="/editProfile" element={<EditProfile />} />
            <Route exact path="/verifyEmail" element={<VerifyEmailPage />} />
            <Route exact path="changePassword" element={<ChangePassword />} />
            <Route exact path="/signUp" element={<SignUpPage />} />

            <Route
              exact
              path="/editMyRequirement"
              element={<Edit_MyRequirement />}
            />
            <Route
              exact
              path="/editMyBuySellItems"
              element={<Edit_MyBuySellItems />}
            />
            <Route
              exact
              path="/lostItem/:id"
              element={<LostFoundItemDetails />}
            />
            <Route exact path="/lostItem/addItem" element={<AddItem />} />
            <Route exact path="sidebar/*" element={<Sidebar />} />

            <Route
              exact
              path="/editLostFoundItems/:id"
              element={<EditMyLostFoundItems />}
            />
            <Route path="/chatRoom" element={<Messenger />} />
            {/*<Route exact path="/chatRoom/:room_id" element={<Messenger />} />*/}

            <Route exact path="/responses" element={<LostFoundResponses />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
