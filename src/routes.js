import React from 'react';
import App from './components/App';
import CoursesPage from './components/course/CoursesPage';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';
import {Route, IndexRoute} from 'react-router';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="courses" component={CoursesPage}/>
    <Route path="about" component={AboutPage}/>
  </Route>
);
