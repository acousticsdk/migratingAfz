import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './FaqManager.module.css';
import useFaqStore from '../../../store/faqStore';

function FaqManager() {
  const { faqs, loading, error, fetchFaqs, addFaq, updateFaq, deleteFaq, reorderFaqs } = useFaqStore();
  const [editingFaq, setEditingFaq] = useState(null);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', id: '' });

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  useEffect(() => {
    if (editingFaq) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editingFaq]);

  const resetForm = () => {
    setEditingFaq(null);
    setNewFaq({ question: '', answer: '', id: '' });
  };

  const showNotification = (message, isError = false) => {
    const notification = document.createElement('div');
    notification.className = `${styles.notification} ${isError ? styles.error : ''}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add(styles.fadeOut);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingFaq) {
        await updateFaq(editingFaq);
        showNotification('Вопрос успешно обновлен');
      } else {
        await addFaq({ ...newFaq, id: Date.now().toString() });
        showNotification('Новый вопрос добавлен');
      }
      resetForm();
    } catch (err) {
      showNotification('Ошибка при сохранении', true);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setNewFaq(faq);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот вопрос?')) {
      try {
        await deleteFaq(id);
        showNotification('Вопрос удален');
      } catch (err) {
        showNotification('Ошибка при удалении', true);
      }
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    try {
      await reorderFaqs(sourceIndex, destinationIndex);
      showNotification('Порядок вопросов обновлен');
    } catch (err) {
      showNotification('Ошибка при изменении порядка', true);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.faqManager}>
      <h2>Управление вопросами и ответами</h2>
      
      <form onSubmit={handleSubmit} className={styles.faqForm}>
        <div className={styles.formGroup}>
          <label>Вопрос:</label>
          <input
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Ответ:</label>
          <textarea
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
            required
            rows={5}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit">
            {editingFaq ? 'Сохранить изменения' : 'Добавить вопрос'}
          </button>
          {editingFaq && (
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              Отменить
            </button>
          )}
        </div>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="faq-list">
          {(provided) => (
            <div 
              className={styles.faqList}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {faqs.map((faq, index) => (
                <Draggable 
                  key={faq.id} 
                  draggableId={faq.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={styles.faqItem}
                    >
                      <div className={styles.dragHandle}>⋮⋮</div>
                      <div className={styles.faqContent}>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                        <div className={styles.faqActions}>
                          <button onClick={() => handleEdit(faq)}>Редактировать</button>
                          <button onClick={() => handleDelete(faq.id)} className={styles.deleteButton}>
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default FaqManager;