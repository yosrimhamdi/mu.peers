

const Header = ({ children }) => {
    return (
      <div className="w-full h-[80px] bg-gradient-to-r from-cyan-700 to-cyan-800 flex justify-center items-center">
        <h2 className="text-white font-bold text-xl">{children}</h2>
      </div>
    );
  };

export default Header