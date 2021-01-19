import React, { useState, useMemo, useCallback } from "react";
import { useTransition, config } from "react-spring";

import SearchBooks from "./searchBooks";
import RecommendedBook from "./recommendedBook";
import SelectedBook from "./selectedBook";

import FlowItems from "./layout/FlowItems";

import ajaxUtil from "./ajaxUtil";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<Array<{ _id: string}>>([]);
  const selectBook = book => setSelectedBooks(books => books.concat(book));
  const removeBook = book =>
    setSelectedBooks(books => books.filter(b => b !== book));
  const selectedBooksMap = useMemo(
    () =>
      selectedBooks.reduce((hash, book) => ((hash[book._id] = true), hash), {}),
    [selectedBooks]
  );

  const [recommendations, setRecommendations] = useState<any[] | null>(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const getRecommendations = () => {
    setLoadingRecommendations(true);
    return ajaxUtil
      .post("https://mylibrary.io/book/getRecommendations", {
        bookIds: Object.keys(selectedBooksMap),
        publicUserId: "5b57f71b6871ae00145198ff"
      })
      .then(resp => {
        setLoadingRecommendations(false);
        setRecommendations(resp.results);
      });
  };

  const [displaySizes, setDisplaySizes] = useState({});
  const setDisplaySize = useCallback(
    (_id, height) => {
      setDisplaySizes(displaySizes => ({ ...displaySizes, [_id]: height }));
    },
    [setDisplaySizes]
  );

  const selectedBookTransitions = useTransition(selectedBooks, {
    config: book => ({
      ...config.stiff,
      clamp: !selectedBooksMap[book._id]
    }),
    from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
    enter: book => ({
      opacity: 1,
      height: displaySizes[book._id],
      transform: "translate3d(0%, 0px, 0px)"
    }),
    update: book => ({ height: displaySizes[book._id] }),
    leave: { opacity: 0, height: 0, transform: "translate3d(25%, 0px, 0px)" }
  });

  return (
    <div className="App">
      <FlowItems style={{ margin: "10px" }}>
        <button className="btn btn-default" onClick={() => setIsOpen(true)}>
          Open Modal
        </button>
        <button
          className="btn btn-default"
          onClick={() => (window as any).beginSearch("QQQQQ")}
        >
          Clear Modal Results
        </button>
        <button
          className="btn btn-default"
          onClick={() => (window as any).beginSearch("Jefferson")}
        >
          Force Modal Results
        </button>
        {selectedBooks.length ? (
          <button
            disabled={loadingRecommendations}
            onClick={getRecommendations}
            className="btn btn-primary"
            style={{ width: "30ch" }}
          >
            {loadingRecommendations ? (
              <>
                <span>Searching</span>
                <i className="margin-left fa fa-fw fa-spin fa-spinner" />
              </>
            ) : (
              <span>Get Recommendations</span>
            )}
          </button>
        ) : null}
      </FlowItems>
      <div style={{ display: "flex", padding: "10px" }}>
        <div style={{ flex: 1 }}>
          {selectedBookTransitions((styles, book) => (
            <SelectedBook
              setDisplaySize={setDisplaySize}
              styles={styles}
              removeBook={removeBook}
              book={book}
            />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {!recommendations ? null : recommendations.length ? (
            <div>
              {recommendations.map(book => (
                <RecommendedBook book={book} />
              ))}
            </div>
          ) : (
            <div style={{ alignSelf: "start" }}>
              <div className="alert alert-warning">No results</div>
            </div>
          )}
        </div>
      </div>

      <SearchBooks
        isOpen={isOpen}
        onHide={() => setIsOpen(false)}
        selectedBooksMap={selectedBooksMap}
        selectBook={selectBook}
      />
    </div>
  );
}
