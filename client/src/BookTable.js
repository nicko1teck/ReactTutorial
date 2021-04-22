import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './BookTable.css';
import { Link } from 'react-router-dom';




function BookTable(props) {

    let books = props.books.map(book=>{

        let date = book.published.toString().substr(0,4);

       // console.log(book,index);
       return (
       <tr key={book.id}>
            <td>{book.author}</td>
            <td>{book.title}</td>
            <td>{date}</td>
            <td><Link to={"/edit/"+book.id}><EditIcon /></Link></td>
            <td><Link to='/' onClick={ ()=> {if (window.confirm("Are you sure?")) {props.handleDelete(book.id)}}}><DeleteForeverIcon /></Link></td>

        </tr>
       )
    });

   // console.log('render', this.state.books);

    return ( 
        <div>
            <table>
                <thead>
                <tr>
                    <th>Author</th><th>Title</th><th>Published</th>
                </tr>
                </thead>
                <tbody>
                {books}
                </tbody>
            </table>
        </div>
        );







    
}


export default BookTable;