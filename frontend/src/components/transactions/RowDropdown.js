import { FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const { 
    incomeCategories,
    expenseCategories,
    noneCategory } = useSelector(state => state.categoryReducer)

  useEffect(() => {
    setCurrentCategoryId(props.currentVal);
  }, [props.currentVal]);

  const handleChange = async (e) => {
    const newCategoryId = e.target.value
    
    await props.handleCategoryUpdate(newCategoryId).then( res => {
      if(res.status === 200){
        setCurrentCategoryId(newCategoryId); //change state after backend request is complete to force rerender
        //FIXME: Need to re-render TransactionsList component
        //        to load in new values after category change to fix crashing issue
      } else if (res.status === 400){
        console.log('BAD REQUEST')
      }
    }).catch( err => {
      console.error(err)
    })
    //take function from props, give param of e.target.value(category id), method from props
    //should send request to backend to update all matching transactions with new category Id
  }
  
  console.log(noneCategory)
  return (
    <FormControl>
      <Select
      native={true}
      value={currentCategoryId} 
      id="categories-dropdown"
      onChange={handleChange}>
        <option value={'1'}>---</option>
        <option 
        // key={noneCategory[0]._id} 
        value={noneCategory[0]._id}>NONE</option>
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
