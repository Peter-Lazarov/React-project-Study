import React, { useState, useEffect } from 'react';
import { getSearchedCourses } from './coursesService';
import { Link } from 'react-router-dom';

const SearchCourses = () => {
    //console.log('here 1');
    const [searchedWord, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (searchedWord) {
            const fetchCourses = async () => {
                const response = await getSearchedCourses(searchedWord);
                //console.log('here 4');
                //console.log(response);
                setCourses(response);
            };

            fetchCourses();
        } else {
            //console.log('here 2');
            setCourses([]);
        }
    }, [searchedWord]);

    return (
        <div className='search'>
            {/* {console.log('here 3')} */}
            <input
                type="text"
                value={searchedWord}
                onChange={handleInputChange}
                placeholder="Search for a course"
            />
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <Link to={`/courses/${course._id}/details`}>
                            <h3>{course.name}</h3>
                            <p>{course.description}</p>
                            <img src={course.image} alt={course.name} width="100" />
                            <p>Lecturer: {course.lecturerName}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchCourses;
