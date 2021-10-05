import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#3f51b5",
        textAlign: "left",
        padding: "20px",
        fontSize: 20,
        color: "whitesmoke",
    },
});

interface Props {
    title: string;
}

const Banner: React.FC<Props> = (props) => {
    const {title} = props;
    const classes = useStyles();

    return (
        <Box className={classes.root} boxShadow={4}>
            {title}
        </Box>
    );
};

export default Banner;
