import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  cardConatiner: {
    // overflowY: "scroll",
    // maxHeight: "96vh"
    paddingTop: "1rem",
  },
  crossText: {
    textDecoration: "line-through"
  },
  giftCard: {
    padding: "1rem",
    margin: "1rem",
    boxShadow: "0 10px 25px 0 rgba(0,0,0,.08)",
    borderRadius: "10px",
  },
  giftName: {
    color: theme.palette.primary.light,
    cursor: "pointer",
  },
  coverImg: {
    width: 120,
    height: 120,
    borderRadius: "50%"
  },
  appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    btn: {
        '& > *': {
          margin: theme.spacing(1),
          fontSize: 10
        },
      },
    // customGiftBtn: {
    //   backgroundColor: "#106ba3"
    // }
}));

