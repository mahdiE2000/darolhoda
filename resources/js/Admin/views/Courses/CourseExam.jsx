import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import useAPI from "../../../Tools/API/useAPI";
import { CButton } from "@coreui/react";
import { cilCommentSquareEdit } from "@coreui/icons-pro";
import { CSmartTable } from "@coreui/react-pro";
import moment from "moment-jalaali";
import "moment/locale/fa"; // اطمینان حاصل کنید که locale فارسی وارد شده است
import CIcon from "@coreui/icons-react";

function CourseExam() {
    const [examsData, setExamsData] = useState([]);
    const { fetch } = useAPI();
    const params = useParams();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = () => {
        fetch("courses", setExamsData, {}, params.id);
    };

    useEffect(() => {
        // اشکال‌زدایی داده‌ها
        console.log("Exams Data:", examsData);
    }, [examsData]);

    // تنظیم locale به فارسی برای moment-jalaali
    moment.locale("fa");

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
            key: "show_details",
            label: "",
            _style: { width: "20%" },
            filter: false,
            sorter: false,
        },
    ];

    const ScopedColumns = {
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-around">
                        <CButton>
                            <NavLink to={`/admin/showExam/student/${item.id}`}>
                                <i>نمایش نمرات دانش آموزان</i>
                            </NavLink>
                        </CButton>
                        <CButton>
                            <NavLink to={`/admin/course/${params.id}/exam/update/${item.id}`}>
                                <CIcon icon={cilCommentSquareEdit} className="text-info" size="xl" />
                            </NavLink>
                        </CButton>
                    </div>
                </td>
            );
        },
    };

    return (
        <div className="d-flex flex-column">
            <CSmartTable
                columns={columns}
                items={examsData?.exams?.map((item) => ({
                    id: item.id,
                    title: item.title,
                    date: moment(item.date).format("jD jMM jYYYY / HH:mm"), // فرمت دقیق‌تر تاریخ و ساعت
                }))}
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
                    to={`/admin/exam/create/${params.id}`}
                    style={{ color: "white", textDecoration: "none" }}
                >
                    ایجاد
                </Link>
            </div>
        </div>
    );
}

export default CourseExam;
