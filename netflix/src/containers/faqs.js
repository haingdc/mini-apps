import React from 'react';
import { Accordion, OptForm } from '../components';
import FAQs from '../fixtures/faqs.json';

export function FaqsContainer () {
  var [openId, setOpenId] = React.useState(-1);
  function handleToggle(id) {
    if (id === openId) {
      setOpenId(-1);
    } else {
      setOpenId(id);
    }
  }
  return (
    <Accordion>
      <Accordion.Title>Frequently Asked Questions</Accordion.Title>
      {FAQs.map(item =>
        <Accordion.Item key={item.id} toggleShow={openId === item.id} onToggle={handleToggle} id={item.id}>
          <Accordion.Header>
            {item.header}
          </Accordion.Header>
          <Accordion.Body>
            <div>
              {item.body}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      )}
      <OptForm>
        <OptForm.Input placeholder="Email Address" />
        <OptForm.Button>Try it now</OptForm.Button>
        <OptForm.Break />
        <OptForm.Text>Ready to watch? Enter your email to create or restart your membership</OptForm.Text>
      </OptForm>
    </Accordion>
  );
}