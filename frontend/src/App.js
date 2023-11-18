import Compiler from "./pages/Compiler/index";
import "./App.css";
import "./utilities.css";
import SignIn from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "./features/auth/authSlice";
import { useEffect } from "react";
import Loader from "./pages/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProblemList from "./pages/Problems";
import Problem from "./pages/StatementPage";

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  const dispatch = useDispatch();

  const verifyUser = () => {
    let user = {};
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
      dispatch(loginSuccess({ user }));
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      {/* <Compiler /> */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/statement/:id" element={<Problem />} />

              <Route path="/compiler" element={<Compiler />} />
              <Route path="/problems*" element={<ProblemList />} />

              <Route path="*" element={<Navigate replace to="/compiler" />} />
            </>
          ) : (
            <>
              <Route index element={<Navigate replace to="/signin" />} />
              <Route path="/signin" element={<SignIn />} />

              <Route path="/signup" element={<SignUp />} />

              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
