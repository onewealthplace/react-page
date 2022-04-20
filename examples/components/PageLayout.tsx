import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import IconButton from '@mui/material/IconButton';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { VERSION } from '@react-page/editor';
import React from 'react';
import Navigation from './Navigation';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      zIndex: 0,
    },
    main: {
      flexGrow: 1,
      padding: theme.spacing(4),
      backgroundColor: '#eee',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(4),
      backgroundColor: 'white',
      maxWidth: 1280,
      margin: 'auto',
    },
  })
);

const PageLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <Navigation />;

  return (
    <>
      <GitHubForkRibbon
        href="//github.com/react-page/react-page"
        target="_blank"
        position="right"
        color="black"
      >
        Fork me on GitHub
      </GitHubForkRibbon>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              React Page {VERSION}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <div className={classes.content}>{children}</div>
        </main>
      </div>
    </>
  );
};
export default PageLayout;
