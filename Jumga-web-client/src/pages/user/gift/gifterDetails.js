import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Box } from '@material-ui/core';
import { formatLocaleCurrency } from 'country-currency-map/lib/formatCurrency';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function GifterDetails({isOpen, gifter, closeModal, cur}) {
  const classes = useStyles();
  console.log(gifter)
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Gifter Details</h2>
            {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
             <Box>Gifter's Name : {gifter.name}</Box>
             <Box>Amount Gifted : {formatLocaleCurrency(gifter.amount_settled,cur)}</Box>
             <Box>Transaction Id : {gifter.tx_id}</Box>
             <Box>Email address : {gifter.email}</Box>
             <Box>Phone number : {gifter.phone_no}</Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
