import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static("client/build"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
