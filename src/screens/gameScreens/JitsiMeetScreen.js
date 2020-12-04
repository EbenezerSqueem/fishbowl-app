import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import JitsiMeet, { JitsiMeetView } from "react-native-jitsi-meet";

import { Header, FormContainer } from "../../components";
import { GameContext } from "../../context/GameProvider";

export const JitsiMeetScreen = ({ navigation }) => {
  const { gameRoom, localUsers } = useContext(GameContext);
  const [joinMeeting, setJoinMeeting] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        // can also be only room name and will connect to jitsi meet servers
        //const url = 'https://your.jitsi.server/roomName';
        const roomName = `fb-jitsi-room-${gameRoom.roomCode}`;
        const userInfo = {
          displayName: localUsers[0],
          email: "user@example.com",
          avatar: "https:/gravatar.com/avatar/abc123",
        };
        JitsiMeet.call(roomName, userInfo);
        /* You can also use JitsiMeet.audioCall(url) for audio only call */
        /* You can programmatically end the call with JitsiMeet.endCall() */
      }, 1000);
      //   const roomName = `fb-jitsi-room-${gameRoom.roomCode}`;
      //   const userInfo = {
      //     displayName: localUsers[0],
      //     email: "user@example.com",
      //     avatar: "https:/gravatar.com/avatar/abc123",
      //   };
      //   JitsiMeet.call(roomName, userInfo);
    }
    return () => {
      mounted = false;
      JitsiMeet.endCall();
    };
  }, [joinMeeting]);

  const onConfTerminated = (nativeEvent) => {
    console.log("Conference terminated event");
    console.log(nativeEvent);
    setJoinMeeting(false);
  };

  const onConfJoined = (nativeEvent) => {
    console.log("Conference joined event");
    console.log(nativeEvent);
  };

  const onConfWillJoin = (nativeEvent) => {
    console.log("Conference will join event");
    console.log(nativeEvent);
  };

  return (
    <>
      <Header navigation={navigation} showBack={false} />
      <View style={styles.container}>
        {/* {!joinMeeting && (
          <FormContainer style={styles.joinButton}>
            <FormContainer.RoundButton
              onPress={() => setJoinMeeting(true)}
              buttonStyles={{ width: 200, height: 200 }}
            >
              Join Video
            </FormContainer.RoundButton>
          </FormContainer>
        )} */}
        <JitsiMeetView
          onConferenceTerminated={onConfTerminated}
          onConferenceJoined={onConfJoined}
          onConferenceWillJoin={onConfWillJoin}
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#82c0cc",
  },
  joinButton: {
    position: "absolute",
    top: 200,
    left: 100,
  },
});
