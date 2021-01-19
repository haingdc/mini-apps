import React from "react";
import Stack from "./layout/Stack";
import FlowItems from "./layout/FlowItems";

const RecommendedBook = props => {
  let { book } = props;
  const link = `https://www.amazon.com/gp/product/${book.isbn}/?tag=zoomiec-20`;

  return (
    <div>
      <div>
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
                {book.isbn ? (
                  <a href={link} target="_new">
                    <i className="fab fa-amazon" />
                  </a>
                ) : null}
              </div>
            </Stack>
          </FlowItems>
          <div>
            <hr />
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default RecommendedBook;
