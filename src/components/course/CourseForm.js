import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course,allAuthors, onSave, onChange, saving, errors })=>{
    return (
        <form >
            <TextInput
                name="title"
                label="Title"
                value={course.title}
                onChange={onChange} 
                error={errors.title}
                />
            <SelectInput
                name="authorId"
                label="Author"
                value={course.authorId}
                onChange={onChange} 
                options={allAuthors}
                defaultOption="Select Author"
                error={errors.authorId}
                />
            <TextInput
                name="category"
                label="Category"
                value={course.category}
                onChange={onChange} 
                />
            <TextInput
                name="length"
                label="Length"
                value={course.length}
                onChange={onChange} 
                />
            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}/>
            <input
                type="button"
                className="btn btn-primary"
                value="Cancel"/>
        </form>
    );
};

CourseForm.propTypes = {
    course : React.PropTypes.object.isRequired,
    onSave : React.PropTypes.func.isRequired,
    onChange : React.PropTypes.func.isRequired,
    allAuthors: React.PropTypes.array,
    saving : React.PropTypes.bool,
    errors : React.PropTypes.object
};

export default CourseForm;