import React from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Label,
    Col,
    Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form'
import Loading from './LoadingComponent'
import baseUrl from '../shared/baseUrl';


const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {

    if (dish != null)
        return (
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return (
            <div></div>
        );

}

function RenderComments({ comments , toggleModal}) {

    if (comments != null) {
        const reviews = comments.map((comment) => {
            return (
                <div>
                <Card>
                    <CardBody>
                      <CardText>--{comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(comment.date))}</CardText>
                      <CardText>{comment.comment}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        });

        return (

            <div>
                    <h4>Comments</h4>
                    {reviews}
                    <Button outline onClick={toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                </div>
        );

    } else
        return (
            <div></div>
        );

}

class Formdisplay extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.postComment(this.props.dishId , values.rating , values.author , values.comment);
    }

    render()
    {
        return(

        <Modal isOpen = { this.props.isOpen } toggle = { this.props.toggle } >
            <ModalHeader toggle={this.props.toggle}>Comment</ModalHeader> 
            <ModalBody >
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

            <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={10}>
                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="9">10</option>
                    </Control.select>
                </Col>
            </Row>

            <Row className="form-group">
                <Label htmlFor="name" md={2}>Your Name</Label>
                <Col md={10}>
                    <Control.text model=".name" id="name" name="name"
                        placeholder="Enter Your Name Here..."
                        className="form-control"
                        validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                        }}
                         />
                    <Errors
                        className="text-danger"
                        model=".name"
                        show="touched"
                        messages={{
                            required: 'Required ',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}
                     />
                </Col>
            </Row>
            
            <Row className="form-group">
                <Label htmlFor="comment" md={2}>Comment</Label>
                <Col md={10}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                        rows="5"
                        placeholder="Type your comment here"
                        className="form-control" />
                </Col>
            </Row>

            <Row className="form-group">
                <Col md={{size:10, offset: 2}}>
                    <Button type="submit" color="primary">
                    Submit
                    </Button>
                </Col>
            </Row>
            </LocalForm> 
            </ModalBody> 
        </Modal>
        );
    }
}



class Dishdisplay extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    

    render()
    {
        if(this.props.isLoading)
        {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>  
                </div>
            );
        }

        else if(this.props.errmess)
        {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errmess}</h4>
                    </div>  
                </div>
            );
        }

        else if (this.props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {this.props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments = {this.props.comments} toggleModal = {this.toggleModal} />
                    </div>
                </div>

                <div>
                
                <Formdisplay isOpen = { this.state.isModalOpen } toggle = { this.toggleModal } postComment = {this.props.postComment} dishId = {this.props.dish.id} />
                </div>
            </div>

        );

        else
            return (
                <div></div>
            );
    }


    

}

export default Dishdisplay;