import { useDispatch, useSelector } from "react-redux";
import {
  dislikeCourse,
  enrollToCourse,
  likeCourse,
  markCourseAsComplete,
  markCourseAsIncomplete,
  unEnrollFromCourse,
} from "../../store-and-slices/slices/userSlice";

export const CourseInfo = ({ courses = [], currentCourse = {} }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || {};

  const {
    name,
    enrollmentStatus,
    instructor,
    description,
    duration,
    schedule,
    location,
    prerequisites,
  } = currentCourse;

  const isUserEnrolled = courses
    .filter((course) => user.enrolledCourses?.includes(course.name))
    .find((course) => course.name.includes(name));

  const canCourseBeEnrolledIn =
    (enrollmentStatus === "Open" && !isUserEnrolled) ||
    (enrollmentStatus === "In Progress" && !isUserEnrolled);

  const isCourseCompleted = courses
    .filter((course) => user.completedCourses?.includes(course.name))
    .find((course) => course.name.includes(name));

  const isCourseLiked = courses
    .filter((course) => user.likedCourses?.includes(course.name))
    .find((course) => course.name.includes(name));

  const enrollOrUnenroll = () => {
    if (isUserEnrolled) {
      dispatch(unEnrollFromCourse(name));
      dispatch(markCourseAsIncomplete(name));
    } else {
      dispatch(enrollToCourse(name));
    }
  };

  return (
    <div>
      <i
        className={`fa-solid fa-heart heart bigger ${
          isCourseLiked && "red-heart"
        }`}
        onClick={(event) => {
          event.stopPropagation();
          isCourseLiked
            ? dispatch(dislikeCourse(name))
            : dispatch(likeCourse(name));
        }}
      ></i>
      <p className="instuctor">Instructor: {instructor}</p>
      <p>Description: {description}</p>
      <p>
        Enrollment Status:{" "}
        <span
          className={
            enrollmentStatus === "Open"
              ? "open"
              : enrollmentStatus === "Closed"
              ? "closed"
              : "progress"
          }
        >
          {enrollmentStatus}
        </span>
      </p>
      <p>Duration: {duration}</p>
      <p>Schedule: {schedule}</p>
      <p>Location: {location}</p>
      <div>
        Prerequisites:
        {prerequisites?.map((requisite, index) => (
          <li key={index}>{requisite}</li>
        ))}
      </div>
      {(canCourseBeEnrolledIn || isUserEnrolled) && (
        <button
          className={`${isUserEnrolled && "enrolled-button"}`}
          onClick={enrollOrUnenroll}
        >
          {isUserEnrolled ? "Already Enrolled" : "Enroll Now"}
        </button>
      )}
      {isUserEnrolled && (
        <button
          className={
            isCourseCompleted ? "completed-btn" : "mark-as-complete-btn"
          }
          onClick={() =>
            isCourseCompleted
              ? dispatch(markCourseAsIncomplete(name))
              : dispatch(markCourseAsComplete(name))
          }
        >
          {isCourseCompleted ? "Completed!" : "Mark As Complete"}
        </button>
      )}
    </div>
  );
};
