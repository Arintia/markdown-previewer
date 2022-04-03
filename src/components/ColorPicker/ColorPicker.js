import { useEffect } from 'react';
import styles from './style/ColorPicker.module.css';
function ColorPicker({handleColor, bgColor, color, setColorBtn, currentColorBtn}) {
    useEffect(() => {
        setColorBtn(document.getElementsByClassName(styles.colorPicker)[0]);
        currentColorBtn && (currentColorBtn.style.border = "5px solid #137de7");
    }, []);
    return (
        <>
            <button 
                style={{backgroundColor: bgColor}} 
                className={styles.colorPicker} 
                data-bgcolor = {bgColor}
                data-color={color}
                onClick={handleColor}
            >
            </button>
        </>
    )
}

export default ColorPicker;