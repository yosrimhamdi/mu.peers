import { Routes, Route } from "react-router-dom";
import { useCycle } from "framer-motion";
import { useUser } from "../Store/user";
import SignUpPage from "./SignUp";
import ForgetPassword from "./ForgetPassword";
import LoginPage from "./Login";
import { AnimatePresence } from "framer-motion";
import Navbar from "../Components/NavBar/Navbar";
import SideBar from "../Components/SideBar/SideBar";
import Dashboard from "./Dashboard";


const PageContainer = ({ children, isOpen }) => {
  return (
    <div
      className=" min-h-[max(675px,100vh-75px)] pb-[100px] min-w-full md:min-w-[calc(100%-250px)] "
      style={{
        marginLeft: isOpen ? "250px" : 0,

        transitionDuration: "0.75s",
      }}
    >
      {children}
    </div>
  );
};

function Pages() {


  const [connected, email, cred] = useUser((state) => [
    state.connected,
    state.user,
    state.cred,
  ]);

  const [isOpen, toggleOpen] = useCycle(true, false);

  console.log(connected)

  if (!connected) {
    return (
      <AnimatePresence>
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/creer-un-compte" element={<SignUpPage />} />
          <Route path="/mot-de-passe-oublie" element={<ForgetPassword />} />
        </Routes>
      </AnimatePresence>
    );
  } else {
    return (
      <div className=" relative w-full">
          <SideBar isOpen={isOpen} toggleOpen={toggleOpen} />

          <PageContainer isOpen={isOpen}>
            <Navbar />
            <Routes>
              <Route path="/Acceuil" element={<Dashboard />} />
            </Routes>
          </PageContainer>
    
      </div>
    );
  }
}

export default Pages;
