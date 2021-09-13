import { FormControl, Select } from "@material-ui/core";
import { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTransactionsCategory } from "../../redux/actions/transactionActions";
import { showError } from "../../redux/actions/errorActions";
import { RootState } from "../../redux/reducers";
import { Category } from "../../../@types/CategoryTypes/category";

const handleCategoryUpdate = async (newCategoryId: string, transactionId: string) => {
  const url = '/transactions/update/'.concat(transactionId)
  const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({newCategoryId})
  }).catch(err => {
    return err;
  })
  return response
}

interface Props {
  transactionId: string,
  transactionCategoryId: string,
  transactionName: string
}

const RowDropdown: React.FC<Props> = (props) => {
  const [currentCategoryId, setCurrentCategoryId] = useState("0");
  const {transactionId, transactionCategoryId, transactionName} = props
  const { 
    incomeCategories,
    expenseCategories,
    noneCategory } = useSelector((state: RootState) => state.categoryReducer)
  
  const dispatch = useDispatch()
  useEffect(() => {
    setCurrentCategoryId(transactionCategoryId);  
  }, [transactionCategoryId]);

  const handleChange = async (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if(e.target !== null){
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
    }

  const renderOptions = (categories: Category[]) => {
      if (categories) {
          return categories.map((element) => {
            return (
              <option key={element._id} value={element._id}>
                {element.category}
              </option>
            );
          });
      }
      dispatch(showError(`Loading categories dropdown for transactions failed.`,
      `No categories found.`))
  };
  
  return (
    <FormControl>
      <Select
      native={true}
      value={currentCategoryId} 
      id="categories-dropdown"
      onChange={() => handleChange}>
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
