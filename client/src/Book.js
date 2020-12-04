
import React from 'react';
import './Book.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FlashMessage from './FlashMessage';




class Book extends React.Component {

    validation = {

        author: {
            rule: /^\S.{0,48}\S$/,
            message: 'Author field must have 2-50 characters'
        },

        title: {
            rule: /^\S.{0,68}\S$/,
            message: 'Title field must have 2-70 characters'
        },

        published: {
            rule: /^\d{4}$/,
            message: 'Publication date must be a four digit year.'
        }



    }
     

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            title: '',
            published: '',
            submitAttempts: 0,
        }

        /*
        we need to assure that the 'this' reference does not point to the control in the DOM,
        but rather to this class/Book object. 
        */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    validate () {

        //this.showMessage('FUUUUUUUCCCCKKKK');

        for(let field in this.validation) {
            const rule = this.validation[field].rule;
            const message = this.validation[field].message;
            const value = this.state[field];

           if(!value.match(rule)) {
                //console.log(field, rule, message, value);
                this.setState({ 
                    message: message, 
                    submitAttempts: this.state.submitAttempts + 1 
                });
                return false;
            }
        }

        return true;
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

        event.preventDefault();

        if (!this.validate()){
            return;
        }

        //this.validate();
        
        //console.log(this.state);

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
        //console.log(this.state);

        if (this.state.created) {
            return < Redirect to="/"/>
        }

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
                    <FlashMessage key={this.state.submitAttempts} message={this.state.message} duration='3000'/>
                </form>
            </div>
            
            
        );
    }

}



export default Book;