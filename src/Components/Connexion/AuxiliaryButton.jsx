

const AuxiliaryButton = ({ children, onClick }) => {
    return (
      <button
        className=" p-4 transition duration-200 ease text-cyan-500 font-bold hover:scale-105 hover:text-cyan-600  flex justify-center items-center"
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

export default AuxiliaryButton