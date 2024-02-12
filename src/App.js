import "./App.css";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dashboard,
  Error,
  ErrorPage,
  Loader,
  Navbar,
  Route,
  Routes,
  fetchData,
  fetchUser,
} from "./pages";

function App() {
  const UserProfile = lazy(() => import("./pages/UserProfile"));
  const CourseListing = lazy(() => import("./pages/CourseListing"));
  const CourseDetails = lazy(() => import("./pages/CourseDetails"));

  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const courseStatus = useSelector((state) => state.courses.status);

  const isLoading = userStatus === "Loading" || courseStatus === "Loading";
  const hasError = userStatus === "Error" || courseStatus === "Error";

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchUser());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="app-background">
        {isLoading ? (
          <Loader />
        ) : hasError ? (
          <Error />
        ) : (
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/courses" element={<CourseListing />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
