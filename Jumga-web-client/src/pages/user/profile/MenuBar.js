import React from 'react';
import { connect } from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
import { signOutStart } from '../../../redux/user/user.actions'

function MenuBar({ signOutStart }) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return <div> 
      <IconButton  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
          <MenuIcon/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Update Profile</MenuItem>
        <MenuItem onClick={() => signOutStart()}>Logout</MenuItem>
        <MenuItem onClick={handleClose}>app updates</MenuItem>
      </Menu>
    </div>;
}

const mapDispatchToProps = dispatch => ({
  signOutStart : () => dispatch(signOutStart())
})

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
