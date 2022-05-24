import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { BorderRadius, Colors, FontSize, Padding } from '../../utils';

const useStyles = makeStyles({
    root: {
        border: 'solid',
        borderWidth: '1px',
        borderColor: Colors.white,
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: BorderRadius.s,
        backgroundColor: Colors.white,
    },
    value: {
        fontSize: FontSize.m,
    },
    text: {
        padding: Padding.xs,
        textAlign: 'left',
    },
    cardIcon: {
        padding: Padding.s,
        alignSelf: 'center',
    },
    cardImg: {
        padding: Padding.xs,
        paddingBottom: Padding.xxs,
        background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
        borderRadius: BorderRadius.xs,
        color: Colors.white,
    }
});

interface Props {
    text: string;
    value: string;
    icon: any;
}

const SummaryElement: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {icon, text, value} = props;
    return (
        <Card className={classes.root} elevation={4}>
            <div className={classes.text}>
                <Typography gutterBottom variant="body1" component="h2">
                    {text}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2"
                            color="primary"
                            className={classes.value}>
                    {value}
                </Typography>
            </div>
            <div className={classes.cardIcon}>
                <div className={classes.cardImg}>
                    {icon}
                </div>
            </div>
        </Card>
    );
};

export default SummaryElement;
