import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const Student = React.lazy(() => import("./views/student/Student"));

//exam
const Exam = React.lazy(() => import("./views/exam/Exam"));
const CreateExam = React.lazy(() => import("./views/exam/Create"));
const updateExam = React.lazy(() => import("./views/exam/ExamUpdate"));
const ExamStudents = React.lazy(() => import("./views/exam/ExamStudents"));
const Absences = React.lazy(() => import("./views/Absences/Absences"));
const AbsencesCreate = React.lazy(() => import("./views/Absences/AbsencesCreate"));
const AbsencesUpdate = React.lazy(() => import("./views/Absences/AbsencesUpdate"));
const AbsencesReport = React.lazy(() => import("./views/Absences/AbsencesReport"));
const Courses = React.lazy(() => import("./views/courses/Courses"));
const ScoreUpdate = React.lazy(() => import("./views/score/ScoreUpdate"));
const UpdatePassword = React.lazy(() => import("./views/updatePassword/UpdatePassword"));

const routes = [
    { path: "/", name: "Dashboard", element: Dashboard },
    { path: "/students", name: "student", element: Student },
    { path: "/exams", name: "exam", element: Exam },
    { path: "/exams/Create", name: "createExam", element: CreateExam },
    { path: "/exams/update/:id", name: "updateExam", element: updateExam },
    { path: "/exams/student/:id", name: "ExamStudents", element: ExamStudents},
    { path: "/Absences", name: "Absences", element: Absences },
    { path: "/Absences/Create", name: "AbsencesCreate", element: AbsencesCreate },
    { path: "/Absences/update/:id", name: "AbsencesUpdate", element: AbsencesUpdate },
    { path: "/Absences/report/:id", name: "AbsencesReport", element: AbsencesReport },
    { path: "/courses" , name: "Courses" , element: Courses},
    { path: "/score/update/:id" , name: "scoreUpdate" , element: ScoreUpdate},
    {path: "/UpdatePassword" , name: "showExam" , element: UpdatePassword},

];

export default routes;
