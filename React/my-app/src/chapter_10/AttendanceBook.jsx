import React from 'react';

const students = [
    {
        id: 0,
        name: 'Inje',
    },
    {
        id: 1,
        name: 'Salah',
    },
    {
        id: 2,
        name: 'Son',
    },
    {
        id: 3,
        name: 'Park',
    },
];

function AttendanceBook(props) {
    return (
        <ul>
            {students.map((student) => {
                return <li key={student.id}>{student.name}</li>
            })}
        </ul>
    );
}

export default AttendanceBook;