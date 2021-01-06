
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.common.black,
		marginTop: theme.spacing(3),
        border: '1px solid #ffffff',
        margin: 'auto',
        maxWidth: '22rem',

		'& .MuiTextField-root': {
            margin: theme.spacing(1.5),
            padding: 0,
		},
		'& .MuiButton-contained': {
			color: 'white'
		}
    },
    heading: {
        fontSize: "18px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "2px",
        marginBottom: "10px",
        
    },
	extendedIcon: {
		marginRight: theme.spacing(1)
	},
    form:{
        marginTop: theme.spacing(3),
        // overflowY: 'hidden'
    },
    passwordContainer:{
        position: 'relative'
    },
    password:{
        position: 'absolute',
        zIndex: 1,
        right: '12%',
        top: '15%'
    },
    pointerCursor: {
        cursor: 'pointer'
    },
    margin: {
        margin: ".8rem",
    },
    btn:{
        background:" #EF3651",
    boxShadow: "0px 4px 8px rgba(239, 54, 81, 0.35)",
    borderRadius: "25px"
    }
}));


export  const ValidationTextField = withStyles({
	root: {
        width: '18rem',
		'& input': {
            height: '.5rem',
        },
        '& div': {
			// borderRadius:"44rem",
		},
		'& input:valid:focus + fieldset': {
			borderLeftWidth: 6,
			padding: '2px !important' // override inline-style
		}
	}
})(TextField);

