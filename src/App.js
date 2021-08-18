// import React from 'react'
import './App.css';
import {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Banner from './components/Banner'
import NavigationBar from './components/NavigationBar'
import Dashboard from './components/dashboard/Dashboard'
import Transactions from './components/transactions/Transactions';
import Categories from './components/categories/Categories';
import Reports from './components/reports/Reports';

function App() {
  const [bannerTitle, setBannerTitle] = useState('Dashboard')
  const [incomeList, setIncomeList] = useState(['Salary', 'Investments', 'Other'])
  const [expensesList, setExpensesList] = useState(['Rent', 'Food', 'Clothes', 'Leisure', 'Eating Out'])

  const handleBannerText = (props) => {
    setBannerTitle(props.text)
  }
//TODO: Add handleIncomeItemAdd method
//TODO: Add handleIncomeItemDelete method
//TODO: Add handleExpensesItemAdd method
//TODO: Add handleExpensesItemDelete method

  return (
    <div className="App">
      <Banner title={bannerTitle}/>
        <div className='content'>
          <Router>
            <NavigationBar onButtonClick={handleBannerText}/>
            
            <div className='frame'>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                {/* <Route exact path='/' render={(props) => <Dashboard {...props} />} */}
                <Route exact path='/transactions' component={Transactions} />
                <Route exact path='/categories' render={() => 
                    <Categories 
                    incomeList = {incomeList}
                    expensesList={expensesList}/>} />

                <Route exact path='/reports' component={Reports} />
              </Switch>
            </div>
          </Router>
        </div>
    </div>
  );


}

export default App;
