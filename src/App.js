import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {ShoppingCart, FindInPage, Group, Dashboard, LocalShipping, BarChart, Undo, RemoveShoppingCart, Info, Home} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import logo from './img/yourshirt_full.png';
import yourshirt from './img/android-chrome-144x144.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SvgIcon from '@material-ui/core/SvgIcon';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import { createMuiTheme } from '@material-ui/core/styles';



//Import Pages
import DashboardMainPage from './pages/DashboardMainPage';
import CustomersMainPage from './pages/CustomersMainPage';
import OrdersMainPage from './pages/OrdersMainPage';
import EinstellungPage from './pages/Einstellungen.js';
import HilfebereichPage from './pages/Hilfebereich.js';
import SearchMainPage from './pages/RetoureMainPage';
import Footer from './footer'
import OrderDetails from './components/specOrderDetails';


const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  }, 

  active:{
    backgroundColor: "#006064",
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  
  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <AppBar
         style={{backgroundColor: "#006064"}}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>

      <Toolbar>
            <IconButton            
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}>

              
              <MenuIcon />
            </IconButton>            
            <Typography variant="h6" noWrap >
              Verkauf und Versand
            </Typography>
            
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }} >
        
          <div className={classes.toolbar}>

        <Toolbar>
        <img height="50"  src={logo} alt="Logo" />  
       </Toolbar>

            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>

            <ListItem button component={Link} to="/Dashboard" key="dashboard"  classes={{ selected: classes.active }}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/Customers" key="customers">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Kunden" />
            </ListItem>
            <ListItem button component={Link} to="/Orders" key="orders">
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Aufträge" />
            </ListItem>
            <ListItem button component={Link} to="/Retoure"  key="retoure">
              <ListItemIcon>
                <RestoreIcon />
              </ListItemIcon>
              <ListItemText primary="Retoure" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/Einstellungen"  key="einstellungen">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Einstellungen" />
            </ListItem>

            <ListItem button component={Link} to="/Hilfebereich"  key="hilfebereich">
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Hilfebereich" />
            </ListItem>

 

          </List>
          <Divider />
          <List>
       
      <ListItem button onClick={(e) => {
     e.preventDefault();
     window.location.href='http://yourshirt.epizy.com/';
     }}>
       <ListItemIcon>
           <Icon classes={{root: classes.iconRoot}}>
                <img className={classes.imageIcon} src={yourshirt}/>
          </Icon>
           </ListItemIcon>
           <ListItemText primary="YourShirt"/>   
        </ListItem>  
     
       </List>

       <Footer>
      </Footer>

          <Divider />



          
         
        </Drawer>
        <main className={classes.content}>
        <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/Dashboard">
              <DashboardMainPage />
            </Route>
            <Route exact path="/Customers">
              <CustomersMainPage />
            </Route>
            <Route exact path="/Orders">
              <OrdersMainPage />
            </Route>
            <Route exact path="/Retoure">
              <SearchMainPage />
            </Route>
            <Route exact path="/Hilfebereich">
              <HilfebereichPage />
            </Route>
            <Route exact path="/Einstellungen">
              <EinstellungPage />
            </Route>
            <Route exact path="/OrderDetails">
              <OrderDetails/>
            </Route>
          </Switch>
        </main>
      </Router>



    </div>


  );

}

export default App;