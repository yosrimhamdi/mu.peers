import * as React from "react";
import { motion } from "framer-motion";
import { Divider, Tooltip } from "@mui/material";
import logo from "../../Media/logo_ais_white.png";
import { useEffect } from "react";

export const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <>
      <Tooltip title={isOpen ? "Cacher" : "Montrer"}>
        <button
          onClick={toggle}
          className="absolute top-[16px] left-[16px] w-[50px] h-[50px] rounded-[50%] bg-transparent flex justify-center items-center"
        >
          <img src={logo} className=" h-[55px]" />
        </button>
      </Tooltip>

      <span className="absolute text-white left-[100px] top-[30px] w-[20px] text-xl font-bold">A.I.S</span>
    </>
  );
};
