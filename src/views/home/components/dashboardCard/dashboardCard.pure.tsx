import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  CardContent,
  CardActions,
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import { IDashboardCardProps } from "./dashboardCard.interface";
import './dashboardCard.styles.scss'

export const DashboardCardPure = ({pretitle, title, subtitle, body, link}: IDashboardCardProps) => {
  return (
    <Card className='dashboardCard' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {pretitle}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitle}
        </Typography>
        <Typography variant="body2">
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        {link && <Link style={{textDecoration: 'none'}} to={link}><Button size="small">Go To Tool</Button></Link>}
      </CardActions>
    </Card>
  );
};
