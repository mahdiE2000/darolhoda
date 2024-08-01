import React, { useState } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CImage } from "@coreui/react-pro";

const Login = () => {
    const axiosClientForLogin = axios.create({
        baseURL: `/api`,
    });

    const cursorP = {
        cursor: "pointer",
    };

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [unauthorized, setUnauthorized] = useState("");
    let navigate = useNavigate();

    const handleSubmit = function (e) {
        e.preventDefault();
        // console.log(name),
        // console.log(password)
        axiosClientForLogin
            .post("v1/auth/teacher/login", {
                user_name: name,
                password: password,
            })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                // set user type
                localStorage.setItem("UT", '93bb38e81b0106463882aeb8bff38e1bfc0fcd2fc04778e40827432263bc6bc6');

                // localStorage.setItem('profile_picture',res.data.user.profile_picture);
                return navigate("/teacher");
            })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 401) {
                    setUnauthorized("نام کاربری یا رمز عبور اشتباه است");
                } else {
                    setErrors(error.response.data.errors);
                }
            });
    };

    const isLoggedIn = localStorage.getItem("token") !== null && localStorage.getItem("UT") == '4a78b1bc8c4dd5afbc4f2a9386793c2b518a777cd0e0d7c4e6e4a4a57a26a620';
    if (isLoggedIn) {
        return <Navigate to="/teacher/exams" />;
    } else {
        return (
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <div className="d-flex justify-content-center p-2">
                                            <CImage src="logo192.png" fluid/>
                                        </div>
                                        {unauthorized ? (
                                            <div
                                                className="alert alert-danger w-100"
                                                role="alert"
                                            >
                                                {unauthorized}
                                                <i
                                                    className="bi bi-x"
                                                    style={cursorP}
                                                    onClick={() =>
                                                        setUnauthorized(false)
                                                    }
                                                ></i>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <CForm onSubmit={handleSubmit}>
                                            <h1>ورود اساتید</h1>
                                            <p className="text-medium-emphasis">
                                                {" "}
                                                کاربر گرامی برای ورود لطفا ایمیل
                                                و رمز عبور خود را وارد کنید
                                            </p>
                                            <div className="mb-3">
                                                <CInputGroup className="mb-2">
                                                    <CInputGroupText>
                                                        <CIcon icon={cilUser} />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        name="name"
                                                        placeholder="کد پرسنلی"
                                                        autoComplete="name"
                                                        onChange={(e) => {
                                                            setName(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </CInputGroup>
                                                {errors?.user_name ? (
                                                    <span className="text-danger font-size-error">
                                                        {errors.user_name}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <CInputGroup className="mb-2">
                                                    <CInputGroupText>
                                                        <CIcon
                                                            icon={cilLockLocked}
                                                        />
                                                    </CInputGroupText>
                                                    <CFormInput
                                                        name="passwor"
                                                        type="password"
                                                        placeholder="رمز عبور"
                                                        autoComplete="current-password"
                                                        onChange={(e) => {
                                                            setPassword(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </CInputGroup>
                                                {errors?.password ? (
                                                    <span className="text-danger font-size-error">
                                                        {errors.password}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton
                                                        type="submit"
                                                        color="primary"
                                                        className="px-4"
                                                    >
                                                        ورود
                                                    </CButton>
                                                </CCol>
                                                <CCol
                                                    xs={6}
                                                    className="text-right"
                                                >

                                                    <div className="d-flex flex-column flex-lg-row justify-content-around">
                                                        <CButton color="link" className="px-0">
                                                            <NavLink to={'/admin/login'}>
                                                                ورود مدیران
                                                            </NavLink>
                                                        </CButton>
                                                        <CButton color="link" className="px-0">
                                                            <NavLink to={'/student/login'}>
                                                                ورود دانش آموزان
                                                            </NavLink>
                                                        </CButton>
                                                    </div>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                                {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard> */}
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        );
    }
};

export default Login;
