import React from 'react'

const Courses = React.lazy(() => import("./views/courses/Courses"));
const Exams = React.lazy(() => import("./views/exams/Exams"));
const showExam = React.lazy(() => import("./views/exams/ShowExam"));
const UpdatePassword = React.lazy(() => import("./views/updatePassword/UpdatePassword"));

const routes = [
    {path: "/courses" , name: "Courses" , element: Courses},
    {path: "/Exams" , name: "Exams" , element: Exams},
    {path: "/Exams/:id" , name: "showExam" , element: showExam},
    {path: "/UpdatePassword" , name: "showExam" , element: UpdatePassword}
]

export default routes
