import React, { useContext } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import RestoreIcon from "@mui/icons-material/Restore";
import { Button, IconButton, TextField } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState();

  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Meeet Video Call</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}>
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}>
            LogOut
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="left-panel">
          <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />

              <Button onClick={handleJoinVideoCall} variant="contained">
                Join Call
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(Home);
