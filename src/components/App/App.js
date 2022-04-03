import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import styles from './style/App.module.css';
import ColorPicker from '../ColorPicker/ColorPicker';
import Footer from '../Footer/Footer';

function App() {
  const [markDown, setMarkDown] = useState("### Enter your markdown here...");
  const [currentColorBtn, setColorBtn] = useState();
  const [inputTxt, setInputTxt] = useState();
  const [outputTxt, setOutputTxt] = useState();
  const themeColors = [
      {
        id: 0, 
        bgColor: "#3a3a3a",
        color: "#fff"
      },
      {
        id: 1,
        bgColor: "#fff",
        color: "#000"
      },
      {
        id: 2, 
        bgColor: "#7effdb",
        color: "#000"
      },
      {
        id: 3, 
        bgColor: "#ff9de2",
        color: "#000"
      },
      {
        id: 4, 
        bgColor: "purple",
        color: "#fff"
      },
      {
        id: 5, 
        bgColor: "#ffe477",
        color: "#000"
      }
  ];
  const handleClear = () => {
    inputTxt.value = "";
    setMarkDown("");
  }

  const handleColor = e => {
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
            {themeColors.map((color) => 
              <ColorPicker 
                key={color.id} 
                bgColor={color.bgColor} 
                color={color.color} 
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
