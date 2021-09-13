var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showError } from '../redux/actions/errorActions';
export const useFetchTransactions = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    let error = null;
    //TODO: getData is defined the same way in almost every place. Turn it into reusable method.
    const getData = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield fetch('transactions/show')
            .then(res => {
            return res.json();
        })
            .catch(err => {
            throw new Error(err.message);
        });
    });
    //FIXME: Use appropriate async await system (like in ListRow.js)
    useEffect(() => {
        function fetch() {
            return __awaiter(this, void 0, void 0, function* () {
                yield getData().then(res => {
                    if (res.status === 200) {
                        setData([...res.transactionsList]);
                    }
                    else if (res.status === 400) {
                        dispatch(showError(`Couldn't get transactions from database.`, res.statusText));
                        error = res.statusText;
                    }
                }).catch(err => error = err.statusMessage);
            });
        }
        fetch();
    }, []);
    return { transactionsList: data, error };
};
