import DropDownMenu from "./DropDownMenu";

function Navbar() {
  return (
    <nav className="h-[75px] flex items-center justify-end pr-10 shadow-sm ">
      <DropDownMenu />
    </nav>
  );
}

export default Navbar;
