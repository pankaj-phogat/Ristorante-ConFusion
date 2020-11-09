import React,{Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from'./FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from  'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps= state => {
  return(
    {
      dishes:state.dishes,
      comments: state.comments,
      leaders: state.leaders,
      promotions: state.promotions,
    }
  )
}
const mapDispatchToProps = (dispatch) => ({
  //define a property names addComment that takes these parameters
  //and it dispatches tha action obtained from addComment ActionCreator
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  //so this addCommenyt fxn become available within main component

  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackform: () => { dispatch(actions.reset('feedback')) },

  fetchComments: () => { dispatch(fetchComments()) },
  fetchPromos: () => { dispatch(fetchPromos()) }
});

class Main extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render(){
    const HomePage= () => {
      return(
        <Home dish={this.props.dishes.dishes.filter( (dish) => dish.featured )[0] }
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errmsg}
          promotion={this.props.promotions.promotions.filter( (promo) => promo.featured )[0] }
          promosLoading={this.props.promotions.isLoading}
          promosErrMsg={this.props.promotions.errmsg}
          leader={this.props.leaders.filter( (leader) => leader.featured )[0] }
         />
      );
    }
    const DishWithId=({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errmsg={this.props.dishes.errmsg}
          comments={this.props.comments.comments.filter( (comment) => comment.dishId === parseInt(match.params.dishId,10))}
          commentsLoading={this.props.comments.isLoading}
          commentsErrMsg={this.props.comments.errmsg}
          postComment={this.props.postComment}  />
      )
    }
    return(
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route path="/aboutUs" component={() => <About leaders={this.props.leaders} /> } />
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackform} /> } />
            <Redirect to="/home" />
          </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
