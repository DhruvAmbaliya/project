import React from 'react'
import { ContextProvider } from '../context/SocketContext'
import VideoPlayer from "./VideoPlayer"
import Notification from "./Notification"
import Option from "./Option"
import "../App.css"
import {Typography,AppBar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles((theme)=>({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',
    
        [theme.breakpoints.down('xs')]: {
          width: '90%',
        },
      },
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },
    }));

const LobbyScreen = () => {
    const classes = useStyles();
  return (
    <ContextProvider>
    <div id='ui' className={classes.wrapper}>
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography variant="h2" align="center">Video Chat</Typography>
        </AppBar>
        <VideoPlayer/>
        <Option>
            <Notification />
        </Option>
    </div>
    </ContextProvider>
  );
};

export default LobbyScreen