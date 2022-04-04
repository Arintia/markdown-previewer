import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import styles from './style/App.module.css';
import ColorPicker from '../ColorPicker/ColorPicker';
import Footer from '../Footer/Footer';
import themeColors from '../../utils/themecolors';

function App() {
  const [markDown, setMarkDown] = useState("### Enter your markdown here...");
  const [currentColorBtn, setColorBtn] = useState();
  const [inputTxt, setInputTxt] = useState();
  const [outputTxt, setOutputTxt] = useState();
  
  const handleClear = () => {
    inputTxt.value = "";
    setMarkDown("");
  }

  const handleColor = e => {
    if(currentColorBtn === e.target) return;
    currentColorBtn.classList.toggle(styles.active);
    setColorBtn(e.target);
    const bgColor = e.target.dataset.bgcolor;
    const textColor = e.target.dataset.color;
    inputTxt.style.backgroundColor = bgColor;
    inputTxt.style.color = textColor;
    outputTxt.style.backgroundColor = bgColor;
    outputTxt.style.color = textColor;
  }

  useEffect(() => {
    const md = new MarkdownIt();
    const outputDiv = document.getElementsByClassName(styles.outputArea)[0];
    outputDiv && (outputDiv.innerHTML = md.render(markDown));
  }, [markDown]);

  useEffect(() => {
    setInputTxt(document.getElementsByClassName(styles.inputArea)[0]);
    setOutputTxt(document.getElementsByClassName(styles.outputArea)[0]);
  }, []);

  useEffect(() => {
    currentColorBtn && (currentColorBtn.classList.toggle(styles.active));
  }, [currentColorBtn])

  return (
    <>
      <main className={styles.appContainer}>
        <h1 className={styles.appHeader}>Markdown Previewer</h1>
        <div className={styles.inputAreaContainer}>
          <div className={styles.colorContainer}>
            {themeColors.map(({id, bgColor, color}) => 
              <ColorPicker 
                key={id} 
                bgColor={bgColor} 
                color={color} 
                handleColor={handleColor}
                setColorBtn={setColorBtn}
                currentColorBtn={currentColorBtn} 
              />
            )}
          
          </div>
          <textarea className={styles.inputArea} value={markDown} onChange={(e) => setMarkDown(e.target.value)}></textarea>
          <button className={styles.clearButton} onClick={handleClear}>Clear</button>
          <div className={styles.outputArea}></div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
