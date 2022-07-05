import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import { resetPassword, clearErrors } from "../../../actions/userActions";

import "./ResetPassword.scss";
import Loader from "../../layout/Loading/Loader";
import UseHelmet from "../../layout/UseHelmet";

import "./ResetPassword.scss";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, success, loading } = useSelector((state) => state.profile);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  // console.log(token);

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const resetPasswordForm = new FormData();

    resetPasswordForm.set("password", password);
    resetPasswordForm.set("confirmPassword", confirmPassword);

    // console.log("resetPassword submitted");
    dispatch(resetPassword(resetPasswordForm, token));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password reset successful");
      navigate("/login");
    }
  }, [dispatch, error, alert, success, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UseHelmet title={`reset password -- ApniDukaan`} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2>Reset Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={handleResetPasswordSubmit}
              >
                <div className="resetPasswordDetails">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="resetPasswordDetails">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default ResetPassword;
