## Categorizer


Categorizer is a tool that helps you categorize your financial statements and visualize them. The end goal for this project is to be able to import a large amount of transactions via .CSV file, categorize them into similar groups based on Transaction name and then export the categorized file for personal storage. This tool is not meant for storing large amounts of data for a long time.

#### Current stack

React + Redux + Material UI 

Express + NodeJS + Multer

MongoDB


## Project Status

**This project is currently in development.**
#### Current features:

User can add and delete both transactions and categories.
Dashboard helps visualize the data and summarize the finances into 4 main categories - Income, Expenses,
Budget _(Total planned budget - current spending)_ and Savings (Income - Expenses). Dashboard also gives a more detailed
bar graph about expenses by visualizing each expense category alongside the planned budget for that category.

#### Future functionality roadmap
- [x] Dashboard (based on currrently stored transactions)
    - [x] Working summary elements (Income, Expenses, Budget, Savings)
    - [x] Expense Categories visualization via barchart
    - [x] Currently stored transactions filtering via Calendar component
- [x] Categories
    - [x] Add and store Categories in db
    - [x] category-transactions relations configuration
- [ ] Transactions
    - [x] Transaction categorizing functionality
    - [x] Multi-add transactions via .csv
    - [x] Export categorized transactions to new .csv file
    - [ ] Functional filtering system in Transactions view
    - [ ] Transaction individual categorizing functionality
- [ ] Reports
    - [ ] Detailed statistics
- [ ] General
    - [ ] Light mode / Dark mode toggle



## Project Screen Shot(s)

#### Example:   

![Dashboard](https://i.ibb.co/g6YQ5Kx/dashboard.png)

![Transactions](https://i.ibb.co/VSTM2Xj/transactions.png)

![Categories](https://i.ibb.co/SmXwjTL/categories.png)

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
