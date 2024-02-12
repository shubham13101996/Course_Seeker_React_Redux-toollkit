import { useSelector } from "react-redux";

export const Error = ({ pageNotFoundError }) => {
  const error = useSelector((state) => state.courses.error);
  return (
    <h1 className="blue-text">
      {error || pageNotFoundError || "There was a problem fetching data"}
    </h1>
  );
};
