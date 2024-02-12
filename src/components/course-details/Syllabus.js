import { useState } from "react";

export const Syllabus = ({ syllabus = [] }) => {
  const [showSyllabus, setShowSyllabus] = useState(false);

  return (
    <div className="syllabus">
      <div
        className="syllabus-headline"
        onClick={() => setShowSyllabus(!showSyllabus)}
      >
        <h3>Syllabus</h3>
        <i
          className={`fa-solid ${
            showSyllabus ? "fa-chevron-up" : "fa-chevron-down"
          }`}
        ></i>
      </div>
      {showSyllabus &&
        syllabus.map(({ week, topic, content }) => (
          <div key={week} className="syllabus-details">
            <div className="week">{week}</div>
            <div>
              <h3>{topic}</h3>
              <p>{content}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
