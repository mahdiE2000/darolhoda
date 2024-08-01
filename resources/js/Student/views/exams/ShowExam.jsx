import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import useAPI from "../../../Tools/API/useAPI";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CFormTextarea,
    CImage,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CRow,
} from "@coreui/react-pro";
import { useParams } from "react-router-dom";
import useForm from "../../../Tools/useForm/useForm";
import useFormState from "./ExamScoreField";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import axios from "axios";

function ShowExam() {
    const { fetch } = useAPI();
    const [scoreData, setScoreData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { update } = useAPI();

    const [ formData, setFormData, handleFromChange ] = useForm(useFormState);

    // const CreateExam = () => {
    //     create('scores',formData,`student/exams/${id}`);
    // }

    const { id } = useParams();

    useEffect(() => {
        fetchScore();
    }, []);

    const fetchScore = () => {
        fetch("exams", setScoreData, {}, id);
        console.log("ID ::", id);
    };

    useEffect(() => {
        console.log(scoreData);
    }, [scoreData]);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleObjectionSubmit = () => {
        const updatedFormData = { ...formData, action: "ask" };
        console.log(updatedFormData)
        update(
            "scores",
            scoreData?.scores?.id,
            updatedFormData,
            `/student/exams/${id}`
        );
        fetchScore();
        closeModal();
    };

    const downloadImagesAsZip = async () => {
        const zip = new JSZip();
        const folder = zip.folder(`${scoreData.title}`);

        const imagePromises = scoreData.scores?.files.map(
            async (file, index) => {
                const url = `http://localhost:8000/upload/${file.path}`;
                const response = await axios.get(url, { responseType: "blob" });
                const fileName = `صفحه${index + 1}.jpg`; // یا نام دیگری که می‌خواهید استفاده کنید
                folder.file(fileName, response.data);
            }
        );

        try {
            await Promise.all(imagePromises);
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, `${scoreData.title}.zip`);
        } catch (error) {
            console.error("Error creating zip file:", error);
        }
    };

    return (
        <>
            <CContainer fluid>
                <CRow>
                    <CCol md={4}>
                        <CCard>
                            <CCardHeader>نمره دانشجو</CCardHeader>
                            <CCardBody>
                                <h3 className="text-center">
                                    نمره: {scoreData?.scores?.score}
                                </h3>
                            </CCardBody>
                        </CCard>
                        <CCard className="mt-4">
                            <CCardHeader>نتیجه اعتراض</CCardHeader>
                            <CCardBody>
                                {scoreData.scores ? (
                                    scoreData.scores?.ask ? (
                                        <div>
                                            <p>
                                                <strong>اعتراض شما:</strong>{" "}
                                                {scoreData?.scores?.ask}
                                            </p>
                                            <p>
                                                <strong>پاسخ استاد:</strong>{" "}
                                                {scoreData?.scores?.answer}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            {scoreData?.is_report_expired ? (
                                                <p>
                                                    مهلت اعتراض شما به پایان
                                                    رسیده است.
                                                </p>
                                            ) : (
                                                <CButton
                                                    color="danger"
                                                    onClick={openModal}
                                                >
                                                    اعتراض
                                                </CButton>
                                            )}
                                        </div>
                                    )
                                ) : (
                                    <p>نمره شما هنوز وارد نشده است.</p>
                                )}
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol md={8}>
                        <CCard>
                            <CCardHeader>تصاویر امتحان دانشجو</CCardHeader>
                            <CCardBody>
                                <div>
                                    {scoreData?.scores?.files?.map(
                                        (image, index) => (
                                            <CRow key={index} className="mb-3">
                                                <CCol>
                                                    <CImage
                                                        src={`http://localhost:8000/upload/${image.path}`}
                                                        alt={`تصویر امتحان ${
                                                            index + 1
                                                        }`}
                                                        className="w-100"
                                                    />
                                                </CCol>
                                            </CRow>
                                        )
                                    )}
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

                <CModal visible={modalVisible} onClose={closeModal}>
                    <CModalHeader onClose={closeModal}>
                        اعتراض به نمره
                    </CModalHeader>
                    <CModalBody>
                        <CFormTextarea
                            label="اعتراض شما"
                            name="ask"
                            value={scoreData?.scores?.ask}
                            onChange={handleFromChange}
                            rows="3"
                            className="mt-3"
                        />
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={closeModal}>
                            بستن
                        </CButton>
                        <CButton
                            color="primary"
                            onClick={handleObjectionSubmit}
                        >
                            ارسال اعتراض
                        </CButton>
                    </CModalFooter>
                </CModal>
            </CContainer>
        </>
    );
}

export default ShowExam;
