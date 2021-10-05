import { FormControl, Select } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import type { Category } from "../../../@types/CategoryTypes/category";
import { showError } from "../../redux/actions/errorActions";
import { RootState } from "../../redux/reducers";

interface Props {
  currentCategory: string | Category;
  handleChange: any;
}
// FIXME: Invalid category ID in transaction record causes populating to fail,
// however it still arrives here as undefined.
const RowDropdown: React.FC<Props> = (props) => {
  const {handleChange, currentCategory} = props;
  const currentCategoryId = typeof currentCategory === "string" ? currentCategory : currentCategory._id;

  const {
    incomeCategories,
    expenseCategories,
    noneCategory } = useSelector((state: RootState) => state.categoryReducer);

  const dispatch = useDispatch();

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

  return (
    <FormControl>
      <Select
      native={true}
      value={currentCategoryId}
      id="categories-dropdown"
      onChange={handleChange}>
        <option
        value={noneCategory._id}>NONE</option>
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
