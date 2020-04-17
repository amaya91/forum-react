/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Form, Button, Navbar, Nav, NavDropdown, FormControl, Alert, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { API } from '../../config';
import { addPost, loadPosts } from '../../reducers/user/userActions'
// import { logout } from '../../reducers/user/userActions';


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [{
                post: {
                    id: 0,
                    title: "",
                    body: "",
                    author: "",
                    createTimestamp: "" ,
                    likes: 0,
                    dislikes: 0,
                    interaction: 0,
                }
            }],
            loading: true,
            searchItem: "",
        }

    
    }

    componentDidMount(){
        fetch(API + 'post/all') 
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ posts: response, loading:false });
            })
            .catch(err => {
                console.log(err);
            })
            console.log(this.state);
    }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login');
    }

    goToCreateForm = () => {
        this.props.history.push('/create');
    }

    goToHome = () => {
        this.props.history.push('/');
    }

    likePost = id => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(1,null),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + "post/addlike/" + id, requestOptions)
            .then(res => {
                if(res.status !== 201) {
                    throw new Error("Not created.");
                }    
                return res.json()
            })
            .catch(err => {
                console.log(err);
            })

        fetch(API + 'post/all') 
            .then(res => {
                return res.json();
            })
            .then(response => {
                this.setState({ posts: response, loading:false });
            })
            .catch(err => {
                console.log(err);
            })
    }

    dislikePost = id => {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(1,null),
            headers: {"Content-Type": "application/json"}
        }

        fetch(API + "post/unlike/" + id, requestOptions)
            .then(res => {
                if(res.status !== 201) {
                    throw new Error("Not disliked.");
                }    
                return res.json()
            })
            .catch(err => {
                console.log(err);
            })

        fetch(API + 'post/all') 
            .then(res => {
                return res.json();
            })
            .then(response => {
                this.setState({ posts: response, loading:false });
            })
            .catch(err => {
                console.log(err);
            })   
    }

    render(){
        return (
            <div className="page-container">
                <Navbar bg="light" className="white" expand="xl">
                    <Navbar.Brand id="parent" style={{ marginRight: '0'}} onClick={this.goToHome}> The R Word.</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={this.goToHome}>Posts</Nav.Link>
                            <Nav.Link onClick={this.goToCreateForm}>Create</Nav.Link>
                            <Nav.Link onClick={this.logout}>Log Out</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
                {this.state.loading ? 
                    <div className="content-wrap">LOADING ...</div> :
                        <div style={{ marginTop: 20}} className="blog content-wrap">
                                {this.state.posts.map(p => (
                                    <div key={p.id}>
                                        <Card id="card" className="card">
                                            <Card.Body style={{ padding: '0'}}>
                                                <div> 
                                                    <Card.Title className="sand"><div className="container" style= {{minHeight: '40px', paddingTop: '5px'}}>{p.title}</div></Card.Title>
                                                    <div className="container"> 
                                                    {/* <Card.Text >{p.createTimestamp}</Card.Text> */}
                                                        <Card.Text>{p.body}</Card.Text>
                                                            <div style={{display: 'flex', flexDirection: 'column'}}>

                                                                <Card.Text style={{position: 'absolute', bottom: '5px', marginBottom: '0'}}>
                                                                        <i className={p.likes > 0 ? 'blue fas fa-thumbs-up' : 'fas fa-thumbs-up'}  onClick={() => this.likePost(p.id)}></i>
                                                                        {p.likes}
                                                                    
                                                                    <i className={p.dislikes > 0 ? 'red fas fa-thumbs-down' : 'fas fa-thumbs-down'} onClick={() => this.dislikePost(p.id)}></i>
                                                                    {p.dislikes}
                                                                </Card.Text>
                                                
                                                                <Card.Text style={{position: 'absolute', bottom: '5px', right: '10px'}}>
                                                                    {p.author}
                                                                </Card.Text>
                                                
                                                             </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <br />
                                    </div>
                                ))}
                        </div>
                }        
                <div className="footer">
                    <div className="center">
                        <div className="row">
                            <a className="link" style={{paddingRight: "5px"}} href="https://linkedin.com/in/ruthamaya"><i className="fab fa-linkedin"></i>LinkedIn</a>
                            <a className="link " href="https://github.com/amaya91"><i class="fab fa-github"></i>GitHub</a>
                        </div>
                        <div className="row"> Ruth Amaya 2020 </div>
                    </div>
                </div>
            </div>
        )        
    }    
}            

const mapStateToProps = (state) => ({
    user: state.user,
    // completeList: 
    // completedList: state.user.todoList.filter(t => t.completed)
})

const mapDispatchToProps = {

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)