import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { ComputerOutlined } from "@material-ui/icons";
import MemoryIcon from "@material-ui/icons/Memory";
import BuildIcon from "@material-ui/icons/Build";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import ChromiumIcon from "../../assets/Chromium";

interface Page {
  label: string;
  link: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const pages: Page[] = [
  {
    label: "System Diagnostics",
    link: "/diagnostics",
    icon: BuildIcon,
  },
  {
    label: "System Data",
    link: "/",
    icon: ComputerOutlined,
  },
  {
    label: "System State",
    link: "/state",
    icon: MemoryIcon,
  },
];

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

export default function PermanentDrawerLeft({
  children,
}: {
  children?: React.ReactNode;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography
            style={{ width: "100%", textAlign: "center" }}
            variant="h5"
            noWrap
          >
            Telemetry PWA
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {/* <div className={classes.toolbar} /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: "4px",
            paddingBottom: "4px",
            paddingLeft: "8px",
          }}
        >
          <ChromiumIcon width={40} height={40} />
          <h3 style={{ marginLeft: "4px" }}>A Chromium Project</h3>
        </div>

        <Divider />
        <List>
          {pages.map((page) => (
            <Link key={page.label} to={page.link}>
              <ListItem
                button
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <page.icon />
                <ListItemText
                  style={{ marginLeft: "8px" }}
                  primary={page.label}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
