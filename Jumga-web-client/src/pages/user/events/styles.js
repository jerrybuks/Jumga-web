import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    search: {
        borderRadius: 45
    },
    addBtn: {
       position: "fixed",
       bottom: 45,
       zIndex: 333
      //  right: 580
    },
    cardConatiner: {
      // overflowY: "scroll",
      // maxHeight: "96vh"
    },
    eventCard: {
      padding: "1rem",
      margin: "1rem",
      boxShadow: "0 10px 25px 0 rgba(0,0,0,.08)",
      borderRadius: "10px",
    },
    eventName: {
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
}));


