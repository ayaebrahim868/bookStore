import React, { useRef, useEffect, useState } from "react";
import { getAll } from "../../Utils/BooksAPI";
import { book } from "../../Models/book.model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/index";
import { currentlyReadingAction } from "../../Reducers/CurrentlyReadingSlice";
import { readAction } from "../../Reducers/ReadSlice";
import { wantToReadAction } from "../../Reducers/WantTReadSlice";
import { Link } from "react-router-dom";
import BookShelve from "../bookShelve/BookShelve";
import Types from "../../Store/Types";
import Spinner from "../Spinner/spinner.component";
import "./BookShelvesList.css";
let data: book[] = [];
const BookShelvesList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const shouldNotReRender = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  // remve data in unmount to prevent data duplication n remount 
  useEffect(() => {
    if (shouldNotReRender.current === true) {
      shouldNotReRender.current = false;
      getAll().then((bookShelves) => {
        data = bookShelves;
        bookShelves.forEach((b: book) => {
          if (b.shelf === Types.CURRENTLY_READING) {
            dispatch(currentlyReadingAction.currentlyReading(b));
          } else if (b.shelf === Types.WANT_TO_READ) {
            dispatch(wantToReadAction.wantToRead(b));
          } else {
            dispatch(readAction.read(b));
          }
          setIsLoading(false);
        });
      });
    }
    return () => {
      shouldNotReRender.current = true;
      data.forEach((b: book) => {
        if (b.shelf === Types.CURRENTLY_READING) {
          dispatch(currentlyReadingAction.removeCurrentlyReading(b));
        } else if (b.shelf === Types.WANT_TO_READ) {
          dispatch(wantToReadAction.removeWantTORead(b));
        } else {
          dispatch(readAction.removeRead(b));
        }
      });
    };
  }, []);



  // select store data
  const currentlyReading: book[] = useSelector<RootState, book[]>(
    (state: RootState) => state.currentlyReadingReducer.currentlyReading
  );
  const read: book[] = useSelector<RootState, book[]>(
    (state: RootState) => state.readReducer.read
  );
  const wantToRead: book[] = useSelector<RootState, book[]>(
    (state: RootState) => state.wantToReadReducer.wantToRead
  );
  const none: book[] = useSelector<RootState, book[]>(
    (state: RootState) => state.wantToReadReducer.none
  );


// gathering shelves Data
  const BookShelves = {
    read,
    wantToRead,
    currentlyReading,
    none,
  };

  // cnditional rendering of spinner in case data nt loaded and shelves in case data loaded
  return (
    <React.Fragment>
      {isLoading &&
        <div>
          <Spinner />
        </div>
      }
      {!isLoading &&
        <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelve
                  data={BookShelves.currentlyReading}
                  title="Currently Reading"
                />
                <BookShelve data={BookShelves.wantToRead} title="Want to Read" />
                <BookShelve data={BookShelves.read} title="Read" />
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search"></Link>
          </div>
        </div>}

    </React.Fragment>
  )
};

export default React.memo(BookShelvesList);
