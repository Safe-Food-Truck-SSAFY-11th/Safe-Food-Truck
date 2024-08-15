import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import styles from "./UserVideo.module.css";

const UserVideoComponent = ({ streamManager }) => {
  // const getNicknameTag = () => {
  //   return JSON.parse(streamManager.stream.connection.data).clientData;
  // };

  return (
    <>
      {streamManager !== undefined ? (
        <div className={styles.streamcomponent}>
          <OpenViduVideoComponent streamManager={streamManager} />
          {/* <div>
            <p>{getNicknameTag()}</p>
          </div> */}
        </div>
      ) : null}
    </>
  );
};

export default UserVideoComponent;
