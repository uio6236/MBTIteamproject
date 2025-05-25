import { Link, useLocation } from 'react-router-dom';
import './TabBar.css';

import homeIcon from './assets/home.png';
import sportIcon from './assets/sport.png';
import foodIcon from './assets/food.png';
import optionIcon from './assets/option.png';

export default function TabBar() {
const { pathname } = useLocation();

  return (
    <div className="tabbar">
      <Link to="/chat">
        <img src={homeIcon} alt="홈" className="tab-icon" />
      </Link>
      <Link to="/recommend-sports">
        <img src={sportIcon} alt="운동" className="tab-icon" />
      </Link>
      <Link to="/recommend-foods">
        <img src={foodIcon} alt="식단" className="tab-icon" />
      </Link>
      <Link to="/settings">
        <img src={optionIcon} alt="설정" className="tab-icon" />
      </Link>
    </div>
  );
}