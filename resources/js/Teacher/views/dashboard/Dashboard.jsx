import { CBadge, CButton, CContainer, CNavLink } from '@coreui/react-pro'
import React from 'react'
import _nav from '../../_nav'
import { NavLink, useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';

const Dashboard = () => {

    const navigate = useNavigate();

    const renderNavItem = (item) => (
      <CButton
        key={item.name}
        color="dark"
        className="m-3 p-4 d-flex flex-column align-items-center "
        style={{width:'175px'}}
        variant='outline'
        onClick={() => navigate(item.to)}
      >
        {item.icon ? item.icon : item.iconitem}
        <div>{item.name}</div>
      </CButton>
    );

    const renderNavGroup = (group) => (
      group.items.map(subItem => renderNavItem(subItem))
    );

    return (
      <div className="d-flex flex-wrap w-75 mx-auto justify-content-center">
        {_nav.map((item, index) => (
          item.items ? renderNavGroup(item) : renderNavItem(item)
        ))}
      </div>
    );
}

export default Dashboard
