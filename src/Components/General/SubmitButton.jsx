
import CircularProgress from "@mui/material/CircularProgress";

const SubmitButton = ({
  children,
  onClick,
  loading = false,
  color = "green",
}) => {
  const GREEN =
    " transition duration-100 ease w-[200px] h-[50px]  bg-gradient-to-r from-sky-800 to-cyan-700 text-white shadow-2xl font-bold hover:brightness-105 hover:scale-[1.02] ";
  const BLUE =
    " transition duration-100 ease w-[200px] h-[50px]   bg-sky-600   text-white shadow-2xl rounded-md font-bold hover:brightness-105 hover:scale-[1.02] ";

  return (
    <button
      className={color === "green" ? GREEN : BLUE}
      onClick={onClick}
      disabled={loading}
      type="submit"
    >
      {loading ? (
        <CircularProgress sx={{ color: "white" }} size={30} />
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitButton;
