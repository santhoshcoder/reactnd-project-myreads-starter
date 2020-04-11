import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
    handleChange = (event) => {
        event.preventDefault();
        this.props.changeCategory(this.props.book,event.target.value,this.props.shelf);
    };
    render() {
        const {image, shelf, title, authors} = this.props;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}>
                            ""
                        </div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors && authors.join(', ')}</div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    changeCategory: PropTypes.func.isRequired
};

export default Book;