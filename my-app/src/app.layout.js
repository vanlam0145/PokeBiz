import React from "react";
import auth from "./auth";

export const AppLayout = props => {
  return (
    <div>
      <button
        onClick={() => {
          auth.login(() => {
            props.history.push("/home");
          });
        }}
      >
        Login diiiiiii
      </button>
    </div>
  );
};
export default AppLayout;




