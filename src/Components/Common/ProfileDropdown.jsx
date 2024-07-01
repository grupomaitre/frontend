import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";

//import images
import avatar1 from "../../assets/images/users/user-dummy-img.jpg";
import { LogOut } from "react-feather";

const ProfileDropdown = ({userData}) => {
    //const navigate = useNavigate();
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    const logout = () => {
        sessionStorage.removeItem("authUser");
       // navigate("/");
    };

    return (
        <React.Fragment>
            <Dropdown
                isOpen={isProfileDropdown}
                toggle={toggleProfileDropdown}
                className="ms-sm-3 header-item topbar-user"
            >
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img
                            className="rounded-circle header-profile-user"
                            src={avatar1}
                            alt="Header Avatar"
                        />
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">
                        Bienvenido {userData.user_name}!
                    </h6>

                    <div className="dropdown-divider"></div>

                    <DropdownItem onClick={logout}>
                        <LogOut />
                        <span className="align-middle mx-2" data-key="t-logout">
                            Salir
                        </span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;
