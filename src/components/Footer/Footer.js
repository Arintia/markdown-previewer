import styles from './style/Footer.module.css';
import LineIcon from "react-lineicons";
function Footer() {
    return (
        <footer>
            <p>Made by <a className={styles.name} href="https://github.com/arintia">Yiğit ATAK</a></p>
            <a className={styles.github} href="https://github.com/Arintia/markdown-previewer">
            <LineIcon 
                name="github" 
                style={{position: "absolute", right: "0", marginRight: "15px", fontSize: "2rem"}}
            />
            </a>
        </footer>
    )
}

export default Footer;