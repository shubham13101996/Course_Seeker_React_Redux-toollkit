export const Students = ({ students = [] }) => {
  return (
    <div className="students">
      <h3>Students</h3>
      {students.map(({ id, name }, index) =>
        index < 2 ? (
          <div key={id} className="student">
            <i className="fa-solid fa-circle-user"></i>
            <p>{name}</p>
          </div>
        ) : null
      )}
      <p> . . . {students.length - 2} More Students</p>
    </div>
  );
};
