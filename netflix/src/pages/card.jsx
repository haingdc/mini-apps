import { useState } from 'react';
import { Modal } from '../components/card-dark';

export function CardPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(v => !v)}>Show Popup</button>
      <Modal
        isOpen={isOpen}
        onHide={() => setIsOpen(false)}
      ></Modal>
    </>
  );
}