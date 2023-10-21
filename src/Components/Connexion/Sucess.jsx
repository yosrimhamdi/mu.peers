import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Sucess = ({ show, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="w-[95%] bg-teal-500  text-white flex justify-around items-center mb-[10px] md:mb-[20px] text-center p-2 shadow-lg">
      <CheckCircleIcon />
      {children}
    </div>
  );
};

export default Sucess;
