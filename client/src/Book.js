
import React from 'react';
import './Book.css';
import axios from 'axios';



class Book extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            title: '',
            published: ''
        }

        /*
        we need to assure that the 'this' reference does not point to the control in the DOM,
        but rather to this class/Book object. 
        */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    componentDidMount() {
        if (!this.state.id) {
            return;
        }
        //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        axios.get(process.env.REACT_APP_SERVER_URL + '/' + this.state.id)
            .then(result => {
                let { author, title, published}  = result.data[0];

                this.setState({
                    author: author,
                    title: title,
                    published: published.substr(0, 4)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleSubmit(event) {
        //event.preventDefault();

        let {author, title, published} = this.state;
        published += '-01-01';
        const book = {
            author: author,
            title: title,
            published: published
        }
    
        
        axios.post(process.env.REACT_APP_SERVER_URL, book)
        .then(result=>{
            console.log(result);
            this.setState({ created: true });
        })
        .catch(error=>{
            console.log(error);
            //this.errorMessage(error.toString());
        });
        
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }


    

    render() {
        /*console.log('server URL', process.env.REACT_APP_SERVER_URL);*/
        console.log(this.state);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="author">Author:</label>
                    <input value={this.state.author} onChange={this.handleChange} type="text" name="author" id="author" />

                    <label htmlFor="title">Title:</label>
                    <input value={this.state.title} onChange={this.handleChange} type="text" name="title" id="title" />

                    <label htmlFor="published">Published:</label>
                    <input value={this.state.published} onChange={this.handleChange} type="text" name="published" id="published" />

                    <input type="submit" value="Save" />

                </form>
            </div>
        );
    }

}



export default Book;