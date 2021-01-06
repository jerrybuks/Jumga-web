import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Dialog, Button } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
      toolbar: {
        display: "flex",
        justifyContent: "space-between"
      }
}));

export  const FormDialog = withStyles({
	container: {
        // maxHeight: '50%',
        height: "auto",
          position: "absolute",
          width: '100%',
          bottom: 0
  },
  paperFullScreen: {
    width: "100%",
    minWidth: 320,
    maxWidth: 420,
    borderTopLeftRadius: "8%",
    borderTopRightRadius: "8%"
  }
})(Dialog);


export  const FormDialogSaveButton = withStyles({
	root: {
        
        '&:disabled': {
          color: '#ffffff'
        }		}
})(Button);