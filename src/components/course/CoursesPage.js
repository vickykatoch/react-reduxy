import React from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';

class CoursesPage extends React.Component{
    constructor(props){
        super(props);
        this.redirectToAddCoursePage=this.redirectToAddCoursePage.bind(this);
    }
    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }
    render(){
        return (
            <div>
                <h1>Course Page</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}/>
                
                <CourseList courses={this.props.courses} />
            </div>
        );
    }
}
CoursesPage.propTypes = {
    courses : React.PropTypes.array.isRequired,
    actions : React.PropTypes.object.isRequired
};

function  mapStateToProps(state, ownProps) {
    return {
        courses : state.courses
    };
}
function  mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);