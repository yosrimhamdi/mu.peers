
import { motion } from "framer-motion";
function PageTransition() {
  return (
    <motion.div
      className="hidden md:block fixed w-full h-full top-0 left-0 bg-teal-500 z-10"
      style={{ clipPath: "polygon(0 0, 80% 0%, 100% 0, 100% 63%, 71% 81%, 35% 94%, 0 100%, 0% 20%)" }}
      initial={{ translateY: 0, opacity:0.7}}
      animate={{ translateY: "-100%",opacity:1}}
      exit={{ translateX: "-100%",opacity:1}}
      transition={{ duration: 0.35, ease:[0.5,0.7,0.2,0.35] }}
    ></motion.div>
  );
}

export default PageTransition;
