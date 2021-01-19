import React, { useRef, useLayoutEffect } from "react";
import Stack from "./layout/Stack";
import FlowItems from "./layout/FlowItems";
import { animated } from "react-spring";

import { useHeight } from "./useHeight";

const SelectedBook = props => {
  let { book, removeBook, styles, setDisplaySize } = props;

  const [ref, height] = useHeight();

  useLayoutEffect(() => {
    height && setDisplaySize(book._id, height);
  }, [height]);

  return (
    <animated.div style={{ ...styles, overflow: "hidden" }}>
      <div ref={ref} style={{ marginRight: "10px" }}>
        <Stack className={props.className}>
          <FlowItems>
            <div style={{ minWidth: "70px" }}>
              <img style={{ display: "block" }} src={book.smallImage} alt="" />
            </div>

            <Stack style={{ flex: 1, justifyContent: "space-between" }}>
              <div>
                <div>{book.title}</div>
                {book.authors && book.authors.length ? (
                  <div style={{ fontStyle: "italic", fontSize: "14px" }}>
                    {book.authors.join(", ")}
                  </div>
                ) : null}
              </div>
              <button
                style={{
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  minWidth: "14ch"
                }}
                onClick={() => removeBook(book)}
                className="btn btn-danger btn-xs"
              >
                Remove
              </button>
            </Stack>
          </FlowItems>
          <div>
            <hr />
          </div>
        </Stack>
      </div>
    </animated.div>
  );
};

export default SelectedBook;
