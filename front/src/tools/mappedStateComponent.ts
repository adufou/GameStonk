import IGlobalState from "../stores/IGlobalState";
import {bindActionCreators} from "@reduxjs/toolkit";
import {connect} from "react-redux";

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

/**
 * This function maps actions to props
 * and binds them, so they can be called
 * directly.
 *
 * In this case all actions are mapped
 * to the `actions` prop.
 */
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(Actions, dispatch)
})


/**
 * Finally the Redux store is connected
 * to the component with the `connect()`
 * function.
 */
export default connect(
    mapStateToProps
)(Navbar);


