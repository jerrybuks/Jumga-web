import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    // cardConatiner: {
    //     overflowY: "scroll",
    //     maxHeight: "76vh"
    //   },
      profileCard: {
        padding: "1rem",
        margin: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 8px 0px",
        borderRadius: "10px",
      },
    pointerCursor: {
      cursor: 'pointer'
    },
    formControl: {
      minWidth: 120,
      
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

// rgba(0, 0, 0, 0.1) 0px 2px 8px 0px
