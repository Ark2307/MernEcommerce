import React, { Fragment, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Profile.scss";
import Loader from "../../layout/Loading/Loader";
import UseHelmet from "../../layout/UseHelmet";

function Profile() {
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) navigate("/login");
  }, [navigate, isAuthenticated]);

  const imgUrl = user.profilePic.url;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UseHelmet title={`${user.name} --ApniDukaan`} />
          <div className="profileContainer">
            <div className="profile">
              <h1>My Profile</h1>
              <img src={imgUrl ? imgUrl : "/Profile.png"} alt="avatar" />
              <Link to="/profile/edit">Edit Profile</Link>
            </div>

            <div className="profileInfo">
              <div>
                <h4>Full Name</h4>
                <p>{`${user.name}`}</p>
              </div>

              <div>
                <h4>Email</h4>
                <p>{`${user.email}`}</p>
              </div>

              <div className="Links">
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default Profile;
