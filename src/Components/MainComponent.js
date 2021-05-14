import React from 'react'
import Menu from './Menucomponent'
import '../App.css';
import Dishdisplay from './Dishdisplay'
import Header from './Headercomponent'
import Footer from './Footercomponent'
import Home from './Homecomponent'
import Contact from './Contactcomponent'
import About from './AboutComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { CSSTransitionGroup } from 'react-transition-group';



const mapStateToProps = (state) => {
    return {
      mydishes: state.dishes,
      mycomments: state.comments,
      mypromotions: state.promotions,
      myleaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstName, lastName, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstName, lastName, telnum, email, agree, contactType, message)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});


class MainComponent extends React.Component {


    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchLeaders();
  }

    render() {

        const Aboutpage = () => {
            return (
                <About leaders={this.props.myleaders.leaders}
                  leaderLoading={this.props.myleaders.isLoading}
                  leaderErrMess={this.props.myleaders.leaders.errMess}/>
            );
        };

        const DishWithId = ({ match }) => {
            return (
              
                <Dishdisplay dish={this.props.mydishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                  isLoading={this.props.mydishes.isLoading}
                  errMess={this.props.mydishes.errMess}
                  comments={this.props.mycomments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                  commentsErrMess={this.props.mycomments.errMess}
                  postComment={this.props.postComment}
                />
            );
        }

        const Homepage = () => {
            return (
                <Home 
                  dish={this.props.mydishes.dishes.filter((dish) => dish.featured)[0]}
                  dishesLoading={this.props.mydishes.isLoading}
                  dishErrMess={this.props.mydishes.errMess}
                  promotion={this.props.mypromotions.promotions.filter((promo) => promo.featured)[0]}
                  promoLoading={this.props.mypromotions.isLoading}
                  promoErrMess={this.props.mypromotions.errMess}
                  leader={this.props.myleaders.leaders.filter((leader) => leader.featured)[0]}
                  leaderLoading={this.props.myleaders.isLoading}
                  leaderErrMess={this.props.myleaders.errMess}
                />
            );
        }

        return (
            <div>
              <div>
                <Header />
                  <CSSTransitionGroup key={this.props.location.key} classNames="page" timeout={300}>
                    <Switch location={this.props.location}>
                      <Route path="/home" component = {Homepage} />
                      <Route exact path="/menu" component = {() => <Menu mydishes={this.props.mydishes.dishes} />} />
                      <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback = {this.props.postFeedback}/>} />
                      <Route exact path = "/aboutus" component = {Aboutpage} />
                      <Route path='/menu/:dishId' component={DishWithId} />
                      <Redirect to='/home' />
                    </Switch>
                  </CSSTransitionGroup>
                <Footer />
              </div>
          </div>
        );
    }

}

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(MainComponent));