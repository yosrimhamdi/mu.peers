import { useState } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Settings, Logout, Help as HelpIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { logout } from '@/redux/slices/auth-slice';
import { appDispatch } from '@/redux/store';

const paperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<appDispatch>();
  const router = useRouter();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    dispatch(logout(null))
      .then(unwrapResult)
      .then(() => {
        handleClose();
        router.push('/login');
      });
  };

  return (
    <nav className="h-[75px] flex items-center justify-end pr-10 shadow">
      <Tooltip title="Mon Compte">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Settings
            sx={{
              transform: 'scale(0.9)',
              color: '#0A6E90',
              marginLeft: 'auto',
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" className="text-stone-500" />
          </ListItemIcon>
          <span>Paramètres</span>
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <span>Support Client</span>
        </MenuItem> */}
        <MenuItem onClick={onLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <span>Se déconnecter</span>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default Header;
