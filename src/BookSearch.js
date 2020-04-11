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
        }
    }
    handleInputChange = (query) => {
        let queryTerm = query;
        this.setState(() => (
            {
                searchTerm: query,
                searchBooks: []
            }
        ));
        if (queryTerm.length !== 0) {
            BooksApi.search(queryTerm).then(
                (books) => {
                    console.log(books);
                    if (books && !books.error) {
                        //Update Books shelf if they are currently in the bookshelves
                        this.setState(() => (
                            {
                                searchTerm: query,
                                searchBooks: books
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
    handleShelfChange: PropTypes.func.isRequired
};

export default BookSearch;