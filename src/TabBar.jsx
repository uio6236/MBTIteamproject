// src/components/TabBar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function TabBar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t flex justify-around py-2 text-center">
      <Link to="/">
        <img src="/images/home.png" alt="홈" className="w-6 h-6 mx-auto" />
      </Link>
      <Link to="/sports">
        <img src="/images/sport.png" alt="운동" className="w-6 h-6 mx-auto" />
      </Link>
      <Link to="/foods">
        <img src="/images/food.png" alt="음식" className="w-6 h-6 mx-auto" />
      </Link>
      <Link to="/settings">
        <img src="/images/option.png" alt="설정" className="w-6 h-6 mx-auto" />
      </Link>
    </div>
  );
}
