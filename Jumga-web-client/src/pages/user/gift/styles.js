import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  cardConatiner: {
    // overflowY: "scroll",
    // maxHeight: "96vh"
  },
  giftCard: {
    padding: "1rem",
    margin: "1rem",
    // boxShadow: "0 10px 25px 0 rgba(0,0,0,.08)",
    borderRadius: "10px",
  },
  giftName: {
    color: theme.palette.primary.light,
    cursor: "pointer",
  },
  appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    pointerCursor: {
      cursor: 'pointer'
    }
}));


