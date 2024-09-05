import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";


const SingleCourseDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [department, setDepartment] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("courseDetails")
            .get(urlParams.singleCourseDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"department"] }})
            .then((res) => {
                set_entity(res || {});
                const department = Array.isArray(res.department)
            ? res.department.map((elem) => ({ _id: elem._id, stuID: elem.stuID }))
            : res.department
                ? [{ _id: res.department._id, stuID: res.department.stuID }]
                : [];
        setDepartment(department);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "CourseDetails", type: "error", message: error.message || "Failed get courseDetails" });
            });
    }, [props,urlParams.singleCourseDetailsId]);


    const goBack = () => {
        navigate("/courseDetails");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">CourseDetails</h3>
                </div>
                <p>courseDetails/{urlParams.singleCourseDetailsId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Name</label><p className="m-0 ml-3" >{_entity?.name}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Department</label>
                    {department.map((elem) => (
                        <Link key={elem._id} to={`/studentDetails/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.stuID}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="created At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="last Updated By:"></Tag>
                        <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <Tag value="updated At:"></Tag>
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
        
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleCourseDetailsPage);
