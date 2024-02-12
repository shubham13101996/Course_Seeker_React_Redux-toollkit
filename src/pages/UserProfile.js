import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user) || {};

  const {
    profilePic,
    name,
    username,
    email,
    enrolledCourses,
    completedCourses,
  } = user;

  return (
    <div className="user-profile">
      <img src={profilePic} alt={name} />
      <h1> {name} </h1>
      <p>@{username}</p>
      <p>Email: {email}</p>
      <div className="amount-of-courses">
        <div className="courses-count" onClick={() => navigate("/")}>
          {enrolledCourses.length} Courses
        </div>
        <div className="courses-count darker" onClick={() => navigate("/")}>
          {completedCourses.length} Completed
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
