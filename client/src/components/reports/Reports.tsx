import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setBannerTitle} from "../../redux/actions/bannerActions";

const Reports: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBannerTitle({bannerTitle: "Reports"}));
    }, []);
    return (
        <div>
            To be developed...
        </div>
    );
};

export default Reports;
