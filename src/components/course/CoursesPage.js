import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './courseList';

class CoursesPage extends React.Component{
    constructor(props){
        super(props);
        
    }

    

    render(){
        // const courseList = this.props.courses.map((item,idx)=>{
        //     return (<li key={idx}>{item.course}</li>);
        // });
        return (
            <div>
                <h1>Course Page</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                        />
                <CourseList courses={this.props.courses} />
            </div>
        );
    }
}
function  mapStateToProps(state, ownProps) {
    return {
        courses : state.courses
    };
}


export default connect(mapStateToProps)(CoursesPage);