import { FormControl, Select } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTransactionsCategory } from "../../redux/actions/transactionActions";
import { showError } from "../../redux/actions/errorActions";
import { RootState } from "../../redux/reducers";
import type { Category } from "../../../@types/CategoryTypes/category";
import type { APIinfo } from '../../../@types/API/index'

const handleCategoryUpdate = async (newCategoryId: string, transactionId: string): Promise<APIinfo> => {
  const url = '/transactions/update/'.concat(transactionId)
  const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify({newCategoryId})
  })
  return response.json()
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

  const handleChange = async (e: any) => {
    if(e.target !== null){
      const newCategoryId = e.target.value
      await handleCategoryUpdate(newCategoryId, transactionId).then( res => {
        if(res.status === 200){
          setCurrentCategoryId(newCategoryId);
          dispatch(updateTransactionsCategory(transactionName, newCategoryId))
          
        } else if (res.status === 400){
          throw new Error(res.statusText)
        }
      }).catch((err: Error) => {
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
