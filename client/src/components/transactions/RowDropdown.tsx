import {FormControl, Select} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {Category} from "../../../@types/CategoryTypes/category";
import {showError} from "../../redux/actions/errorActions";
import {RootState} from "../../redux/reducers";

interface IProps {
    currentCategory: string | Category;
    handleChange: any;
}

const RowDropdown: React.FC<IProps> = (props) => {
    const {handleChange, currentCategory} = props;
    const [currentCategoryId, setCurrentCategoryId] = useState("0");
    const {
        incomeCategories,
        expenseCategories,
        noneCategory,
    } = useSelector((state: RootState) => state.categoryReducer);

    const dispatch = useDispatch();
    /**
     * Returns an array of <option> elements where element is a Category object
     * @param categories Array of category objects to be rendered into a single list.
     */
    const renderOptions = (categories: Category[]) => {
        if (categories) {
            return categories.map((element) => {
                return (
                    <option key={element._id} value={element._id}>
                        {element.name}
                    </option>
                );
            });
        }
        dispatch(showError(`Loading categories dropdown for transactions failed.`,
            `No categories found.`));
    };
    useEffect(() => {
        if (typeof currentCategory === "string") {
            setCurrentCategoryId(currentCategory);
        } else {
            setCurrentCategoryId(currentCategory._id);
        }
    });
    return (
        <FormControl>
            <Select
                native={true}
                value={currentCategoryId}
                id="categories-dropdown"
                onChange={handleChange}>
                <option
                    value={noneCategory._id}>NONE
                </option>
                <optgroup label="Income">
                    {renderOptions(incomeCategories)}
                </optgroup>

                <optgroup label="Expense">
                    {renderOptions(expenseCategories)}
                </optgroup>
            </Select>
        </FormControl>
    );
};

export default RowDropdown;
