import './App.css';
import Banner from './components/Banner'
import NavigationBar from './components/NavigationBar'
import {useState} from 'react'

function App() {
  const [bannerTitle, setBannerTitle] = useState('Dashboard')

  const handleBannerText = (props) => {
    setBannerTitle(props.text)
  }


  return (
    <div className="App">
      <Banner title={bannerTitle}/>
      <NavigationBar onButtonClick={handleBannerText}/>
    </div>
  );
}

export default App;
