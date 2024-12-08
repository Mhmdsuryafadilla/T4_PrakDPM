import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import TeamScore from "../components/TeamScore";
import CountryFlag from "react-native-country-flag";

export const HomeScreen = () => {
  const [scoreTeamA, setScoreTeamA] = useState(0);
  const [scoreTeamB, setScoreTeamB] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [teamAFlag, setTeamAFlag] = useState("US"); 
  const [teamBFlag, setTeamBFlag] = useState("FR"); 

  const teamAName = "Tim A";
  const teamBName = "Tim B";

  const countryCodes = ["US", "FR", "DE", "IN", "BR", "JP", "CN", "IT", "MX", "AU"];

  const getRandomFlag = () => {
    return countryCodes[Math.floor(Math.random() * countryCodes.length)];
  };

  const increaseScore = (team) => {
    if (gameOver) return;

    if (team === "A" && scoreTeamA < 10) {
      const newScore = scoreTeamA + 1;
      setScoreTeamA(newScore);
      if (newScore === 10) {
        Alert.alert("Pertandingan Selesai", `${teamAName} menang!`);
        setGameOver(true);
      }
    } else if (team === "B" && scoreTeamB < 10) {
      const newScore = scoreTeamB + 1;
      setScoreTeamB(newScore);
      if (newScore === 10) {
        Alert.alert("Pertandingan Selesai", `${teamBName} menang!`);
        setGameOver(true);
      }
    }
  };

  const decreaseScore = (team) => {
    if (gameOver) return;

    if (team === "A" && scoreTeamA > 0) {
      setScoreTeamA(scoreTeamA - 1);
    } else if (team === "B" && scoreTeamB > 0) {
      setScoreTeamB(scoreTeamB - 1);
    }
  };

  const resetScores = () => {
    setScoreTeamA(0);
    setScoreTeamB(0);
    setGameOver(false);
    setTeamAFlag(getRandomFlag());
    setTeamBFlag(getRandomFlag());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skor Pertandingan Bola</Text>

      {}
      <View style={[styles.teamCard, styles.teamCardA]}>
        <CountryFlag isoCode={teamAFlag} style={styles.flag} />
        <TeamScore
          teamName={teamAName}
          score={scoreTeamA}
          onIncrease={() => increaseScore("A")}
          onDecrease={() => decreaseScore("A")}
        />
      </View>

      {}
      <View style={[styles.teamCard, styles.teamCardB]}>
        <CountryFlag isoCode={teamBFlag} style={styles.flag} />
        <TeamScore
          teamName={teamBName}
          score={scoreTeamB}
          onIncrease={() => increaseScore("B")}
          onDecrease={() => decreaseScore("B")}
        />
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetButtonText}>🔄 Reset Pertandingan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf7fa", 
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 30,
  },
  teamCard: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 15,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  teamCardA: {
    borderLeftWidth: 10,
    borderLeftColor: "#3498db", 
  },
  teamCardB: {
    borderLeftWidth: 10,
    borderLeftColor: "#e74c3c", 
  },
  flag: {
    width: 70,
    height: 45,
    marginBottom: 10,
    borderRadius: 5,
  },
  resetButton: {
    backgroundColor: "#16a085", 
    padding: 15,
    borderRadius: 50,
    marginTop: 40,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  resetButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
