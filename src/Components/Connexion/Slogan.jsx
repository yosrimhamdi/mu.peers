
import logo from "../../Media/logo.png";

function Slogan() {
  return (
    <>
      <div className="   md:flex items-center justify-center flex-wrap pt-10 2xl:pt-20">
        <img
          src={logo}
          className="h-[75px] mb-10"
          alt="Logo Avance Immédiate Services - Logiciel API Tiers de Prestation"
        />
      </div>

      <span className=" hidden md:block text-[var(--primary-color)] text-xl font-bold mb-10">
        La Solution qui simplifie la gestion de l'avance immédiate
      </span>
    </>
  );
}

export default Slogan;
