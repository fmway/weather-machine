import { useLocation,Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons/faCloudSun";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import '../css/Navbar.css'
export default function Navbar(){
  const lokasi=useLocation();
  const aktifKah=(path:string)=>{
    return lokasi.pathname===path?'active':'';
  };
  return(
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon"><FontAwesomeIcon icon={faCloudSun} /></span>
          Weather Machine
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${aktifKah('/')}`}>
              <span className="logo-icon"><FontAwesomeIcon icon={faHome} /></span>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/forecast" className={`nav-link ${aktifKah('/forecast')}`}>
              <span className="logo-icon"><FontAwesomeIcon icon={faCalendar} /></span>
              Forecast
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${aktifKah('/about')}`}>
              <span className="logo-icon"><FontAwesomeIcon icon={faInfo} /></span>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
