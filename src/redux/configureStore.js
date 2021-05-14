import {createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Leaders from './leadersreducer';
import Comments from './commentsreducer';
import Promotions from './promotionsreducer';
import Dishes from './dishreducer'
import InitialFeedback from './formsreducer';


export const Configurestore = () => {
	const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

	return store;
}