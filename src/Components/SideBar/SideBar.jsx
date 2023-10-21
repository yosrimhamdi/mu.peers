import * as React from "react";
import { useRef } from "react";
import { motion} from "framer-motion";
/* import { useDimensions } from "./use-dimensions"; */
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(25px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Sidebar = ({isOpen, toggleOpen}) => {

  const containerRef = useRef(null);
/*   const { height } = useDimensions(containerRef); */

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebar}
   /*      custom={height} */
        ref={containerRef}
        className="absolute top-0 left-0 z-[1000] w-[250px] bg-gradient-to-tr from-sky-900 to-cyan-600 items-center h-[max(1200px,100%)]"
      >
        <Navigation />
        <MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />
      </motion.nav>
    </>
  );
};

export default Sidebar;

