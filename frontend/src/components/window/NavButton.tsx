import Button from "@material-ui/core/Button";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles } from "@material-ui/core/styles";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";

interface Props {
    // icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    icon: any;
    text: string;
    onClick: (buttonName: string) => void;
}

const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgb(148 124 129 / 11%)",
        color: "white",
        height: 48,
        padding: "0 30px",
        width: "100%",
        fontSize: "0.8rem",
    },
});

const NavButton: React.FC<Props> = (props) => {
    const {text, icon, onClick} = props;
    const classes = useStyles();

    const handleClick = () => {
        onClick(text);
    };

    return (
        <Button className = {classes.root}
        variant="contained"
        color="primary"
        onClick={handleClick}>
        {icon}
        {text}
        </Button>
    );
};

export default NavButton;
