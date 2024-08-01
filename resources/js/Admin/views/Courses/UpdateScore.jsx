import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../../Tools/API/useAPI";
import axiosClient from "../../../../axios";
import Swal from "sweetalert2";
import CIcon from "@coreui/icons-react";
import { CFormInput } from "@coreui/react";
import { cilTrash, cilXCircle } from "@coreui/icons";

function UpdateScore() {
    const [scoreData, setScoreData] = useState([]);
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const { fetch, update } = useAPI();

    useEffect(() => {
        fetchScore();
    }, []);

    const fetchScore = () => {
        fetch("scores", setScoreData, {}, id);
    };

    const updateScore = () => {
        axiosClient
            .put(`scores/${id}`, {
                action: "score",
                score: scoreData.score,
            })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "نمره ثبت شد",
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                }).then(() => {
                    fetchScore();
                });
            })
            .catch((error) => {
                console.log(error);
            });
        fetchScore();
    };

    const deleteImage = (name) => {
        axiosClient
            .delete(`files/${name}`)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "تصویر با موفقیت حذف شد",
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                }).then(() => {
                    fetchScore();
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        axiosClient
            .post("files", formData)
            .then((res) => {
                setImages([...images, res.data.files]);
            })
            .catch((error) => {});
    };

    const deleteImageFromArr = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };

    const updateImageScore = () => {
        axiosClient
            .put(`scores/${scoreData.id}`, {
                action: "score",
                attachments: images,
            })
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "تصاویر افزوده شد",
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                }).then(() => {
                    fetchScore();
                    setImages([]);
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                });
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className="my-4">به روز رسانی نمره</h2>
                    <div className="mb-3">
                        <label htmlFor="newScore" className="form-label">
                            نمره جدید:{" "}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="newScore"
                            value={scoreData.score}
                            onChange={(e) =>
                                setScoreData({
                                    ...scoreData,
                                    score: e.target.value,
                                })
                            }
                        />
                        <button
                            onClick={updateScore}
                            className="btn btn-primary mt-3"
                        >
                            ویرایش نمره
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h2 className="my-4">افزودن تصاویر</h2>
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
                                                deleteImageFromArr(index)
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

                    <button
                        onClick={updateImageScore}
                        className="btn btn-primary mt-3"
                    >
                        افزودن تصویر
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h2 className="my-4">حذف تصاویر</h2>
                    <div className="row mb-4">
                        {scoreData?.files?.length > 0 ? (
                            scoreData.files.map((image, index) => (
                                <div
                                    key={index}
                                    className="col-md-3 mb-3 position-relative"
                                >
                                    <div className="card">
                                        <img
                                            src={`http://localhost:8000/upload/${image.path}`}
                                            alt={`تصویر ${index + 1}`}
                                            className="card-img-top"
                                            style={{
                                                objectFit: "cover",
                                                height: "200px",
                                            }}
                                        />
                                        <button
                                            onClick={() =>
                                                deleteImage(image.path)
                                            }
                                            className="btn btn-danger btn-sm position-absolute"
                                            style={{
                                                top: "10px",
                                                right: "10px",
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>تصویری موجود نیست</p>
                        )}
                    </div>
                    <button className="btn btn-success mt-3 mb-4">
                        ویرایش تصاویر
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateScore;
