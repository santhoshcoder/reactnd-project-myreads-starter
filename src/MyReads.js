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
    handleShelfChange = (id, shelf) => {
        console.log(`Trying to change a Book Id:${id}'s shelf to ${shelf}`);
        this.setState((currentState) =>(
            {
                books: currentState.books.map(
                    (book) => {
                        if (book.id === id)
                            book.shelf = shelf;
                        return book;
                    }
                )
            }
        ));
        //Call the API to update book's shelf
    };
    render() {
        const {currentlyReading,read,wantToRead} = this.getAllShelfBooks();
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
        );
    }
}

export default MyReads;