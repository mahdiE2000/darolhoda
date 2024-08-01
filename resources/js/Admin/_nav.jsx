import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
  cilDescription,
  cilDrop,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { cidBook, cidContact, cilChalkboardTeacher, cilCursor, cilPeople, cilRoom, cilScreenDesktop } from '@coreui/icons-pro'

const _nav = [
  {
    component: CNavItem,
    name: 'داشبورد',
    to: '/admin',
    icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon text-danger" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavGroup,
    name: 'مدیریت کاربران',
    icon: <CIcon icon={cilUser} customClassName="nav-icon text-info" />,
    items: [
        {
            component: CNavItem,
            name: 'اساتید',
            to: 'Teachers',
            iconitem: <CIcon icon={cilChalkboardTeacher} customClassName="nav-icon text-success" />
            },
            {
            component: CNavItem,
            name: 'دانش آموزان',
            to: 'Students',
            iconitem: <CIcon icon={cilUser} customClassName="nav-icon text-info" />
        },
    ],
  },
  {
    component: CNavGroup,
    name: 'درس ها',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon text-success" />,
    items: [
        {
            component: CNavItem,
            name: 'دروس اصلی',
            to: 'Lessons',
            iconitem: <CIcon icon={cidBook} customClassName="nav-icon text-warning" />,
        },
        {
            component: CNavItem,
            name: 'دروس ارائه شده',
            to: 'Courses',
            iconitem: <CIcon icon={cilPencil} customClassName="nav-icon " style={{color: "#f7c386"}} />,
        },
    ],
  },
  {
    component: CNavItem,
    name: 'کلاس ها',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" style={{color:'purple'}} />,
    to: 'Classes',
  },
//   {
//     component: CNavItem,
//     name: "حضور و غیاب",
//     to: "Absences",
//     icon: <CIcon icon={cilPeople} customClassName="nav-icon text-primary" />,
// },
]

export default _nav
