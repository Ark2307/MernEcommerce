import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/FaceOutlined";
import AvatarIcon from "@mui/icons-material/AccountCircleOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import {
  clearErrors,
  loadUser,
  updateUser,
} from "../../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";

import "./EditProfile.scss";
import Loader from "../../layout/Loading/Loader";
import UseHelmet from "../../layout/UseHelmet";
import { useAuth0 } from "@auth0/auth0-react";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { userAuth } = useAuth0();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState();
  const [avatar, setAvatar] = useState();

  //Signup Function
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updateForm = new FormData();

    updateForm.set("name", name);
    updateForm.set("email", email);
    updateForm.set("avatar", avatar);

    // console.log("Update submitted");
    dispatch(updateUser(updateForm));
  };

  // Update change function
  const handleUpdateChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.picture);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile updated Successfully");
      userAuth.name = user.name;
      userAuth.picture = user.profilePic.url;
      userAuth.email = user.email;
      dispatch(loadUser());

      navigate("/profile");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate, user, userAuth]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UseHelmet title={`update ${user.name} -- ApniDukaan`} />
          <div className="editProfileContainer">
            <div className="editProfileBox">
              <h2>Edit Profile</h2>
              <form className="editProfileForm" onSubmit={handleUpdateSubmit}>
                <div className="editProfileDetails">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="editProfileDetails">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="editProfileDetails" id="updateImage">
                  <AvatarIcon />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleUpdateChange}
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

export default EditProfile;
