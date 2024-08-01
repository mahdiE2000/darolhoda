import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './scss/style.scss';
import ScrollToTop from "./Tools/ScrollToTop";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const AdminDefaultLayout = React.lazy(() => import('./Admin/layout/DefaultLayout'));
const TeacherDefaultLayout = React.lazy(() => import('./Teacher/layout/DefaultLayout'));
const StudentDefaultLayout = React.lazy(() => import('./Student/layout/DefaultLayout'));
const TeacherLogin = React.lazy(() => import('./Teacher/views/pages/login/Login'));
const AdminLogin = React.lazy(() => import('./Admin/views/pages/login/Login'));
const StudentLogin = React.lazy(() => import('./Student/views/pages/login/Login'));

const MainApp = () => {
  const loading = useSelector((state) => state.loading);
  const userType = localStorage.getItem('UT');
  const location = useLocation();
  let navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'درحال پردازش ...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  useEffect(() => {
    const searchablePaths = ['teachers', 'students']
    const validUserTypes = ['admin', 'teacher', 'student'];
    const hashedWords  = {
        admin :   '8b08b70bef0c5f31046c217add159aca8236f286665088b39d872ae5b37c1771',
        teacher : '93bb38e81b0106463882aeb8bff38e1bfc0fcd2fc04778e40827432263bc6bc6',
        student : '07f1896758704287da11fcb8bb70350020a357adcb9c441d3ce9c900f2e8c6e5',
    };
    const firstPathSegment = location.pathname.split('/').filter(Boolean)[0]?.toLowerCase();
    const secondPathSegment = location.pathname.split('/').filter(Boolean)[1]?.toLowerCase();
    // console.log('First path segment:', firstPathSegment);
    // console.log('FihashedWordsrst  segment:', hashedWords[firstPathSegment]);
    // console.log('second segment:', secondPathSegment);
    // console.log('User type:', userType);
    if (firstPathSegment && secondPathSegment != 'login' && validUserTypes.includes(firstPathSegment) && hashedWords[firstPathSegment] != userType){
        navigate(`/`)
    }
    if(firstPathSegment && secondPathSegment && !searchablePaths.includes(secondPathSegment) ){
        dispatch({type: 'set',toolBars: null });
        // console.log('not Searchable :: ',secondPathSegment)
    }


  }, [location, userType]);
  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/404" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route exact path="/admin/login" name="Login Page" element={<AdminLogin />} />
        <Route exact path="/teacher/login" name="Login Page" element={<TeacherLogin />} />
        <Route exact path="/student/login" name="Login Page" element={<StudentLogin />} />
        <Route path="/admin/*" name="admin" element={<AdminDefaultLayout />} />
        <Route path="/teacher/*" name="teacher" element={<TeacherDefaultLayout />} />
        <Route path="/student/*" name="student" element={<StudentDefaultLayout />} />
        <Route path="/*" name="Home" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <MainApp />
    </HashRouter>
  );
};

export default App;
