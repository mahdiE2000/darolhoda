import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import Swal from 'sweetalert2';
// routes config
import routes from '../routes'
import { useSelector } from 'react-redux';
const AppContent = () => {
    // const loading = useSelector((state) => state.loading);

    // useEffect(() => {
    //     console.log('loading :: ',loading);
    //   if (loading) {
    //     Swal.fire({
    //       title: 'درحال پردازش ...',
    //       allowOutsideClick: false,
    //       allowEscapeKey: false,
    //       showConfirmButton: false,
    //       didOpen: () => {
    //         Swal.showLoading();
    //       },
    //     });
    //   } else {
    //     Swal.close();
    //   }
    // }, [loading]);
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="/student/login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
