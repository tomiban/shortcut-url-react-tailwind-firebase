import { Outlet } from "react-router-dom";

const LayoutForm = () => {
    return (
        <div className="w-3/6 mx-auto mt-20">
            <Outlet />
      </div>
  );
};
export default LayoutForm;

