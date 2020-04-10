import React, { Component } from "react";
import * as BooksApi from "./BooksAPI";
import DisplayBookList from "./DisplayBookList";

class MyReads extends Component {
    state = {
        books: []
    };
    componentDidMount() {
        BooksApi.getAll().then(
            (books) => {
                this.setState({
                    books
                })
            }
        );
    }
    render() {
        const currentlyReading = this.state.books.filter((book) => book.shelf === "currentlyReading");
        const read = this.state.books.filter((book) => book.shelf === "read");
        const wantToRead = this.state.books.filter((book) => book.shelf === "wantToRead");
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <DisplayBookList
                        key={"currentlyReading"}
                        books={currentlyReading}
                        heading={"Currently Reading"}
                        handleCategoryChange={
                            (id, shelf)=>{console.log(`Trying to change a Book Id:${id}'s shelf to ${shelf}`)}
                        }/>
                    <DisplayBookList
                        key={"wantToRead"}
                        books={wantToRead}
                        heading={"Want to Read"}
                        handleCategoryChange={
                            (id, shelf)=>{console.log(`Trying to change a Book Id:${id}'s shelf to ${shelf}`)}
                        }/>
                    <DisplayBookList
                        key={"read"}
                        books={read}
                        heading={"Read"}
                        handleCategoryChange={
                            (id, shelf)=>{console.log(`Trying to change a Book Id:${id}'s shelf to ${shelf}`)}
                        }/>
                </div>
            </div>
        );
    }
}

export default MyReads;