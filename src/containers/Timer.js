import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export const Timer = ({
  timerKey,
  timerRunning,
  secondsRemaining,
  complete,
}) => {
  const formatTime = (time) => {
    // Format time to MM:SS
    if (time >= 60) {
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
    if (time < 10) {
      time = "0" + time;
    }
    return time;
  };

  return (
    <CountdownCircleTimer
      key={timerKey}
      isPlaying={timerRunning}
      duration={secondsRemaining}
      colors="#16697a"
      trailColor="#ffa62b"
      onComplete={complete}
    >
      {({ remainingTime }) => {
        return (
          <View style={styles.timerInner}>
            {remainingTime > 0 ? (
              <>
                <Text style={styles.timerText}>TIME</Text>
                <Animated.Text style={styles.timerTime}>
                  {formatTime(remainingTime)}
                </Animated.Text>
                <Text style={styles.timerText}>REMAINING</Text>
              </>
            ) : (
              <Text style={styles.timesUpText}>TIME'S UP!</Text>
            )}
          </View>
        );
      }}
    </CountdownCircleTimer>
  );
};

const styles = StyleSheet.create({
  timerInner: {
    alignItems: "center",
  },
  timerText: {
    color: "#16697a",
    fontWeight: "bold",
    fontSize: 14,
  },
  timesUpText: {
    textAlign: "center",
    color: "#ffa62b",
    fontWeight: "bold",
    fontSize: 40,
  },
  timerTime: {
    color: "#ffa62b",
    fontWeight: "bold",
    fontSize: 42,
  },
});
