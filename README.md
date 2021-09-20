## Categorizer


Categorizer is a tool that helps you categorize your financial statements and visualize them. The end goal for this project is to be able to import a large amount of transactions via .CSV file, categorize them into similar groups based on Transaction name and then export the categorized file for personal storage. This tool is not meant for storing large amounts of data for a long time.

Current stack:

React + Redux + Material UI 

Express + NodeJS + Multer

MongoDB

## Project Status

#### Current features:

This project is currently in development. User can categorize the added transactions, however the categories can be added via UI but transactions can not (yet). 

#### Future functionality roadmap
- [ ] Dashboard (based on currrently stored transactions)
    - [ ] Working summary elements (Income, Expenses, Budget, Savings)
    - [ ] Expense Categories visualization via barchart
    - [ ] Currently stored transactions filtering via Calendar component
- [ ] Categories
    - [x] Add and store Categories in db
- [ ] Transactions
    - [x] Transaction categorizing functionality
    - [x] Multi-add transactions via .csv
    - [ ] Export categorized transactions to new .csv file
    - [ ] Functional filtering system in Transactions view
- [ ] Reports
    - [ ] Currently no idea what to do here, but some more thorough statistics would be fun.
        



## Project Screen Shot(s)

#### Example:   

![Dashboard](https://i.ibb.co/JnmxWSL/dashboard.png)

![Transactions](https://i.ibb.co/KNLd41L/transactions.png)

![Categories](https://i.ibb.co/dWcHzGt/categories.png)

## Installation and Setup Instructions

#### Prerequisites:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Currently you will need your own MongoDB Atlas instance, if you add the connection url to MongoDB connection function in backend/server.ts then everything will connect nicely but I can't be bothered with giving access to my own instance or making a "public" database right now.

*For uploading .csv files - create 'csvData' folder in root dir

Installation:

Run  `npm install` in categorizer/frontend and categorizer/backend separately

To Start Server:

Run `npm start` in categorizer/frontend
Run `node server.ts` or `nodemon server.ts` in categorizer/backend

To Visit App:

`localhost:3000`  
