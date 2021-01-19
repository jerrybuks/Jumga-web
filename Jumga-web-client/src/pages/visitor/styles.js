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
  coverImg: {
    width: 120,
    height: 120,
    borderRadius: "50%"
  },
  productCard: {
    padding: "1rem",
    margin: "1rem",
    boxShadow: "0 10px 25px 0 rgba(0,0,0,.08)",
    borderRadius: "10px",
  },
  productName: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  productImg: {
    width: 70,
    borderRadius: "50%",
  },
  productWithoutImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "darkgrey",
    width: 70,
    borderRadius: "50%",
    backgroundColor: "whitesmoke",
    height: 70
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
    changeItemNumber: {
      alignSelf: "flex-start",
      marginTop: 8,
      width: 89,
      height: 20,
      background: "#f6f6f6",
      borderRadius: 7,
      position: "relative",
      display: "flex",
      marginLeft: 15
    },
    itemDecreaseNumber:{
      position: "absolute",
      width: 20,
      height: 20,
      background: "#ececec",
      borderRadius: 7,
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    },
    itemIncreaseNumber:{
      position: "absolute",
      right: 0,
      width: 20,
      height: 20,
      background: "#ececec",
      borderRadius: 7,
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    },
    itemCountInput:{
      width: "60%",
      border: "none",
      background: "none",
      fontWeight: "normal",
      fontSize: 11,
      lineHeight: 20,
      color:"#000000",
      textAlign: "center",
      paddingLeft: "40%",

      '&::placeholder': {
        fontWeight: "normal",
        fontSize: 11,
        lineHeight: 20,
        color: "#000000",
        textAlign: "center"
    }
  }
  
}));

