import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  noticationsCardRead: {
    padding: "1rem 5px",
    borderRadius: 0
  },
  noticationsCardUnread: {
    backgroundColor: "#eceff5",
    borderBottom: "1px solid #e5e5e5",
    padding: "1rem 5px",
    borderRadius: 0
  }
}));

