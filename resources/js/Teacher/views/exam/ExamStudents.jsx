import {
    CButton,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CFormFloating,
    CFormInput,
    CFormLabel,
    CBadge,
    CFormTextarea,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import SmartTable from "../../../Tools/SmartTable/SmartTable";
import useAPI from "../../../Tools/API/useAPI";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilXCircle } from "@coreui/icons";
import { cilCommentSquareEdit } from "@coreui/icons-pro";
import "bootstrap-icons/font/bootstrap-icons.css";
import axiosClient from "../../../../axios";
import { CSmartTable } from "@coreui/react-pro";
import Swal from "sweetalert2";
import { cilPencil } from "@coreui/icons";
import { CSVLink } from "react-csv";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function ExamStudents() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { fetch, update } = useAPI();
    const [examStudentsData, setExamStudentsData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [score, setScore] = useState(null);
    const [images, setImages] = useState([]);
    const [mergData, setMergeData] = useState([]);
    const [showProtestModal, setShowProtestModal] = useState(false);
    const [protestData, setProtestData] = useState(null);
    const [protestAnswer, setProtestAnswer] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editScore, setEditScore] = useState(null);
    const [editImages, setEditImages] = useState([]);

    const headers = [
        { label: "نام", key: "name" },
        { label: "نام خانوادگی", key: "last_name" },
        { label: "نمره", key: "score" },
    ];

    console.log("A", examStudentsData);

    useEffect(() => {
        fetchExamStudents();
    }, [currentPage, itemsPerPage]);

    const fetchExamStudents = () => {
        fetch(`exams/${id}`, (data) => {
            setExamStudentsData(data);
            setTotalPages(Math.ceil(data.course.members.length / itemsPerPage));
        });
    };

    useEffect(() => {
        if (examStudentsData) {
            const members = examStudentsData.course?.members || [];
            const scores = examStudentsData.scores || [];

            const membersData = members.map((member, index) => {
                const scoreData = scores[index] || {};
                return {
                    name: member.name,
                    last_name: member.last_name,
                    course_selected: member.course_selected,
                    score_id: scoreData.id || "",
                    score: scoreData.score || "",
                    scoreStatus: scoreData.score ? 1 : 2,
                    reported: scoreData.ask ? "اعتراض دارد" : "اعتراض ندارد",
                    ask: scoreData.ask,
                    answer: scoreData.answer,
                    files: scoreData.files,
                    attachments: scoreData.attachments || [],
                };
            });

            setMergeData(membersData);
        }
    }, [examStudentsData]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const handleChange = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        axiosClient
            .post("files", formData)
            .then((res) => {
                setImages([...images, res.data.files]);
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                });
            });
    };

    const createScore = () => {
        axiosClient
            .post("scores", {
                score: parseFloat(score),
                course_selected_id: selectedStudent.course_selected,
                exam_id: id,
                attachments: images,
            })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "نمره ثبت شد",
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleModalClose();
                        fetchExamStudents();
                    }
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                });
            });
    };

    const deleteImage = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const columns = [
        {
            key: "name",
            label: "نام",
            _style: { width: "10%" },
        },
        {
            key: "last_name",
            label: "نام خانوادگی",
            _style: { width: "10%" },
        },
        {
            key: "score",
            label: "نمره",
            _style: { width: "10%" },
        },
        {
            key: "reported",
            label: "وضعیت اعتراض",
            _style: { width: "10%" },
        },
        {
            key: "show_details",
            label: "",
            _style: { width: "10%" },
            filter: false,
            sorter: false,
        },
    ];

    const getBadge = (status) => {
        switch (status) {
            case "اعتراض دارد":
                return "danger";
            case "اعتراض ندارد":
                return "success";
            default:
                return "primary";
        }
    };

    const ScopedColumns = {
        reported: (item) => (
            <td>
                <CBadge color={getBadge(item.reported)}>{item.reported}</CBadge>
            </td>
        ),
        show_details: (item) => {
            return (
                <td>
                    <div className="d-flex justify-content-around">
                        <CButton style={{ minWidth: "8rem" }}>
                            {item.reported === "اعتراض دارد" ? (
                                <NavLink
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleProtestModalOpen(item);
                                    }}
                                    style={{ textDecoration: "none" }}
                                >
                                    نمایش اعتراض
                                </NavLink>
                            ) : (
                                <span>---</span>
                            )}
                        </CButton>
                        <CButton onClick={() => handleModalOpen(item)}>
                            {item.scoreStatus === 1 ? (
                                <NavLink
                                    to={`/teacher/score/update/${item.score_id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "blue",
                                    }}
                                >
                                    نمایش و ویرایش نمره
                                </NavLink>
                            ) : (
                                <i
                                    className="bi bi-eye-fill"
                                    style={{ fontSize: "1.5rem" }}
                                ></i>
                            )}
                        </CButton>
                    </div>
                </td>
            );
        },
    };

    const handleModalOpen = (item) => {
        setSelectedStudent(item);
        setScore(item.score);
        setEditImages(item.attachments || []);
        setImages(item.attachments || []);
        setEditMode(item.scoreStatus === 1);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedStudent(null);
        setScore(null);
        setImages([]);
    };

    const handleProtestModalOpen = (item) => {
        setProtestData(item);
        setProtestAnswer(item.answer || "");
        setShowProtestModal(true);
    };

    const handleProtestModalClose = () => {
        setShowProtestModal(false);
        setProtestData(null);
    };

    const handleProtestSubmit = () => {
        const updatedFormData = { answer: protestAnswer, action: "answer" };

        update(
            "scores",
            protestData.score_id,
            updatedFormData,
            `/teacher/exams/student/${id}`
        );
        fetchExamStudents();
        handleProtestModalClose();
    };

    const downloadImagesAsZip = async () => {
        const zip = new JSZip();

        // حلقه برای هر کاربر
        for (const user of mergData) {
            // بررسی وجود فایل‌ها برای کاربر
            if (!user.files) {
                console.log(
                    `No files found for user ${user.name} ${user.last_name}`
                );
                continue; // اگر فایلی وجود نداشت، به کاربر بعدی برو
            }

            const folder = zip.folder(`${user.name}_${user.last_name}`);

            // حلقه برای هر فایل در کاربر
            const imagePromises = user.files.map(async (file) => {
                const url = `http://localhost:8000/upload/${file.path}`;
                try {
                    const response = await axiosClient.get(url, {
                        responseType: "blob",
                    });
                    const fileName = file.path.split("/").pop();
                    folder.file(fileName, response.data);
                    console.log(
                        `Added file ${fileName} for user ${user.name} ${user.last_name}`
                    );
                } catch (error) {
                    console.error(
                        `Error downloading file ${file.path} for user ${user.name} ${user.last_name}:`,
                        error
                    );
                }
            });

            // صبر کردن برای تکمیل همه درخواست‌ها
            await Promise.all(imagePromises);
        }

        try {
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, `${examStudentsData.title}`);
            console.log("ZIP file created and downloaded");
        } catch (error) {
            console.error("Error creating zip file:", error);
        }
    };

    return (
        <>
            <h2 className="text-primary mb-4 d-flex justify-content-start align-items-center">
                <span className="d-inline-block ms-2">
                    <i className="bi bi-file-text"></i>
                </span>
                <span className="d-inline-block">{examStudentsData.title}</span>
            </h2>

            <div className="d-flex justify-content-end mb-3">
                <CSVLink
                    data={mergData}
                    headers={headers}
                    filename={`${examStudentsData.title}.csv`}
                >
                    <CButton color="primary" className="me-2">
                        دریافت CSV
                    </CButton>
                </CSVLink>
                <CButton
                    color="success text-white"
                    onClick={() => downloadImagesAsZip(mergData)}
                >
                    دانلود تمام تصاویر
                </CButton>
            </div>

            <div className="d-flex flex-column">
                <CSmartTable
                    columns={columns}
                    items={mergData}
                    itemsPerPage={itemsPerPage}
                    data-currentpage={currentPage}
                    scopedColumns={ScopedColumns}
                    tableProps={{
                        responsive: true,
                        striped: true,
                        // hover: true,
                    }}
                />
            </div>

            <CModal visible={modalVisible} onClose={handleModalClose} size="xl">
                <CModalHeader closeButton>
                    {editMode
                        ? "ویرایش نمره دانشجو"
                        : "در این قسمت نمره دانشجو را وارد کنید ..."}
                </CModalHeader>
                <CModalBody>
                    {selectedStudent && (
                        <>
                            <p>نام: {selectedStudent.name}</p>
                            <p>نام خانوادگی: {selectedStudent.last_name}</p>
                            <CFormFloating className="mb-3 col-3">
                                <CFormInput
                                    className="form-control"
                                    name="score"
                                    placeholder=""
                                    value={score}
                                    onChange={(e) => setScore(e.target.value)}
                                />
                                <CFormLabel className="ps-lg-3">
                                    نمره دانشجو
                                </CFormLabel>
                            </CFormFloating>

                            <div className="my-2">
                                <CFormInput
                                    type="file"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>

                            <div className="d-flex mt-4 flex-wrap justify-content-right">
                                {images.length > 0 && (
                                    <>
                                        {images.map((image, index) => (
                                            <div key={index}>
                                                <img
                                                    className="imageUpload mb-4"
                                                    src={`http://localhost:8000/upload/${image}`}
                                                    alt="آپلود شده"
                                                    style={{
                                                        width: "150px",
                                                        height: "100px",
                                                        borderRadius: "8px",
                                                        margin: "4px",
                                                    }}
                                                />
                                                <CIcon
                                                    onClick={() =>
                                                        deleteImage(index)
                                                    }
                                                    icon={cilXCircle}
                                                    className="text-danger icon-hover-danger"
                                                    size="xl"
                                                    style={{
                                                        transform:
                                                            "translate(5px, -50px)",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success text-white" onClick={createScore}>
                        {editMode ? "به‌روزرسانی" : "ایجاد"}
                    </CButton>
                    <CButton color="secondary" onClick={handleModalClose}>
                        بستن
                    </CButton>
                </CModalFooter>
            </CModal>

            <CModal
                visible={showProtestModal}
                onClose={handleProtestModalClose}
                size="xl"
            >
                <CModalHeader closeButton>پاسخ به اعتراض</CModalHeader>
                <CModalBody>
                    {protestData && (
                        <>
                            <p>متن اعتراض :</p>
                            <p>{protestData.ask}</p>
                            <CFormTextarea
                                value={protestAnswer}
                                onChange={(e) =>
                                    setProtestAnswer(e.target.value)
                                }
                                rows="4"
                                style={{ width: "100%" }}
                            />
                        </>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleProtestSubmit}>
                        ارسال پاسخ اعتراض
                    </CButton>
                    <CButton
                        color="secondary"
                        onClick={handleProtestModalClose}
                    >
                        بستن
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
}

export default ExamStudents;
