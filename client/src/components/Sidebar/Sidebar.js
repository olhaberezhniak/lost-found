import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { useLocation ,useNavigate} from 'react-router-dom';
import MyBuySellItems from '../../pages/MyBuySellItems';
import MyLostFoundItems from '../../pages/MyLostFoundItems'
import MyRequirements from '../../pages/MyRequirements';
import HomeIcon from '@mui/icons-material/Home';
import ProfilePage from '../../pages/profile/ProfilePage';
import { menuItems } from '../../data/menuItems';

const drawerWidth = 230

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: '100%',
      padding: theme.spacing(1),
    },
    root: {
      display: 'flex',
      fontFamily:'Inter, sans-serif',

    },
    drawer: {
      width: drawerWidth,
      background: '#332a7c',

      [theme.breakpoints.down(650)]: {
       width:'60px'
      },
      fontFamily:'Inter, sans-serif',

    },
    drawerPaper: {
      background: '#332a7c',
  
      width: drawerWidth,
      [theme.breakpoints.down(650)]: {
       width:'60px',
      },

    },
    active: {
      background: '#F0BC5E'
    },
    title: {
      padding: theme.spacing(0.75),
      color: 'white',
      cursor:'pointer',
      [theme.breakpoints.down(650)]: {
        display:'none',
      },
      fontFamily:'Hind Siliguri, monospace',
      fontWeight:'900',
      fontSize:'1.5rem'
    },
   
    date: {
      flexGrow: 1
    },

    list:{
       display:'flex',
       flexDirection:'column',
    },

    icon:{
      color:"white"
    },

    icon02:{
      color:"white",
      width:'50px',
    },

    label:{
      color: 'white',
      [theme.breakpoints.down(650)]: {
        display:'none'
      },
    }
  }
});

export default function Sidebar() {
  const classes = useStyles()
  
  const location = useLocation()
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <ListItem
              onClick={() => navigate('/dashboard')}
            >
              <ListItemIcon className={classes.icon02}><HomeIcon  /></ListItemIcon>
              <ListItemText  className={classes.title} primary={<Typography  variant="h5" className={classes.title}>
           Lost and found
          </Typography>} />
            </ListItem>
        </div>

        <List className={classes.list}>
          {menuItems.map((item) => (
            <ListItem 
              button
              key={item.text} 
              onClick={() => navigate(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon color='secondary' className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText  className={classes.label} primary={item.text} />
            </ListItem>
          ))}
        </List>        
      </Drawer>
     
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        <Routes>
        <Route exact path="/myOwnBuySellItems" element={<MyBuySellItems />} />
        <Route exact path="/myOwnLostFoundItems" element={<MyLostFoundItems />}/>
         <Route exact path="/myOwnRequirements" element={<MyRequirements />} />
         <Route exact path="/" element={<ProfilePage/>} />
        </Routes>
      </div>
    </div>
  )
}
