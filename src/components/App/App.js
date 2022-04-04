import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import styles from './style/App.module.css';
import ColorPicker from '../ColorPicker/ColorPicker';
import Footer from '../Footer/Footer';
import themeColors from '../../utils/themecolors';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd' ;

function App() {
  const [markDown, setMarkDown] = useState("### Enter your markdown here...");
  const [currentColorBtn, setColorBtn] = useState();
  const [inputTxt, setInputTxt] = useState();
  const [outputTxt, setOutputTxt] = useState();
  const [colors, setColors] = useState(themeColors);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(colors);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setColors(items);
  }
    

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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <main className={styles.appContainer}>
        <h1 className={styles.appHeader}>Markdown Previewer</h1>
        <div className={styles.inputAreaContainer}>
          <div className={styles.colorContainer}>
            <Droppable droppableId="colors">
              {(provided) => (
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {colors.map(({id, bgColor, color}, index) => 
                    <li key={id}>
                      <Draggable draggableId={id.toString()} index={index}>
                        {(provided) => (
                          <div 
                            className={styles.colorButton} 
                            ref={provided.innerRef}
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps} 
                          >
                            <ColorPicker 
                              id={id}
                              index={index}
                              bgColor={bgColor} 
                              color={color} 
                              handleColor={handleColor}
                              setColorBtn={setColorBtn}
                              currentColorBtn={currentColorBtn} 
                            />
                          </div>
                        )}
                      </Draggable>
                    </li>
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <textarea className={styles.inputArea} value={markDown} onChange={(e) => setMarkDown(e.target.value)}></textarea>
          <button className={styles.clearButton} onClick={handleClear}>Clear</button>
          <div className={styles.outputArea}></div>
        </div>
      </main>
      <Footer />
    </DragDropContext>
  );
}

export default App;
