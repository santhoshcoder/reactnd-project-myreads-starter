import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksApi from "./BooksAPI";
import DisplayBookList from "./DisplayBookList";

class BookSearch extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            searchBooks: []
        };
    }

    handleInputChange = (query) => {
        let queryTerm = query.trim();
        console.log("Setting Search Books to empty");
        this.setState(() => (
            {
                searchTerm: query,
                searchBooks: []
            }
        ),() =>{
            if (queryTerm.length !== 0) {
                BooksApi.search(queryTerm).then(
                    (books) =>
                    {
                        console.log(`QueryTerm is ${queryTerm} & query is ${this.state.searchTerm}`);
                        if (books && !books.error && this.state.searchTerm.length !== 0) {
                            this.setState((currentState) => (
                                {
                                    ...currentState,
                                    searchBooks: books
                                }
                            ))
                        }
                    }
                );
            }
        });
    };

    createMap = () => {
        let bookShelf = {};
        console.log(`No of books in the props are:${this.props.books.length}`);
        for (let book of this.props.books) {
            bookShelf[book.id] = book;
        }
        return bookShelf;
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
                    <DisplayBookList books={this.state.searchBooks} handleShelfChange={this.props.handleShelfChange} map={this.createMap()} search={true}/>
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