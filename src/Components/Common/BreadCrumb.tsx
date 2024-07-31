import React, { FC } from 'react';
import { Link } from 'react-router-dom';
interface BreadCrumbProps {
    title: string;
    pageTitle: string;
    itemInfo?: any
}
const BreadCrumb: FC<BreadCrumbProps> = ({ title, pageTitle, itemInfo }) => {
    return (
        <React.Fragment>

            <div className="d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">{title}:{itemInfo || null}</h4>

                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className=""><Link to="#">{pageTitle}</Link></li>
                        <li className=" active">{title}</li>
                    </ol>
                </div>

            </div>

        </React.Fragment>
    );
};

export default BreadCrumb;