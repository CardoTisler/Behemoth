import {Box, makeStyles} from '@material-ui/core';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setUserLoggedOut} from '../../redux/actions/userActions';
import {RootState} from '../../redux/reducers';
import { Colors, FontSize, Padding } from '../../utils';

const useStyles = makeStyles({
    root: {
        backgroundColor: Colors.lightGray,
        textAlign: 'right',
        padding: Padding.m,
        fontSize: FontSize.m,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        width: '12%',
        marginRight: '2%',
        justifyContent: 'space-between',
        fontSize: FontSize.s,
        float: 'right',
    },
    text: {
        fontSize: FontSize.m,
        marginRight: '2%',
    },
});

const Banner = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {username} = useSelector((state: RootState) => state.userReducer);
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setUserLoggedOut());
    };
    return (
        <Box className={classes.root} boxShadow={0}>
            <div className={classes.buttons}>
                <div className={classes.text}>
                    {username}
                </div>
                <Button
                    variant="outlined"
                    onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </Box>
    );
};

export default Banner;
