import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'

const useStyles = makeStyles({
    root: {
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'white',
        textAlign: 'center',
        width: '100%',
        padding: 10
    }
})

const SummaryElement = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={4}>
            {props.icon} 
            <Typography gutterBottom variant="body1" component="h2">
                {props.text}
            </Typography>
            <Typography gutterBottom variant='h6' component='h2' color={props.color}>
                {props.value}
            </Typography>

        </Card>
    )
}

SummaryElement.defaultProps = {
    text: 'defaultText',
    value: '-----',
    color: 'error'
}

SummaryElement.propTypes = {
    text: PropTypes.string,
    value: PropTypes.string,
    color: PropTypes.string,
    icon: PropTypes.element
}

export default SummaryElement