import React from 'react';
import {Fab, Box} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './styles'

export default function FloatingAddBtn ({ handleClickOpen }) {
	const classes = useStyles();
	return (
		<Box className={classes.addBtn}>
			<Fab color="primary" aria-label="add"  onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
		</Box>
	);
};
