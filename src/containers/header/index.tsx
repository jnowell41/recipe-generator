import { useAppSelector } from "../../app/hooks";
import HomeButton from "../../components/homeButton";
import styles from './header.module.css';

const Header = () => {

    return (
        <header className={styles.header}>
            <HomeButton/>
        </header>
    )
}
export default Header;