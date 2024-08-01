import React, { useEffect, useState } from "react";
import SmartTable from "../../../Tools/SmartTable/SmartTable";
import useAPI from "../../../Tools/API/useAPI";
import { cibAddthis, cilCommentSquareEdit, cilTrash } from "@coreui/icons-pro";
import { CButton, CTooltip } from "@coreui/react-pro";
import { NavLink } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilFile } from "@coreui/icons";

const Courses = () => {
    //Variables
    const { fetchPaginate } = useAPI();
    const [CoursesData, setCoursesData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const columns = [
        {
            key: "id",
            label: "id",
            _style: { width: "8%" },
        },
        {
            key: "teacher",
            label: "استاد",
            _style: { width: "20%" },
        },
        {
            key: "lesson",
            label: "درس",
            _style: { width: "20%" },
        },
        {
            key: "class",
            label: "کلاس",
            _style: { width: "20%" },
        },
        {
            key: "class_time",
            label: "زمان کلاس",
            _style: { width: "10%" },
        },
        {
            key: "exam_time",
            label: "تاریخ امتحان",
            _style: { width: "10%" },
        },
        {
            key: "show_details",
            label: "",
            _style: { width: "100%" },
            filter: false,
            sorter: false,
        },
    ];

    //Useeffect
    useEffect(() => {
        fetchCourses();
    }, [currentPage, itemsPerPage]);
    useEffect(() => {
        //console.log(CoursesData);
    }, [CoursesData]);

    //Functions
    const fetchCourses = () => {
        const params = { itemsPerPage, page: currentPage };
        const struct = (item) => item;
        fetchPaginate("courses", setCoursesData, setTotalPages, params, struct);
    };

    const scopedColumns = {
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-around">
                        <CTooltip
                        animation={false}
                        content="ویرایش"
                        placement="top"
                        >
                            <CButton style={{border: 'none'}}>
                                <NavLink to={`Update/${item.id}`}>
                                    <CIcon
                                        icon={cilCommentSquareEdit}
                                        className="text-info"
                                        size="xl"
                                    />
                                </NavLink>
                            </CButton>
                        </CTooltip>

                        <CTooltip
                        animation={false}
                        content="اضافه کردن دانش آموزان"
                        placement="top"
                        >
                            <CButton style={{ border: "none" }}>
                                <NavLink to={`Register/${item.id}`}>
                                    <CIcon
                                        icon={cibAddthis}
                                        className="text-success"
                                        size="xl"
                                    />
                                </NavLink>
                            </CButton>
                        </CTooltip>

                        <CTooltip content="نمایش امتحانات" placement="top">
                            <CButton style={{ border: "none" }}>
                                <NavLink to={`/admin/course/exam/${item.id}`}>
                                    <CIcon
                                        icon={cilFile}
                                        className="text-primary ml-2"
                                        size="xl"
                                    />
                                </NavLink>
                            </CButton>
                        </CTooltip>

                        {/* <CTooltip
                        animation={false}
                        content="حذف"
                        placement="top"
                        >
                            <CButton style={{border: 'none'}}>
                                <CIcon icon={cilTrash} className="text-danger" size="xl" />
                            </CButton>
                        </CTooltip> */}
                    </div>
                </td>
            );
        },
    };
    return (
        <div className="d-flex flex-column">
            <SmartTable
                columns={columns}
                Data={CoursesData}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                currentPage={currentPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
                scopedColumns={scopedColumns}
            />
        </div>
    );
};

export default Courses;
