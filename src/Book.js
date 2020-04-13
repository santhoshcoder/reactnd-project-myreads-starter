import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
    handleChange = (event) => {
        this.setState({
            shelf: event.target.value
        });
        this.props.changeCategory(this.props.book,event.target.value);
    };

    constructor(props) {
        const {shelf} = props.book;
        super(props);
        this.state = {
            shelf
        }
    }

    render() {
        const {imageLinks, title, authors} = this.props.book;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})` }}>
                            ""
                        </div>
                        <div className="book-shelf-changer">
                            <select value={this.state.shelf} onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors.join(', ')}</div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeCategory: PropTypes.func.isRequired
};

export default Book;