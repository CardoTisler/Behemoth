// import { render, screen } from '@testing-library/react';
// import App from './App';
// const server = require("../../backend/server")
// const request = require("supertest");
// const App = require("./App");
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// describe("Categories API", () => {
  // it("GET /categories/show", () => {
  //   return request(App)
  //       .get("/categories/show")
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toEqual(
  //           expect.arrayContaining([
  //               expect.objectContaining({
  //                 _id: expect.any(String),
  //                 type: expect.any(String),
  //                 name: expect.any(String),
  //                 budget: expect.any(Number),
  //               })
  //           ])
  //         )
  //       })
  // })
//
//   it("GET /categories/falserequest", () => {
//     return request(App).get("/categories/falserequest").expect(404);
//   });
// })