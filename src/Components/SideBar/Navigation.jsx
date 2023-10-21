import { useUser } from "../../Store/user";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import AddchartIcon from "@mui/icons-material/Addchart";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Logout from "@mui/icons-material/Logout";
import HandshakeIcon from "@mui/icons-material/Handshake";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { Link } from "react-router-dom";
const iconsStyle = {
  color: "white",
  transform: "scale(1.2)",
};

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const variantsMenu = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -200 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const hover = {
  x: -5,
  scale: 1.05,
  transition: {
    duration: "0.1",
  },
};

const MenuItem = ({ name, icon, link, onClick = null }) => {
  const NOT_ACTIVE =
    "cursor-pointer flex justify-start items-center gap-[15px] p-[5px] hover:bg-gradient-to-r from-cyan-500 to-teal-500 w-full rounded-2xl hover:opacity-0";
  const ACTIVE =
    "cursor-pointer flex justify-start items-center gap-[15px] p-[5px] bg-gradient-to-r from-cyan-500 to-teal-500 w-full rounded-2xl";

  const location = useLocation(); // get the current path location

  const isActive = location.pathname === link;

  return (
    <Link to={link}>
      <motion.li
        variants={variantsMenu}
        whileHover={hover}
        whileTap={{ scale: 0.95 }}
        className={isActive ? ACTIVE : NOT_ACTIVE}
        onClick={onClick}
      >
        <div className="  flex  rounded-[100%] p-[2px]">{icon}</div>
        <div className=" w-[250px] h-[20px] flex-1  text-white">{name}</div>
      </motion.li>
    </Link>
  );
};

export const Navigation = () => {
  const disconnectUser = useUser((state) => state.disconnectUser);

  const disconnect = () => {
    window.alert("disconnect")
    disconnectUser();
  };



  const items = [
    {
      name: "Dashboard",
      icon: <DashboardIcon sx={iconsStyle} />,
      link: "/Acceuil",
    },

    {
      name: "Mes Clients",
      icon: <PersonOutlineIcon sx={iconsStyle} />,
      link: "/Clients",
    },
    {
      name: "Nouveau Client",
      icon: <PersonAddOutlinedIcon sx={iconsStyle} />,
      link: "/nouveau-client",
   
    },
    {
      name: "Mes Factures",
      icon: <DescriptionOutlinedIcon sx={iconsStyle} />,
      link: "/Factures",
    },
    {
      name: "Nouvelle Facture",
      icon: <NoteAddOutlinedIcon sx={iconsStyle} />,
      link: "/Nouvelle-facture",
    },

    {
      name: "XL Easy",
      icon: <AddchartIcon sx={iconsStyle} />,
      link: "/XL-easy",
    },
    {
      name: "Mes Attestations",
      icon: <ArticleOutlinedIcon sx={iconsStyle} />,
      link: "/Attestations",
    },
    {
      name: "Nouvelle Attestation",
      icon: <PostAddOutlinedIcon sx={iconsStyle} />,
      link: "/Nouvelle-attestation",
    },
    {
      name: "Mes Rapports",
      icon: <QueryStatsIcon sx={iconsStyle} />,
      link: "/rapports",
    },
    {
      name: "Paramètres",
      icon: <SettingsOutlinedIcon sx={iconsStyle} />,
      link: "/Parametres",
    },

    {
      name: "FAQ",
      icon: <LiveHelpIcon sx={iconsStyle} />,
      link: "/FAQ",
    },

    {
      name: "Nos Partenaires",
      icon: <HandshakeIcon sx={iconsStyle} />,
      link: "/Partenaires",
    },

    {
      name: "Se déconnecter",
      icon: <Logout sx={iconsStyle} />,
      link: "/",
      onClick: disconnect,
    },
  ];

  return (
    <motion.ul
      variants={variants}
      className="absolute top-[100px] w-full pl-[20px] pr-[5px] flex flex-col gap-[20px]"
    >
      {items.map((item, index) => (
        <MenuItem
          key={index}
          name={item.name}
          icon={item.icon}
          link={item.link}
          onClick={item.onClick}
        />
      ))}
    </motion.ul>
  );
};
