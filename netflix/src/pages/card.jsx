import { useState } from 'react';
import CardDark, { Modal } from '../components/card-dark';

export function CardPage() {
  var [isOpen, setIsOpen] = useState(false);
  var [title, setTitle] = useState('Drink a capuchino');
  var onHide = () => setIsOpen(false);
  var onChangeTitle = (event) => setTitle(event.target.value);

  return (
    <>
      <button onClick={() => setIsOpen(v => !v)}>Show Popup</button>
      <Modal
        isOpen={isOpen}
        onHide={onHide}
        title={title}
        onChangeTitle={onChangeTitle}
      >
        <CardDark
          onHide={onHide}
          title={title}
          onChangeTitle={onChangeTitle}
        />
      </Modal>
    </>
  );
}