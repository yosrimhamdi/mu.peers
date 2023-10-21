import ErrorIcon from "@mui/icons-material/Error";

const Error = ({ showError, children }) => {
  if (!showError) {
    return null;
  }

  return (
    <div className="w-[95%] bg-red-600  text-white flex gap-6 items-center mb-[10px] md:mb-[20px] text-center p-2 shadow-lg">
      <ErrorIcon />
      {children}
    </div>
  );
};

export default Error;
