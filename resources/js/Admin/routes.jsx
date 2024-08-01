import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Teachers = React.lazy(() => import('./views/Teachers/Teachers'))
const TeachersCreate = React.lazy(() => import('./views/Teachers/TeachersCreate'))
const TeachersUpdate = React.lazy(() => import('./views/Teachers/TeachersUpdate'))
const Students = React.lazy(() => import('./views/Students/Students'))
const StudentsCreate = React.lazy(() => import('./views/Students/StudentsCreate'))
const StudentsUpdate = React.lazy(() => import('./views/Students/StudentsUpdate'))
const Lessons = React.lazy(() => import('./views/Lessons/Lessons'))
const LessonsCreate = React.lazy(() => import('./views/Lessons/LessonsCreate'))
const LessonsUpdate = React.lazy(() => import('./views/Lessons/LessonsUpdate'))
const Courses = React.lazy(() => import('./views/Courses/Courses'))
const CoursesCreate = React.lazy(() => import('./views/Courses/CoursesCreate'))
const CoursesUpdate = React.lazy(() => import('./views/Courses/CoursesUpdate'))
const CoursesRegister = React.lazy(() => import('./views/Courses/CoursesRegister'))
const Classes = React.lazy(() => import('./views/Classes/Classes'))
const ClassesCreate = React.lazy(() => import('./views/Classes/ClassesCreate'))
const ClassesUpdate = React.lazy(() => import('./views/Classes/ClassesUpdate'))
const Absences = React.lazy(() => import("./views/Absences/Absences"));
const AbsencesCreate = React.lazy(() => import("./views/Absences/AbsencesCreate"));
const AbsencesUpdate = React.lazy(() => import("./views/Absences/AbsencesUpdate"));
const AbsencesReport = React.lazy(() => import("./views/Absences/AbsencesReport"));
const test = React.lazy(() => import('./views/test/test'));
const CourseExam = React.lazy(() => import('./views/Courses/CourseExam'));
const ShowExam = React.lazy(() => import('./views/Courses/ShowExam'));
const UpdateScore = React.lazy(() => import('./views/Courses/UpdateScore'));
const ExamCreate = React.lazy(() => import('./views/Exam/ExamCreate'));
const ExamUpdate = React.lazy(() => import('./views/Exam/ExamUpdate'));

const routes = [
  { path: '', name: 'Dashboard', element: Dashboard },
  { path: '/Teachers', name: 'Teachers', element: Teachers },
  { path: '/Teachers/Create', name: 'TeachersCreate', element: TeachersCreate },
  { path: '/Teachers/Update/:id', name: 'TeachersUpdate', element: TeachersUpdate },
  { path: '/Students', name: 'Students', element: Students },
  { path: '/Students/Create', name: 'StudentsCreate', element: StudentsCreate },
  { path: '/Students/Update/:id', name: 'StudentsUpdate', element: StudentsUpdate },
  { path: '/Lessons', name: 'Lessons', element: Lessons },
  { path: '/Lessons/Create', name: 'LessonsCreate', element: LessonsCreate },
  { path: '/Lessons/Update/:id', name: 'LessonsUpdate', element: LessonsUpdate },
  { path: '/Courses', name: 'Courses', element: Courses },
  { path: '/Courses/Create', name: 'CoursesCreate', element: CoursesCreate },
  { path: '/Courses/Update/:id', name: 'CoursesUpdate', element: CoursesUpdate },
  { path: '/Courses/Register/:id', name: 'CoursesRegister', element: CoursesRegister },
  { path: '/Classes', name: 'Classes', element: Classes },
  { path: '/Classes/Create', name: 'ClassesCreate', element: ClassesCreate },
  { path: '/Classes/Update/:id', name: 'ClassesUpdate', element: ClassesUpdate },
  { path: "/Absences", name: "Absences", element: Absences },
  { path: "/Absences/Create", name: "AbsencesCreate", element: AbsencesCreate },
  { path: "/Absences/update/:id", name: "AbsencesUpdate", element: AbsencesUpdate },
  { path: "/Absences/report/:id", name: "AbsencesReport", element: AbsencesReport },
  { path: '/course/exam/:id', name: 'CourseExam', element: CourseExam },
  { path: '/showExam/student/:id', name: 'ShowExam', element: ShowExam },
  { path: '/UpdateScore/:id', name: 'UpdateScore', element: UpdateScore },
  {path: '/exam/create/:id', name: 'ExamCreate', element: ExamCreate},
  {path: '/course/:course_id/exam/update/:exam_id' , name: 'ExamUpdate' , element: ExamUpdate},
  { path: '/test', name: 'test', element: test },

]

export default routes
