# Getting Started with Create React App
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
# MyReads Project

This is a mini bokstore project where you have staus shelves :
### 1- currently reading `when yu are reading the bok in the current time`
### 2- want to read `when u want t add the bok t your favourites`
### 3- read `when you already read it`

<image src='https://images.app.goo.gl/EerH9Joff7Rp3VQY9' width='200' height='200'/>
- you can also search for any book type and add it to you shelves ;) put u must press enter

# project files Map

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.tsx # This is the root of your app. Contains static HTML right now.
    ├── App.test.tsx # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
        # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.tsx # You should not need to modify this file. It is used for DOM rendering only.
    |___Store
    |________index.tsx # contain store configure
    |_________Types.tsx # Types constants
    |
    |___Reducers
    |________CurrentlyReadingSlice.tsx # Contains slice for currently reading reducers and actions
    |________ReadSlice.tsx   ## # Contains slice for read reducers and actions
    |________WantTreadSlice.tsx  ### # Contains slice for want to read reducers and actions
    |________noneReadingSlice.tsx  # Contains slice for not reading reducers and actions
    |___Models
    |________book.model.tsx  # Contains book model
    |________ShelvesList.model.tsx  # Contains models for shelvelists
    |__Utils
    |________BooksApi.js  # contain backend calls
    |________utils-fr-tests.tsx  # wrapper for testing to be able to wrap cmponent with store provider
    |__Components
    |____bookSheleve
    |______bookshelve.css  # Contains styling for book shelve
    |______BookShelve.test.tsx #  # Contains TEST for bookshelve
    |______BookShelve.tsx  # Contains bookshelve component logic and workarunds
    |
    |_____BookShelvesList
    |_______BookShelvesList.css # Contains styling for book shelves list
    |_______BookShelvesList.test.tsx #Contain Test for bokshelviesList compnent
    |_______BookShelvesList.tsx  # Contains  component logic and workarunds for Bookshelveslist component
     |_____Search
    |_______Search.css # Contains styling for book search component
    |_______Search.test.tsx #Contain Test for Search compnent
    |_______Search.tsx  # Contains  component logic and workarunds for Search component