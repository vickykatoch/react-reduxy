import React from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container-fluid">
                <Header loading={this.props.loading}/>
                {this.props.children}
             </div>
        );
    }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  loading : React.PropTypes.bool.isRequired
};
function mapStateToProps(state, ownProps){
    return {
        loading: state.ajaxStatus > 0
    };
}
export default connect(mapStateToProps)(App);
