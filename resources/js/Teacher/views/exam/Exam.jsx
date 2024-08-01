import {
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosClient from "../../../../axios";
import SmartTable from "../../../Tools/SmartTable/SmartTable";
import useAPI from "../../../Tools/API/useAPI";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
import { cilCommentSquareEdit } from "@coreui/icons-pro";
import "bootstrap-icons/font/bootstrap-icons.css";
import moment from "moment-jalaali";
import { CSmartTable } from "@coreui/react-pro";

function Exam() {
    const dispatch = useDispatch();
    const { fetchPaginate } = useAPI();
    const [examData, setExamData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetchExams();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        console.log(examData);
    }, [examData]);

    const columns = [
        {
            key: "title",
            label: "نام امتحان",
            _style: { width: "30%" },
        },
        {
            key: "date",
            label: "تاریخ امتحان",
            _style: { width: "20%" },
        },
        {
            key: "report_start_time",
            label: "تاریخ شروع اعتراض",
            _style: { width: "20%" },
        },
        {
            key: "report_end_time",
            label: "تاریخ پایان اعتراض",
            _style: { width: "20%" },
        },
        {
            key: "class",
            label: "کلاس",
            _style: { width: "30%" },
        },
        {
            key: "lesson",
            label: "درس",
            _style: { width: "30%" },
        },
        {
            key: "show_details",
            label: "",
            _style: { width: "100%" },
            filter: false,
            sorter: false,
        },
    ];

    const fetchExams = () => {
        const params = { itemsPerPage, page: currentPage };
        fetchPaginate("exams", setExamData, setTotalPages, params);
    };

    const ScopedColumns = {
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-around">
                        <CButton>
                            <NavLink to={`Update/${item.id}`}>
                                <CIcon
                                    icon={cilCommentSquareEdit}
                                    className="text-info"
                                    size="xl"
                                />
                            </NavLink>
                        </CButton>
                        <CButton>
                            <NavLink to={`student/${item.id}`}>
                                <i
                                    className="bi bi-eye-fill"
                                    style={{ fontSize: "1.5rem" }}
                                ></i>
                            </NavLink>
                        </CButton>
                    </div>
                </td>
            );
        },
    };

    return (
        <>
            <div className="d-flex flex-column">
                <CSmartTable
                    columns={columns}
                    items={examData.map((item) => ({
                        id: item.id,
                        title: item.title,
                        date: moment(item.date).format("jD jMM jYYYY / HH:mm"),
                        report_start_time: moment(item.report_start_time).format("jD jMM jYYYY / HH:mm"),
                        report_end_time: moment(item.report_end_time).format("jD jMM jYYYY / HH:mm"),
                        class: item.course.class,
                        lesson: item.course.lesson,
                    }))}
                    // itemsPerPage={itemsPerPage}
                    // totalPages={totalPages}
                    // currentPage={currentPage}
                    // setItemsPerPage={setItemsPerPage}
                    // setCurrentPage={setCurrentPage}
                    scopedColumns={ScopedColumns}
                    tableProps={{
                        responsive: true,
                        striped: true,
                        // hover: true,
                    }}
                />
                <div className="d-flex justify-content-center align-items-center">
                <Link
                    className="btn btn-success col-2"
                    to="/teacher/exams/create"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    ایجاد
                </Link>
            </div>
            </div>
        </>
    );
}

export default Exam;
