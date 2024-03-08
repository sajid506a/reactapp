import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ContextMenuComponent = ({ contextMenu, onClose }) => {
  return (
    <Menu
      keepMounted
      open={contextMenu !== null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={onClose}>Action 1</MenuItem>
      <MenuItem onClick={onClose}>Action 2</MenuItem>
    </Menu>
  );
};

export default ContextMenuComponent;