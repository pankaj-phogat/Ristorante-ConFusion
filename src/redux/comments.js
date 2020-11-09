import * as ActionTypes from './ActionTypes';

export const Comments= (state={
	errmsg:null,
	comments:[]
}, action) => {
	switch(action.type){
		case ActionTypes.ADD_COMMENTS:
			return {...state, isLoading:false, errmsg: null, comments: action.payload} ;
		case ActionTypes.COMMENTS_FAILED:
			return {...state, isLoading:false, errmsg: action.payload, comments: []} ;
		case ActionTypes.ADD_COMMENT :
			var comment=action.payload;
			//comment.id=	state.comments.length; //state contains comments here(see line 4) so length
			//later will be generated by server here we need to hardcode
			//comment.date=new Date().toISOString();
			return {...state, comments: state.comments.concat(comment)} ; //concat is immutable i.e. creates a new object(that's what we need to do)
			//this added comment is lost when we restart our application
		default: 
			return state;
	}
}