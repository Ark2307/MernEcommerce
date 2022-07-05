import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import HttpsIcon from "@mui/icons-material/Https";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import {
  updatePassword,
  clearErrors,
  loadUser,
} from "../../../actions/userActions";

import "./UpdatePassword.scss";
import Loader from "../../layout/Loading/Loader";
import UseHelmet from "../../layout/UseHelmet";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";

function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePasswordSubmit = (e) => {
    e.preventDefault();
    const updatePasswordForm = new FormData();

    updatePasswordForm.set("currPassword", oldPassword);
    updatePasswordForm.set("password", newPassword);
    updatePasswordForm.set("confirmPassword", confirmPassword);

    // console.log("UpdatePassword submitted");
    dispatch(updatePassword(updatePasswordForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated Successfully");
      dispatch(loadUser());

      navigate("/profile");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UseHelmet title={`update password -- ApniDukaan`} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2>Change Password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={handleUpdatePasswordSubmit}
              >
                <div className="updatePasswordDetails">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="updatePasswordDetails">
                  <HttpsIcon />
                  <input
                    type="text"
                    placeholder="New Password"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="updatePasswordDetails">
                  <VpnKeyIcon />
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default UpdatePassword;
