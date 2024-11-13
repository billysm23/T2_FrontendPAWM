import React, { useState } from 'react';
import styles from '../../styles/Quiz.module.css';

const DragDrop = ({ question, onChange, value }) => {
  const [items, setItems] = useState(question.options);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    const itemsCopy = [...items];
    const draggedItemIndex = items.findIndex(i => i._id === draggedItem._id);
    
    // Swap items
    itemsCopy.splice(draggedItemIndex, 1);
    itemsCopy.splice(index, 0, draggedItem);
    
    setItems(itemsCopy);
    onChange(itemsCopy.map(item => item._id));
  };

  return (
    <div className={styles.question}>
      <h2>
        <span className={styles.questionNumber}>{question.order}</span>
        {question.question_text}
      </h2>

      <div className={styles.sortableList}>
        {items.map((item, index) => (
          <div
            key={item._id}
            className={styles.sortableItem}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={(e) => handleDragOver(e, index)}
            data-order={index + 1}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDrop;