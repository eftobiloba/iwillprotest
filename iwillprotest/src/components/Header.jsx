import ProtestImage from '../assets/nigeria-protests.jpg';
import React, {useState, useEffect} from 'react';
import Countdown from './Countdown';

const Header = () => {
    const protestSlogans = ['#endhunger', '#endbadgovernance', '#bringbacksubsidy'];
    const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % protestSlogans.length);
          setIsVisible(true);
        }, 1000);
      }, 5000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="banner-container">
        <div 
          className="darkened-image" 
          style={{backgroundImage: `url(${ProtestImage})`}}
        ></div>
        <div className="text-overlay">
            <div className='align-text-center color-white'>
                <h1 className={`protest-text ${isVisible ? 'visible' : 'hidden'}`}>
                {protestSlogans[currentSloganIndex]}
                </h1>
                <Countdown />
            </div>
        </div>
      </div>
    );
};
  
export default Header;