import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import styles from './style/App.module.css';

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
    currentColorBtn.style.border = "5px solid #000";
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
    setColorBtn(document.getElementsByClassName(styles.colorPicker)[0]);
    currentColorBtn && (currentColorBtn.style.border = "5px solid #137de7");
  }, []);

  useEffect(() => {
    currentColorBtn && (currentColorBtn.style.border = "5px solid #137de7");
  }, [currentColorBtn])

  return (
    <main className={styles.appContainer}>
      <h1 className={styles.appHeader}>Markdown Previewer</h1>
      <div className={styles.inputAreaContainer}>
        <div className={styles.colorContainer}>
          <button 
            style={{backgroundColor: "#fff"}} 
            className={styles.colorPicker} 
            data-bgcolor="#fff"
            data-color="#000"
            onClick={handleColor}
          >
          </button>
          <button 
            style={{backgroundColor: "#3a3a3a"}} 
            className={styles.colorPicker} 
            data-bgcolor="#3a3a3a"
            data-color="#fff"
            onClick={handleColor}
          >
          </button>
          <button 
            style={{backgroundColor: "#7effdb"}} 
            className={styles.colorPicker} 
            data-bgcolor="#7effdb "
            data-color="#000"
            onClick={handleColor}
          >
          </button>
          <button 
            style={{backgroundColor: "#ff9de2 "}} 
            className={styles.colorPicker} 
            data-bgcolor="#ff9de2 "
            data-color="#000"
            onClick={handleColor}
          >
          </button>
          <button 
            style={{backgroundColor: "purple"}}
            className={styles.colorPicker} 
            data-bgcolor="purple"
            data-color="#fff"
            onClick={handleColor}
          >
          </button>
          <button 
            style={{backgroundColor: "#ffe477"}} 
            className={styles.colorPicker} 
            data-bgcolor="#ffe477"
            data-color="#000"
            onClick={handleColor}
          >
          </button>
        </div>
        <textarea className={styles.inputArea} value={markDown} onChange={(e) => setMarkDown(e.target.value)}></textarea>
        <button className={styles.clearButton} onClick={handleClear}>Clear</button>
        <div className={styles.outputArea}></div>
      </div>
    </main>
  );
}

export default App;
