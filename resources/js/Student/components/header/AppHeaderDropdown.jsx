import React from "react";
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from "@coreui/react";
import { cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import avatar8 from "../../../assets/images/avatars/icons8-user-100.png";
import axiosClient from "../../../../axios";
import { NavLink, useNavigate } from "react-router-dom";
import { cilCommentSquareEdit, cisCommentSquareEdit } from "@coreui/icons-pro";

const AppHeaderDropdown = () => {
    let navigate = useNavigate();

    const logoutUser = function (e) {
        e.preventDefault();
        axiosClient
            .get("auth/student/logout")
            .then((res) => {
                localStorage.removeItem("token");
                // remove User Type
                localStorage.removeItem("UT");
                return navigate("/student/login");
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle
                placement="bottom-end"
                className="py-0"
                caret={false}
            >
                <CAvatar src={avatar8} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-light fw-semibold py-2">
                    Account
                </CDropdownHeader>
                <CDropdownItem>
                    <NavLink to="/student/UpdatePassword" style={{ color: 'black', textDecoration: 'none' }}>
                    <CIcon icon={cilCommentSquareEdit} className="me-2" />
                    ویرایش رمز عبور
                    </NavLink>
                </CDropdownItem>
                <CDropdownItem
                    style={{ cursor: "pointer" }}
                    className="pe-auto"
                    onClick={(e) => logoutUser(e)}
                >
                    <CIcon icon={cilAccountLogout} className="me-2" />
                    خروج
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;
