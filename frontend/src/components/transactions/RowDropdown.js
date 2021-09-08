import { FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTransactionsCategory } from "../../redux/actions/transactionActions";
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

const handleCategoryUpdate = async (newCategoryId, transactionId) => {
  const url = '/transactions/update/'.concat(transactionId)
  const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({newCategoryId})
  }).catch(err => {
      console.error(err)
  })
  return response
}



const RowDropdown = (props) => {
  const [currentCategoryId, setCurrentCategoryId] = useState("0");
  const {transactionId, transactionCategoryId, transactionName} = props
  const { 
    incomeCategories,
    expenseCategories,
    noneCategory } = useSelector(state => state.categoryReducer)
  
    const dispatch = useDispatch()
  useEffect(() => {
    setCurrentCategoryId(transactionCategoryId);
    
  }, [transactionCategoryId]);

  const handleChange = async (e) => {
    const newCategoryId = e.target.value

    await handleCategoryUpdate(newCategoryId, transactionId).then( res => {
      if(res.status === 200){
        setCurrentCategoryId(newCategoryId);
        dispatch(updateTransactionsCategory(transactionName, newCategoryId))
        
      } else if (res.status === 400){
        console.log('BAD REQUEST')
      }
    }).catch( err => {
      console.error(err)
    })
  
  }
  console.log(currentCategoryId)
  return (
    <FormControl>
      <Select
      native={true}
      value={currentCategoryId} 
      id="categories-dropdown"
      onChange={handleChange}>
        <option value={'1'}>---</option>
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
