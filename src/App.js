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
import {ShoppingCart, Group, Dashboard, LocalShipping, BarChart, Undo, RemoveShoppingCart, Info, Home} from '@material-ui/icons';
import { Link } from 'react-router-dom';

//Import Pages
import HomeMainPage from './pages/HomeMainPage';
import DashboardMainPage from './pages/DashboardMainPage';
import CustomersMainPage from './pages/CustomersMainPage';
import OrdersMainPage from './pages/OrdersMainPage';
import DispatchMainPage from './pages/DispatchMainPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
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
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/" key="home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Startseite" />
            </ListItem>
            <ListItem button component={Link} to="/Dashboard" key="dashboard">
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
              <ListItemText primary="Bestellungen" />
            </ListItem>
            <ListItem button component={Link} to="/Dispatch"  key="dispatch">
              <ListItemIcon>
                <LocalShipping />
              </ListItemIcon>
              <ListItemText primary="Versand" />
            </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem button key="status">
              <ListItemIcon>
                  <Info />
              </ListItemIcon>
              <ListItemText primary="Status" />
            </ListItem>
            <ListItem button key="claim">
              <ListItemIcon>
                  <RemoveShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Reklamationen" />
            </ListItem>
            <ListItem button key="return">
              <ListItemIcon>
                  <Undo />
              </ListItemIcon>
              <ListItemText primary="Retouren" />
            </ListItem>
            <ListItem button key="statistic">
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="Statistik" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
        <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/">
              <HomeMainPage />
            </Route>
            <Route exact path="/Dashboard">
              <DashboardMainPage />
            </Route>
            <Route exact path="/Customers">
              <CustomersMainPage />
            </Route>
            <Route exact path="/Orders">
              <OrdersMainPage />
            </Route>
            <Route exact path="/Dispatch">
              <DispatchMainPage />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;