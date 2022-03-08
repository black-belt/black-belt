import { Outlet } from "react-router-dom";

function Practice() {
  return (
    <div className="Practice">
      Practice
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Practice;
