import { useState } from 'react';
import { Modal } from '../components/card-dark';

export function CardPage() {
  const [isOpen, setIsOpen] = useState(false);
  var [title, setTitle] = useState('Drink a capuchino');
  return (
    <>
      <button onClick={() => setIsOpen(v => !v)}>Show Popup</button>
      <Modal
        isOpen={isOpen}
        onHide={() => setIsOpen(false)}
        title={title}
        onChangeTitle={(e) => setTitle(e.target.value)}
      ></Modal>
    </>
  );
}