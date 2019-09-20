import React from "react";
import auth from "../auth"
import HeaderAdmin from "./headerAdmin"


export const HomeAdmin = props => {
    return (
        <div>
            <HeaderAdmin {...props} />
        </div>
    );
};
export default HomeAdmin;
