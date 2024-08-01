import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Navigate, useNavigate } from "react-router-dom";
const DefaultLayout = () => {
  let navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  if(isLoggedIn){
    return (
      <div dir="rtl">
        <AppSidebar  />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light" dir="rtl">
          <AppHeader />
          <div className="body flex-grow-1 px-3" dir="rtl">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    )
  }else{
    return <Navigate to="/admin/login" />
  }


}

export default DefaultLayout
