import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentlyReadingAction } from "../../Reducers/CurrentlyReadingSlice";
import { readAction } from "../../Reducers/ReadSlice";
import { wantToReadAction } from "../../Reducers/WantTReadSlice";
import { book } from '../../Models/book.model';
import { noneAction } from "../../Reducers/noneReadingSlice";
import Types from "../../Store/Types";
import { RootState } from "../../Store";
import { update } from "../../Utils/BooksAPI";
import "./bookShelve.css";

const BookShelve: React.FC<any> = (props: { data: book[]; title: string }) => {
  let data = props.data;
  // select shelves data from store

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
    (state: RootState) => state.noneReducer.none
  );

  useEffect(
    useCallback(() => {
      if (props.title === "Want to Read") {
        data = wantToRead;
      } else if (props.title === "Currently Reading") {
        data = currentlyReading;
      } else if (props.title === "Read") {
        data = read;
      } else data = data;
    }, [currentlyReading, read, wantToRead, none, props])
  );

  const dispatch = useDispatch();

  // handleSelectionChange 
  const handleSelectionChange =useCallback((event: React.ChangeEvent<HTMLSelectElement>, b: book) => {
      if (event.target.value === Types.CURRENTLY_READING) {
        b.shelf = Types.CURRENTLY_READING;
        update(b, Types.CURRENTLY_READING).then((res) => {
          console.log(res);
        });
        dispatch(currentlyReadingAction.removeCurrentlyReading(b));
        dispatch(currentlyReadingAction.currentlyReading(b));
        dispatch(wantToReadAction.removeWantTORead(b));
        dispatch(readAction.removeRead(b));
      }
      if (event.target.value === Types.READ) {
        b.shelf =Types.READ;
        update(b, Types.READ).then((res) => {
          console.log(res);
        });
        dispatch(readAction.removeRead(b));
        dispatch(readAction.read(b));
        dispatch(currentlyReadingAction.removeCurrentlyReading(b));
        dispatch(wantToReadAction.removeWantTORead(b));
      }
      if (event.target.value === Types.WANT_TO_READ) {
        b.shelf = Types.WANT_TO_READ;
        update(b, Types.WANT_TO_READ).then((res) => {
          console.log(res);
        });
        dispatch(wantToReadAction.removeWantTORead(b));
        dispatch(wantToReadAction.wantToRead(b));
        dispatch(currentlyReadingAction.removeCurrentlyReading(b));
        dispatch(readAction.removeRead(b));
      }
      if (event.target.value === Types.NONE) {
        b.shelf =Types.NONE;
        update(b, Types.NONE).then((res) => {
          console.log(res);
        });
        dispatch(currentlyReadingAction.removeCurrentlyReading(b));
        dispatch(wantToReadAction.removeWantTORead(b));
        dispatch(readAction.removeRead(b));
        dispatch(noneAction.none(b));
      }
    },[dispatch]
  );

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props?.title}</h2>
      <hr className="hr"></hr>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {data?.map((book: book, i: number) => {
            return (
              <li key={i}>
                <div className="book">
                  <div className="book-top">
                    {book?.imageLinks?.thumbnail !== undefined && (
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
                        }}
                      />
                    )}
                    <div className="book-shelf-changer">
                      <select
                        name="booksSelection"
                        value={
                          book?.shelf === Types.WANT_TO_READ
                            ? Types.WANT_TO_READ
                            : book?.shelf === Types.CURRENTLY_READING
                            ? Types.CURRENTLY_READING
                            : book?.shelf === Types.READ
                            ? Types.READ
                            : Types.NONE
                        }
                        onChange={(e) => handleSelectionChange(e, book)}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="move" hidden>
                          ....
                        </option>

                        <option value={Types.CURRENTLY_READING}>
                          {book.shelf === Types.CURRENTLY_READING && `✓`}{" "}
                          Currently Reading
                        </option>

                        <option value={Types.WANT_TO_READ}>
                          {" "}
                          {book.shelf === Types.WANT_TO_READ && `✓`} Want To
                          Read
                        </option>
                        <option value={Types.READ}>
                          {book.shelf === Types.READ && `✓`} Read
                        </option>
                        <option value={Types.NONE}>None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book?.title}</div>
                  {book?.authors?.map((b) => (
                    <div className="book-authors" key={b}>
                      {b}
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelve;
