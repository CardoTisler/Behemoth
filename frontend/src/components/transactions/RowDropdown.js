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
    setCurrentCategoryId(props.currentVal);
  }, [props.currentVal]);

  const handleChange = async (e) => {
    const newCategoryId = e.target.value
    await props.handleCategoryUpdate(newCategoryId).then( res => {
      if(res.status === 200){
        setCurrentCategoryId(newCategoryId); //change state after backend request is complete to force rerender
      } else if (res.status === 400){
        console.log('BAD REQUEST')
      }
    }).catch( err => {
      console.error(err)
    })
    //take function from props, give param of e.target.value(category id), method from props
    //should send request to backend to update all matching transactions with new category Id
  }

  return (
    <FormControl>
      <Select
      native={true}
      value={currentCategoryId} 
      id="categories-dropdown"
      onChange={handleChange}>
        <option key={0} value={'0'}>NONE</option>
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
