import React, { Component } from "react";
import * as BooksApi from "./BooksAPI";
import DisplayBookList from "./DisplayBookList";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import BookSearch from "./BookSearch";

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
    getAllShelfBooks = () => {
        let currentlyReading = [],read = [],wantToRead = [];
        for (const book of this.state.books){
            if (book.shelf === "currentlyReading"){
                currentlyReading.push(book);
            }
            else if (book.shelf === "read") {
                read.push(book);
            }
            else if (book.shelf === "wantToRead") {
                wantToRead.push(book);
            }
        }
        return {currentlyReading,read,wantToRead};
    };
    handleShelfChange = (book, newShelf, oldShelf) => {
        console.log(`Trying to change the "${book.title}" with Book Id:${book.id}'s shelf from ${oldShelf} to ${newShelf}`);
        // this.setState((currentState) =>(
        //     {
        //         books: currentState.books.map(
        //             (eachBook) => {
        //                 if (eachBook.id === book.id)
        //                     eachBook.shelf = shelf;
        //                 return eachBook;
        //             }
        //         )
        //     }
        // ));
        if (oldShelf === "none") {
            console.log("Adding a new book to the bookshelf");
        }
        else if (newShelf === "none") {
            console.log("Removing a book from the bookshelf");
        }
        else {
            console.log("Updating one of the book's shelf");
        }
        //Call the API to update book's shelf
    };
    render() {
        const {currentlyReading,read,wantToRead} = this.getAllShelfBooks();
        return (
            <div>
            <Route exact path="/" render = {() => (
                <div>
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <DisplayBookList
                                key={"currentlyReading"}
                                books={currentlyReading}
                                heading={"Currently Reading"}
                                handleShelfChange={this.handleShelfChange}/>
                            <DisplayBookList
                                key={"wantToRead"}
                                books={wantToRead}
                                heading={"Want to Read"}
                                handleShelfChange={this.handleShelfChange}/>
                            <DisplayBookList
                                key={"read"}
                                books={read}
                                heading={"Read"}
                                handleShelfChange={this.handleShelfChange}/>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search">
                            <button>Add a book</button>
                        </Link>
                    </div>
                </div>
            )}
            />
            <Route exact path="/search" render = {
                () => (
                    <BookSearch handleShelfChange={this.handleShelfChange} books={this.state.books}/>
                )}
            />
            </div>
        );
    }
}

export default MyReads;