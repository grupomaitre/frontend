import { FC, useState } from 'react'
import classnames from "classnames";
import { createSelector } from "reselect";
import { useSelector } from 'react-redux';

interface IProps {
    item: any
}
const ListMudarItem: FC<IProps> = ({ item }) => {


    const onChangeCheckBox = (value: any, check: any) => {
        const element: any = document.getElementById("email-topbar-actions");
        const checkedCount = document.querySelectorAll('.checkbox-wrapper-mail input:checked').length;
        const activeList: any = document.getElementById(value);

        if (checkedCount >= 1) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }

        if (check) {
            activeList.classList.add("active");
        } else {
            activeList.classList.remove("active");
        }
    };
    const [refreshLoader, setRefreshLoader] = useState(false)
    const refreshMails = () => {
        setRefreshLoader(true)
        setTimeout(() => {
            setRefreshLoader(false)
        }, 3000)
    }
    return (
        <div className=" ">
            {refreshLoader ? <div id="elmLoader">
                <div className="spinner-border text-primary avatar-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
                :
                <ul className="message-list" id="mail-list">
                    {item?.length === 0 ? (
                        <li className="text-center">No Messages Available.</li>
                    ) : (item.map((item: any, key: any) => (
                        <li className={classnames({ unread: item.id_cart })} key={key} id={item?.id_cart || null}>
                            <div className="col-mail col-mail-1">
                                <div className="form-check checkbox-wrapper-mail fs-14">
                                    <input
                                        onChange={(e: any) => onChangeCheckBox(e.target.value, e.target.checked)}
                                        className="form-check-input"
                                        type="checkbox"
                                        value={item?.id_cart}
                                        id={item?.id_cart}
                                    />
                                    <label className="form-check-label" htmlFor={item?.id_cart}>                                    </label>

                                </div>
                                <div className="title" onClick={() => console.log(item)}>{item.nombre} {" "} {item.id_cart} </div>

                            </div>

                        </li>
                    )))}
                </ul>}
        </div>
    )
}

export default ListMudarItem