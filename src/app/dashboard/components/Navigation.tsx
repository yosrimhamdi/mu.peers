import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

import logo from './logo.png';
import navigation from './navigation';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(25px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
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
    duration: '0.1',
  },
};

export const Sidebar = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebar}
      className="absolute top-0 left-0 z-[1000] w-[250px] bg-gradient-to-tr from-sky-900 to-cyan-600 items-center h-[max(1200px,100%)]"
    >
      <div>
        <Tooltip title={isOpen ? 'Cacher' : 'Montrer'}>
          <button
            onClick={() => setOpen(!isOpen)}
            className="absolute top-[16px] left-[16px] w-[50px] h-[50px] rounded-[50%] bg-transparent flex justify-center items-center"
          >
            <Image src={logo} className="h-[75%]  w-[75%]" alt="website logo" />
          </button>
        </Tooltip>
        <span className="absolute text-white left-[100px] top-[30px] w-[20px] text-xl font-bold whitespace-nowrap">
          Mu-peers
        </span>
      </div>
      <motion.ul
        variants={variants}
        className="absolute top-[100px] w-full pl-[20px] pr-[5px] flex flex-col gap-[20px]"
      >
        {navigation.map(
          (item: { link: string; Icon: any; name: string }, index) => (
            <Link href={item.link} key={index}>
              <motion.li
                variants={variantsMenu}
                whileHover={hover}
                whileTap={{ scale: 0.95 }}
                className={
                  true
                    ? 'cursor-pointer flex justify-start items-center gap-[15px] p-[5px] bg-gradient-to-r from-cyan-500 to-teal-500 w-full rounded-2xl'
                    : 'cursor-pointer flex justify-start items-center gap-[15px] p-[5px] hover:bg-gradient-to-r from-cyan-500 to-teal-500 w-full rounded-2xl hover:opacity-0'
                }
              >
                <div className="  flex  rounded-[100%] p-[2px]">
                  <item.Icon
                    sx={{
                      color: 'white',
                      transform: 'scale(1.2)',
                    }}
                  />
                </div>
                <div className=" w-[250px] h-[20px] flex-1  text-white">
                  {item.name}
                </div>
              </motion.li>
            </Link>
          )
        )}
      </motion.ul>
    </motion.nav>
  );
};

export default Sidebar;
