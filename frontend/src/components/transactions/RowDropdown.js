import { FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";

const renderOptions = (categories) => {
  if (categories) {
    return categories.map((element) => {
      return (
        <option key={element._id} value={element._id}>
          {element.category}
        </option>
      );
    });
  }
};

//TODO: OnChange method for Select component that triggers database request to modify
//all suitable transactions

const RowDropdown = (props) => {
  const [currentCategoryId, setCurrentCategoryId] = useState("0");

  useEffect(() => {
    console.log(props.currentVal)
    setCurrentCategoryId(props.currentVal);
  }, [props.currentVal]);

  return (
    <FormControl>
      <Select native={true} value={currentCategoryId} id="categories-dropdown">
        <optgroup label="Income">
          {renderOptions(props.incomeCategories)}
        </optgroup>

        <optgroup label="Expense">
          {renderOptions(props.expenseCategories)}
        </optgroup>
      </Select>
    </FormControl>
  );
};

export default RowDropdown;
