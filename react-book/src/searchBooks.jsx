import React, { useRef, useState, useContext } from "react";
import { useTransition, useSpring, animated, config } from "react-spring";
import { useQuery } from "micro-graphql-react";

import Stack from "./layout/Stack";
import FlowItems from "./layout/FlowItems";

import Modal, { ModalSizingContext } from "./modal";

import { useHeight } from "./useHeight";

const SEARCH_BOOKS_QUERY = `
query HomeModuleBooks(
  $title: String
) {
  allBooks(
    LIMIT: 20,
    SORT: { title: 1 }
    title_contains: $title
  ) {
    Books { _id, title, isbn, smallImage, authors }
  }
}

`;

export default function SearchBooks(props) {
  const { selectedBooksMap, selectBook } = props;
  const [searchText, setSearchText] = useState("");
  const [active, setActive] = useState("");

  const beginSearch = text => {
    setSearchText(text);
    setActive(true);
  };
  window.beginSearch = beginSearch;

  const GQLPacket = useQuery(
    SEARCH_BOOKS_QUERY,
    { title: searchText },
    { active }
  );

  return (
    <Modal isOpen={props.isOpen} onHide={props.onHide} headerCaption={"Search"}>
      <SearchBooksContent
        {...{
          GQLPacket,
          selectedBooksMap,
          selectBook,
          searchText,
          beginSearch
        }}
      />
    </Modal>
  );
}

const SearchBooksContent = props => {
  const {
    GQLPacket,
    selectedBooksMap,
    selectBook,
    searchText,
    beginSearch
  } = props;
  const { loading, loaded, data } = GQLPacket;

  const searchBox = useRef(null);

  const booksObj = data?.allBooks;
  const bookResults = data?.allBooks?.Books ?? [];
  const allSelected =
    bookResults.length && !bookResults.find(b => !selectedBooksMap[b._id]);

  const resultsTransition = useTransition(booksObj, {
    config: { ...config.default },
    from: {
      opacity: 0,
      position: "static",
      transform: "translate3d(0%, 0px, 0px)"
    },
    enter: {
      opacity: 1,
      position: "static",
      transform: "translate3d(0%, 0px, 0px)"
    },
    leave: {
      opacity: 0,
      position: "absolute",
      transform: "translate3d(90%, 0px, 0px)"
    }
  });

  const keyDown = evt => {
    if (evt.keyCode === 13) {
      beginSearch(evt.target.value);
    }
  };

  const noResults = !!(loaded && !bookResults?.length);
  const noResultsTransition = useTransition(noResults, {
    config: { ...config.default },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const allSelectedTransition = useTransition(allSelected, {
    config: { ...config.default },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <div>
      <FlowItems>
        <input
          style={{ flex: 1 }}
          className="form-control"
          onKeyDown={keyDown}
          defaultValue={searchText}
          ref={searchBox}
        />
        <button
          onClick={() => beginSearch(searchBox.current.value)}
          className="btn btn-default"
          style={{ width: "6ch" }}
        >
          {loading ? (
            <i className="fa fa-fw fa-spin fa-spinner" />
          ) : (
            <i className="fa fa-search" />
          )}
        </button>
      </FlowItems>

      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          marginTop: "20px",
          position: "relative",
          maxHeight: "300px"
        }}
      >
        <div className="overlay-holder">
          {resultsTransition((styles, booksObj) =>
            booksObj?.Books?.length ? (
              <animated.div style={styles}>
                {booksObj.Books.map(book => (
                  <SearchResult
                    key={book._id}
                    book={book}
                    selected={selectedBooksMap[book._id]}
                    selectBook={selectBook}
                    dispatch={props.dispatch}
                  />
                ))}
              </animated.div>
            ) : null
          )}
          {noResultsTransition((styles, noResults) =>
            noResults ? (
              <animated.div style={styles}>
                <div className="alert alert-warning">No results</div>
              </animated.div>
            ) : null
          )}

          {allSelectedTransition((styles, allSelected) =>
            allSelected ? (
              <animated.div style={styles}>
                <div className="alert alert-info">
                  You've selected all the books from these results
                </div>
              </animated.div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

const SearchResult = props => {
  const { enable: enableModalSizing, disable: disableModalSizing } = useContext(
    ModalSizingContext
  );
  let { book, selectBook, selected } = props;

  const initiallySelected = useRef(selected);

  const [sizingRef, currentHeight] = useHeight();
  const uiReady = useRef(false);

  const heightStyles = useSpring({
    config: { ...config.stiff, clamp: true },
    from: {
      opacity: initiallySelected.current ? 0 : 1,
      height: initiallySelected.current ? 0 : currentHeight,
      transform: "translate3d(0%, 0px, 0px)"
    },
    to: {
      opacity: selected ? 0 : 1,
      height: selected ? 0 : currentHeight,
      transform: `translate3d(${selected ? "25%" : "0%"},0px,0px)`
    },
    onStart() {
      if (uiReady.current) {
        disableModalSizing();
      }
    },
    onRest() {
      uiReady.current = true;
      setTimeout(() => {
        enableModalSizing();
      });
    }
  });

  return (
    <animated.div style={{ ...heightStyles, overflow: "hidden" }}>
      <div
        ref={sizingRef}
        style={{ marginRight: "10px", height: selected ? 0 : "auto" }}
      >
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
                onClick={() => selectBook(book)}
                className="btn btn-primary btn-xs"
              >
                Add to list
              </button>
            </Stack>
          </FlowItems>
          <hr />
        </Stack>
      </div>
    </animated.div>
  );
};
