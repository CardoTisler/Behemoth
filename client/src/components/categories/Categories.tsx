import { Grid } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import {useEffect} from "react";
import {setBannerTitle} from "../../redux/actions/bannerActions";
import {loadCategories} from "../../redux/actions/categoryActions";
import {useFetchCategories} from "../../hooks/useFetchCategories";
import {logger} from "../../logger"
import {RootState} from "../../redux/reducers";

logger.defaultMeta = {service: "Categories.tsx"}

const Categories: React.FC = () => {
    const dispatch = useDispatch();

    const {incomeCategories, expenseCategories, noneCategory} = useSelector((root: RootState) => root.categoryReducer);
    useEffect(() => {
        dispatch(setBannerTitle({bannerTitle: "Categories"}));
    }, []);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CategoryForm />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <CategoryList
                listTitle="Income Categories"
                listArr={incomeCategories}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoryList
                listTitle="Expenses Categories"
                listArr={expenseCategories} />
            </Grid>

        </Grid>
    );
};

export default Categories;
