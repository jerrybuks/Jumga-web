import React, {Fragment} from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core';
// import { signOutStart } from '../../../redux/user/user.actions'

export default function ProductListMenu() {
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return <div> 
     <Fragment>
     <IconButton  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
          <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>edit</MenuItem>
        <MenuItem onClick={handleClose}>close</MenuItem>
      </Menu>
     </Fragment>
    </div>
}

// const mapDispatchToProps = dispatch => ({
//   signOutStart : () => dispatch(signOutStart())
// })

// const mapStateToProps = (state) => ({
    
// })

// export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
