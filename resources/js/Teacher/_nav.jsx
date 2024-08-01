import React from "react";
import CIcon from "@coreui/icons-react";
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
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { cidContact, cilBook, cilChalkboardTeacher, cilPeople, cilScreenDesktop } from "@coreui/icons-pro";

const _nav = [
    {
        component: CNavItem,
        name: "داشبورد",
        to: "/teacher",
        icon: <CIcon icon={cilScreenDesktop} customClassName="nav-icon text-danger" />,
        // badge: {
        //     color: "info",
        //     text: "NEW",
        // },
    },
    {
        component: CNavItem,
        name: "امتحان",
        to: "exams",
        icon: <CIcon icon={cilPencil} customClassName="nav-icon text-warning" />,

    },
    // {
    //     component: CNavItem,
    //     name: "درس ها",
    //     to: "courses",
    //     icon: <CIcon icon={cilBook} customClassName="nav-icon text-success" />,
    // },
    {
        component: CNavItem,
        name: "حضور و غیاب",
        to: "Absences",
        icon: <CIcon icon={cilPeople} customClassName="nav-icon text-primary" />,
    },
];

export default _nav;
