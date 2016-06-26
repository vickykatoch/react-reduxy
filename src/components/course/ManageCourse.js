import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

class ManageCourse extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false
        };
        this.onValueChange=this.onValueChange.bind(this);
        this.onSaveCourse=this.onSaveCourse.bind(this);
    }
    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }
        if (this.state.course.authorId.length === 'Select Author') {
            errors.authorId = 'Author name must be selected';
            formIsValid = false;
        }
        this.setState({errors: errors});
        return formIsValid;
    }
    onValueChange(evt){
        const field = evt.target.name;
        let course = this.state.course;
        course[field] = evt.target.value;
        return this.setState({course: course});
    }
    onSaveCourse(event) {
        event.preventDefault();
        if (!this.courseFormIsValid()) {
            return;
        }
        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
            .then(()=>this.redirect());
    }
    redirect(){
        this.setState({saving: false});
        toastr.success('Course saved');
        this.context.router.push('/courses');
    }
    render(){

        return (
            <div>
                <h1>Manage Course</h1>
                <CourseForm 
                    course= {this.state.course}
                    onChange = {this.onValueChange}
                    onSave ={this.onSaveCourse}
                    allAuthors={this.props.authors}
                    errors={this.state.errors}
                    saving={this.state.saving}
                    />
            </div>
        );
    }

}

//Pull in the React Router context so router is available on this.context.router.
ManageCourse.contextTypes = {
  router: PropTypes.object
};
ManageCourse.propTypes = {
    course : PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function  mapStateToProps(state, ownProps) {
    let courseId = ownProps.params.id;
    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    } 
    return {
        course:course,
        authors: authorsFormattedForDropdown(state.authors)
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
function getCourseById(courses, courseId) {
    let result = courses.filter(c=>c.id===courseId);
    if (result) return result[0]; //since filter returns an array, have to grab the first.
    return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);