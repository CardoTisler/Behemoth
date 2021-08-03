import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import {PropTypes} from 'prop-types'

const NavButton = (props) => {

    const useStyles = makeStyles({
        root: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            //background: '#3f51b5',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgb(148 124 129 / 11%)',
            color: 'white',
            height: 48,
            padding: '0 30px',
            width: '100%',
            fontSize: '0.8rem'
        },
    });
    const classes = useStyles();

    const text = props.text;
    const handleClick = () => {
        props.onClick({text})  
    }

    return (
        <Button className = {classes.root}
        variant={props.variant}
        color={props.color}
        onClick={handleClick}>
        {props.icon}
        {text}
        </Button>
    )
}

NavButton.defaultProps = {
    text: 'default_text',
    color: 'primary',
    variant: 'contained'
}

NavButton.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    icon: PropTypes.element.isRequired
}
export default NavButton
