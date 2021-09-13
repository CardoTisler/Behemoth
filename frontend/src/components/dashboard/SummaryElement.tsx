import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';

const useStyles = makeStyles({
    root: {
        border: 'solid',
        borderWidth: '1px',
        borderColor: 'white',
        textAlign: 'center',
        width: '100%',
        padding: 10
    },
    value: {
        fontSize: '1.1rem'
    }
})

interface Props{
    text: string,
    value: string,
    // icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    icon: any
}

const SummaryElement: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {icon, text, value} = props
    return (
        <Card className={classes.root} elevation={4}>
            {icon} 
            <Typography gutterBottom variant="body1" component="h2">
                {text}
            </Typography>
            <Typography gutterBottom variant='h6' component='h2'
            color="primary"
            className={classes.value}>
                {value}
            </Typography>

        </Card>
    )
}

export default SummaryElement
