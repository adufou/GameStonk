import IGlobalState from '../stores/IGlobalState';
import {connect} from 'react-redux';
import React from 'react';

/**
 * This function maps the state to a
 * prop called `state`.
 *
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = (state: IGlobalState) => ({
    state: state
});

// ANTOINE : I don't think we need it right now
// /**
//  * This function maps actions to props
//  * and binds them, so they can be called
//  * directly.
//  *
//  * In this case all actions are mapped
//  * to the `actions` prop.
//  */
// const mapDispatchToProps = (dispatch) => ({
// 	actions: bindActionCreators(Actions, dispatch)
// })


const mappedStateComponent = (component: () => React.ReactElement) => {
    /**
     * Finally the Redux store is connected
     * to the component with the `connect()`
     * function.
     */
    return connect(
        mapStateToProps
    )(component);
};

export default mappedStateComponent;
