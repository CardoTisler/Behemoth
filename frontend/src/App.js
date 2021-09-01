import './App.css';
import fakeData from './components/transactions/tempdata'
import {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Banner from './components/Banner'
import NavigationBar from './components/NavigationBar'
import Dashboard from './components/dashboard/Dashboard'
import Transactions from './components/transactions/Transactions'
import Categories from './components/categories/Categories'
import Reports from './components/reports/Reports'
import { makeStyles } from '@material-ui/core'
//TODO: Validate incomeList and expensesList data types

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },frameStyles: {
    margin: '3rem',
    width: '100%'
  }, content: {
    flexDirection: 'row',
    display: 'flex'
  }
})

function App() {
  const [bannerTitle, setBannerTitle] = useState('Dashboard')
  const [incomeList, setIncomeList] = useState([])
  const [expensesList, setExpensesList] = useState([])
  const data = fakeData()
  
  const [transactionsList, setTransactionsList] = useState(data)
  const classes = useStyles()

  const handleBannerText = (props) => { setBannerTitle(props.text) }
  const handleIncomeItemAdd = (props) => { setIncomeList([...incomeList, props.category]) }
  const handleIncomeItemDelete = (elementName) => { 
    console.log('income item delete')
    console.log(elementName)
    setIncomeList(incomeList.filter( (category) => category !== elementName))}
  const handleExpenseAdd = (props) => { setExpensesList([...expensesList, props.category]) }
  const handleExpenseItemDelete = (elementName) => { setExpensesList(expensesList.filter( (category) => category !== elementName))}
  const handleTransactionAdd = (transactionItem) => { setTransactionsList([...transactionsList, transactionItem])}
  
  return (
    <div className={classes.root}>
      <Banner title={bannerTitle}/>
        <div className={classes.content}>
          <Router>
            <NavigationBar onButtonClick={handleBannerText}/>
            
            <div className={classes.frameStyles}>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                {/* <Route exact path='/' render={(props) => <Dashboard {...props} />} */}
                <Route exact path='/transactions' render={() => 
                  <Transactions 
                  list={transactionsList}
                  addTransaction={handleTransactionAdd}/>
                } />
                <Route exact path='/categories' render={() => 
                    <Categories />}
                />
                <Route exact path='/reports' component={Reports} />
              </Switch>
            </div>
          </Router>
        </div>
    </div>
  );


}

export default App;
