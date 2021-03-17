import React, { useState, useEffect } from 'react';
import { AppBar, Button, Typography, Toolbar, Avatar } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

import useStyles from './styles';
import memories from '../../images/memories.png';


export const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);

    const logoutFailure = (error) => {
        console.log(error);
    }


    return (
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" variant="h2" align="center" className={classes.heading}>Memories</Typography>
                <img src={memories} height="60" alt="memories" className={classes.image} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h5">{user.result.name}</Typography>
                        <GoogleLogout
                            clientId="972730369915-29om3v9n4dg18krpetq9t9a54oder8q6.apps.googleusercontent.com"
                            onLogoutSuccess={logout}
                            onFailure={logoutFailure}
                            render={(renderProps) => (
                                <Button variant="contained" className={classes.logout} color="secondary" onClick={renderProps.onClick}>Logout</Button>
                            )}
                        />
                    </div>
                ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
