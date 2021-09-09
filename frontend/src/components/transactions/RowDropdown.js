import { FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTransactionsCategory } from "../../redux/actions/transactionActions";
import { showError } from "../../redux/actions/errorActions";

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
      return {status: 400, error: err.message}
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
        dispatch(showError(`Couldn't update transaction category.`, res.error))
      }
    }).catch( err => {
      dispatch(showError(`Couldn't update transaction category.`, err.message))
    })
  }

  const renderOptions = (categories) => {
    try{
      if (categories) {
          return categories.map((element) => {
            return (
              <option key={element._id} value={element._id}>
                {element.category}
              </option>
            );
          });
      }
    } catch (err) {
      dispatch(showError(`Loading categories dropdown for transactions failed.`, err.message))
    }
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
