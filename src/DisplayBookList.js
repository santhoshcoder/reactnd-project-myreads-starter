import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

/*
    Print the book details which are sent as a prop
 */
class DisplayBookList extends Component {
    render() {
        const {heading, books, handleCategoryChange} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{heading}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) =>
                            (<Book
                                key={book.id}
                                id={book.id}
                                image={book.imageLinks.smallThumbnail}
                                shelf={book.shelf}
                                title={book.title}
                                authors={book.authors}
                                changeCategory={handleCategoryChange}
                            />))}
                    </ol>
                </div>
            </div>
        );
    }
}

DisplayBookList.propTypes = {
    heading: PropTypes.string,
    books: PropTypes.array.isRequired,
    handleCategoryChange: PropTypes.func.isRequired
};

export default DisplayBookList;