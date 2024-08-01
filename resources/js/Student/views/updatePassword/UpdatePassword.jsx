import React, { useState } from 'react';
import axiosClient from '../../../../axios';
import Swal from 'sweetalert2';

function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const updatePassword = (e) => {
        e.preventDefault();
        axiosClient.patch('profile', {
            password: password,
            password_confirmation: password_confirmation
        }).then(res => {
            Swal.fire({
                icon: "success",
                title: "رمز عبور آپدیت شد",
                showConfirmButton: true,
                confirmButtonText: "تایید",
            });
            setErrors({});
        }).catch((error) => {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || { message: error.response.data.message });
            } else {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "مشکلی پیش آمد",
                    showConfirmButton: true,
                    confirmButtonText: "تایید",
                });
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">به‌روزرسانی رمز عبور</h2>
            <form>
                <div className="form-group mb-3">
                    <label htmlFor="password">رمز عبور جدید</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="رمز عبور جدید را وارد کنید"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="confirmPassword">تکرار رمز عبور</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="رمز عبور جدید را تکرار کنید"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation}</div>}
                </div>
                <button type="submit" onClick={(e) => updatePassword(e)} className="btn btn-primary">به‌روزرسانی</button>
            </form>
            {errors.message && <div className="alert alert-danger mt-4">{errors.message}</div>}
        </div>
    );
}

export default UpdatePassword;
