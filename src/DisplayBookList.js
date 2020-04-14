import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

/*
    Print the book details which are sent as a prop
 */
class DisplayBookList extends Component {
    render() {
        const {heading, books, handleShelfChange, search} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{heading}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) =>
                        {
                            if (search) {
                                let tempBook = this.props.map[book.id];
                                if (tempBook !== undefined) {
                                    book.shelf = tempBook.shelf;
                                }
                                else {
                                    book.shelf = "none";
                                }
                            }
                            return <Book
                                key={book.id}
                                book={book}
                                changeCategory={handleShelfChange}
                            />
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

DisplayBookList.propTypes = {
    heading: PropTypes.string,
    books: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    search: PropTypes.bool.isRequired,
    map: PropTypes.object
};

export default DisplayBookList;