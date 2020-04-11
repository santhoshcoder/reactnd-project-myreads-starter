import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksApi from "./BooksAPI";
import DisplayBookList from "./DisplayBookList";

class BookSearch extends Component{
    bookShelf = {};
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            searchBooks: []
        };
        //Represent the books currently in the bookshelf in a HashMap and store it
        this.bookShelf = {};

        for (let book of this.props.books) {
            this.bookShelf[book.id] = book;
        }
        // console.log(JSON.stringify(this.props));
        // console.log(`HashMap is ${JSON.stringify(this.bookShelf)}`);
        // console.log("HashMap Generated");
    }

    handleInputChange = (query) => {
        let queryTerm = query.trim();
        this.setState(() => (
            {
                searchTerm: query,
                searchBooks: []
            }
        ));
        if (queryTerm.length !== 0) {
            BooksApi.search(queryTerm).then(
                (books) =>
                {
                    let searchBooks = [];
                    //console.log(books);
                    if (books && !books.error) {
                        /*
                            For every book lookup the bookShelf and do the following
                            If book already exists update the shelf
                            Else set the shelf, authors, imageLinks.smallThumbnail to "none",[],""
                         */
                        for (let book of books) {
                            if (this.bookShelf[book.id] === undefined){
                                let authors = book.authors === undefined? []: book.authors;
                                let imageLinks = book.imageLinks === undefined? {smallThumbnail:""}:book.imageLinks;
                                searchBooks.push({
                                    ...book,
                                    shelf: "none",
                                    authors: authors,
                                    imageLinks: imageLinks
                                })
                            }
                            else {
                                searchBooks.push({
                                  ...book,
                                  shelf: this.bookShelf[book.id].shelf
                                })
                            }
                        }
                        this.setState(() => (
                            {
                                searchTerm: query,
                                searchBooks: searchBooks
                            }
                        ))
                    }
                }
            );
        }
    };
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                      <input
                          type="text"
                          name="searchTerm"
                          placeholder="Search by title or author"
                          value={this.state.searchTerm}
                          onChange={(event) => this.handleInputChange(event.target.value)}
                      />
                    </div>
                </div>
                <div className="search-books-results">
                    <DisplayBookList books={this.state.searchBooks} handleShelfChange={this.props.handleShelfChange}/>
                </div>
            </div>
        );
    }
}

BookSearch.propTypes = {
    handleShelfChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
};

export default BookSearch;