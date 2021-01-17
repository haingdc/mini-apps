import React, { useState } from 'react';
import { Modal } from '../components';

export default function Experimental() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="App">
      <div
        style={{ margin: "10px", display: "flex", justifyContent: "center" }}
      >
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
      </div>

      <Modal
        isOpen={isOpen}
        onHide={() => setIsOpen(false)}
        headerCaption={"Search"}
      >
        <h1>Hello World Hello World Hello World</h1>
      </Modal>
    </div>
  );
}