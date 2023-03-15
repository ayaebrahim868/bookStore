import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookShelve from "../bookShelve/BookShelve";
import { search, getAll } from "../../Utils/BooksAPI";
import { useDispatch, useSelector } from "react-redux";
import { book } from "../../Models/book.model";
import { RootState } from "../../Store";
import { currentlyReadingAction } from "../../Reducers/CurrentlyReadingSlice";
import { wantToReadAction } from "../../Reducers/WantTReadSlice";
import { readAction } from "../../Reducers/ReadSlice";
import Types from "../../Store/Types";
import "./Search.css";

const Search: React.FC<any> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // selecting data from store

  const currentlyReading: book[] = useSelector<RootState, book[]>(
    (state: RootState) => state.currentlyReadingReducer.currentlyReading
  );
  const read: book[] = useSelector<RootState, book[]>(
    (state: RootState) => state.readReducer.read
  );
  const wantToRead: book[] = useSelector<RootState, book[]>(
    (state: RootState) => state.wantToReadReducer.wantToRead
  );

  let [searchedBooks, setSearchedBooks] = useState([]);
  let data: book[] = [];

  // add data as it is removed when component unmount :( remove data in unmount to prevent data duplication n remount
  useEffect(() => {
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
      });
    });
    return () => {
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

  // handle Textinput change 
  const changeHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if ((e.target as HTMLInputElement).value !== "" && e.code === "Enter") {
        search((e.target as HTMLInputElement).value).then((res) => {
          if (res.length) {
            let mappedData = res?.map((book: book) => {
              const cr = currentlyReading.map((crbooks) => {
                if (book.title === crbooks.title) {
                  book.shelf = crbooks.shelf;
                  return { crbooks };
                }
                return book;
              });
              const wr = wantToRead.map((wtrbooks) => {
                if (book.title === wtrbooks.title) {
                  book.shelf = wtrbooks.shelf;
                  return { wtrbooks };
                }
                return book;
              });
              const rb = read.map((rbooks) => {
                if (book.title === rbooks.title) {
                  book.shelf = rbooks.shelf;
                  return { rbooks };
                }
                return book;
              });
              return { ...book, ...cr, ...wr, ...rb };
            });
            setSearchedBooks(mappedData);
          } else {
            setSearchedBooks([]);
          }
        });
      } else {
        setSearchedBooks([]);
      }
    },
    [read, wantToRead, currentlyReading]
  );
  // let browser go back
  const goback = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={goback}></button>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onKeyUp={(e) => changeHandler(e)}
            />
          </div>
        </div>
      </div>
      {searchedBooks && <BookShelve data={searchedBooks}></BookShelve>}
    </div>
  );
};
export default React.memo(Search);
