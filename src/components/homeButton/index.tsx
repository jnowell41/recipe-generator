import { Link } from 'react-router-dom';
import styles from './home.module.css';

const HomeButton:React.FC = () => {


    return (
        <Link to="/">
            <svg className={styles.svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100">
                <path
                d="M13.31 43.49v49.35h27.78V73.38h17.82v19.46h27.78V43.49H13.31zM80.97 32.59 50 7.16 19.03 32.59l-5.72 4.69-7.56 6.21h88.5l-7.56-6.21-5.72-4.69"
                style={{
                    fill: '#000',
                    stroke: '#1d1d1b',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '5px',
                }}/>
            </svg>
        </Link>
    );
}
export default HomeButton;