import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
    {
        component: CNavItem,
        name: "دوره ها",
        to: "courses",
        icon: <CIcon icon={cilCursor} customClassName="nav-icon text-success" />,
    },
    {
        component: CNavItem,
        name: "امتحانات",
        to: "exams",
        icon: <CIcon icon={cilPencil} customClassName="nav-icon text-warning" />,
    },
]

export default _nav
