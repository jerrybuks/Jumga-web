import { makeStyles } from '@material-ui/core/styles';
import homeBck from '../../../assets/shopping.jpg'
export const useStyles = makeStyles(theme => ({
    root: {
        color: `${theme.palette.common.white}`,
        margin: theme.spacing(3),
        border: `1px solid ${theme.palette.common.white}`
    },
    margin: {
     
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    header:{
        backgroundImage: `linear-gradient(to left top,${theme.palette.primary.light},rgba(0,0,0, 0.75)),url(${homeBck})`,
        maxHeight: '100vh',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    headerContainer:{
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            position: 'absolute',
            left:' 50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            height: 'initial',
          },
          [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          
          },
         
        height: '100vh',
        overflow: 'hidden'
    },
    headerContainerLeft:{
        color: theme.palette.common.white,
        textTransform: 'uppercase',
        [theme.breakpoints.down('md')]: {
            fontSize: theme.typography.pxToRem(20),
          },
          [theme.breakpoints.down('sm')]: {
            fontSize: theme.typography.pxToRem(21),
            width: '20rem',
          },
        fontSize: theme.typography.pxToRem(35),
        width: '40rem',
        lineHeight: 2,
        fontWeight: 300,
        letterSpacing: theme.typography.pxToRem(6)
    }
  }));