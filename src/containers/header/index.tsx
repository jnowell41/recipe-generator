import { useAppSelector } from "../../app/hooks";
import HomeButton from "../../components/homeButton";
import ShareButton from '../../components/shareButton';
import styles from './header.module.css';


const Header = () => {

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <HomeButton/>
                <ShareButton/>
            </div>
        </header>
    )
}
export default Header;