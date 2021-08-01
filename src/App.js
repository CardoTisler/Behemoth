import './App.css';
import {useState} from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Banner from './components/Banner'
import NavigationBar from './components/NavigationBar'
import Dashboard from './components/dashboard/Dashboard'
import Transactions from './components/transactions/Transactions';
import Budget from './components/budget/Budget';
import Reports from './components/reports/Reports';

function App() {
  const [bannerTitle, setBannerTitle] = useState('Dashboard')

  const handleBannerText = (props) => {
    setBannerTitle(props.text)
  }


  return (
    <div className="App">
      <Banner title={bannerTitle}/>
        <div className='content'>
          <Router>
            <NavigationBar onButtonClick={handleBannerText}/>


            <div className='frame'>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/transactions' component={Transactions} />
                <Route exact path='/budget' component={Budget} />
                <Route exact path='/reports' component={Reports} />
              </Switch>
            </div>
          </Router>
        </div>
    </div>
  );


}

export default App;
