import './App.css';
import {useState} from 'react'
import Banner from './components/Banner'
import NavigationBar from './components/NavigationBar'
import Dashboard from './components/dashboard/Dashboard'
import DateFilter from './components/dashboard/DateFilter'

function App() {
  const [bannerTitle, setBannerTitle] = useState('Dashboard')

  const handleBannerText = (props) => {
    setBannerTitle(props.text)
  }


  return (
    <div className="App">
      <Banner title={bannerTitle}/>
      
      <div className='content'>
        <NavigationBar onButtonClick={handleBannerText}/>
        <Dashboard />
      </div>
    </div>
  );


}

export default App;
