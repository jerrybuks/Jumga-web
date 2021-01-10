import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase';

export  const FormTextField = withStyles({
	root: {
        width: "100%",
        maxWidth: "22rem",
        '& div': {
			// borderRadius:"44rem",
		},
		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
			padding: '2px !important' // override inline-style
		}
	}
})(TextField);

export const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3)
      },
    },
    input: {
        width: "4rem",
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);