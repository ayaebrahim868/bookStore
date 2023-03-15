import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../Utils/utils-fr-tests";
import { book } from "../../Models/book.model";
import Types from "../../Store/Types";
import '@testing-library/jest-dom/extend-expect';
const data  = [
  {
    title: "Learning Web Development with React and Bootstrap",
    authors: ["Harmeet Singh", "Mehul Bhatt"],
    publishedDate: "2016-12-30",
    description:
      "Build real-time responsive web apps using React and BootstrapAbout This Book* Showcase the power of React-Bootstrap through real-world examples* Explore the benefits of integrating React with various frameworks and APIs* See the benefits of using the latest frameworks to make your web development experience enchantingWho This Book Is ForThis book is for anybody who is interested in modern web development and has intermediate knowledge of HTML, CSS, and JavaScript. Basic knowledge of any JavaScript MVC framework would also be helpful.What You Will Learn* See how to integrate React-Bootstrap with React* Explore the Redux architecture and understand its benefits* Build a custom responsive theme* Easily interact with DOM on your web browser* Appreciate the advantages of using JSX* Get acquainted with the various routing methods in React* Integrate external APIs into ReactIn DetailReact-Bootstrap is one of the most popular front-end frameworks, and integrating it with React allows web developers to write much cleaner code. This book will help you gain a thorough understanding of the React-Bootstrap framework and show you how to build impressive web apps.In this book, you will get an overview of the features of React-Bootstrap and ReactJS, along with the integration of ReactJS components with ReactJS. You will understand the benefits of using JSX and the Redux architecture. The server-side rendering of React will also be shown. All the concepts are explained by developing real-world examples.By the end of this book, you will be equipped to create responsive web applications using React-Bootstrap with ReactJS, and will have an insight into the best practices.",
    industryIdentifiers: [
      {
        type: "ISBN_10",
        identifier: "1786462494",
      },
      {
        type: "ISBN_13",
        identifier: "9781786462497",
      },
    ],
    readingModes: {
      text: false,
      image: false,
    },
    pageCount: 278,
    printType: "BOOK",
    maturityRating: "NOT_MATURE",
    allowAnonLogging: false,
    contentVersion: "preview-1.0.0",
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false,
    },
    imageLinks: {
      smallThumbnail:
        "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
      thumbnail:
        "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    },
    language: "en",
    previewLink:
      "http://books.google.com/books?id=sJf1vQAACAAJ&dq=redux+react&hl=&cd=6&source=gbs_api",
    infoLink:
      "http://books.google.com/books?id=sJf1vQAACAAJ&dq=redux+react&hl=&source=gbs_api",
    canonicalVolumeLink:
      "https://books.google.com/books/about/Learning_Web_Development_with_React_and.html?hl=&id=sJf1vQAACAAJ",
    id: "sJf1vQAACAAJ",
    shelf: "currentlyReading",
  },
];
const handleSelectionChange = (
  event: React.ChangeEvent<HTMLSelectElement>,
  b: book
) => {};
describe("BookShelvesList", () => {
  test("render content of bookshelves", () => {
     //arrange
    renderWithProviders(
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <hr className="hr"></hr>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {data.map((book: book, i: number) => {
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
                                  onChange={(e) =>
                                    handleSelectionChange(e, book)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
                                  <option value="move" hidden>
                                    ....
                                  </option>

                                  <option value={Types.CURRENTLY_READING}>
                                    {book.shelf === Types.CURRENTLY_READING &&
                                      `✓`}{" "}
                                    Currently Reading
                                  </option>

                                  <option value={Types.WANT_TO_READ}>
                                    {" "}
                                    {book.shelf === Types.WANT_TO_READ &&
                                      `✓`}{" "}
                                    Want To Read
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
            </div>
          </div>
        </div>
      </div>
    );
    //act
    const heading = screen.queryByText("MyReads");
    const title = screen.queryByText(data[0].title);
    const author = screen.queryByText(data[0].authors[0]);
    const author2 = screen.queryByText(data[0].authors[1]);
    const thumbnail = screen.queryByText(data[0].imageLinks.thumbnail);
    //assert
    expect(heading).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(author2).toBeInTheDocument();
    expect(thumbnail).toBeDefined();
  });
});
