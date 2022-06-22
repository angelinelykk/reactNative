import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState". 
  // 1. Score 
  const [correctScore, setCorrectScore] = useState(0);
  // 2. Total
  const [total, setTotalQuestions] = useState(0);
  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedName, setSelectedName] = useState("")

  const [gcorrect, setCorrectMember] = useState(names[Math.floor(Math.random() * names.length)])
  const [gcorrectName, setCorrectName] = useState(nameToPic[gcorrect][0])
  const [gcorrectImage, setCorrectImage] = useState(nameToPic[gcorrect][1])
  let no = [gcorrectName];
    while (no.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!no.includes(wrongName)) {
        no.push(wrongName);
      }
    }
  no = shuffle(no);
  const [gnameOptions, setNameOptions] = useState(no)

  // Called by the timer every 10 seconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left, so decrement time state variable
      setTimeLeft(timeLeft - 1);
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      setTimeLeft(10);
      setTotalQuestions(total + 1);
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.

  const getNextRound = () => {
    if (selectedName == gcorrectName) {
      setCorrectScore(correctScore+1);
    }
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];

    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);

    setCorrectImage(correctImage);
    setCorrectName(correctName);
    setCorrectMember(correct);
    setNameOptions(nameOptions);

    setTimeLeft(10);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {};

  // Call the countDown() method every 10 milliseconds.
  useEffect(() => {
    const timer = setInterval(() => countDown(), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.
  useEffect(
    () => {
      getNextRound();
    },
    [
      total
    ]
  );

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
      // A button is just a Text component wrapped in a TouchableOpacity component.
      <TouchableOpacity
        key={j}
        style={styles.button}
        onPress={() => selectedNameChoice(j)}
      >
        <Text style={styles.buttonText}>
          {/* TODO: Use something from state here. */}
        </Text>
      </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);

  const pressedName = (name) => {
    setSelectedName(name);
    setTotalQuestions(total + 1);
  }
  // Style & return the view.
  return (
    <View style={styles.container}>
      <Text
        style={styles.timerText}
        >{timeLeft}
      </Text>
      <View style = {styles.imageView1}>
        <Image
            source={gcorrectImage}
            style={styles.imageMember}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => 
          pressedName(gnameOptions[0])
        }
      >
        <Text style={styles.buttonText}>{gnameOptions[0]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => pressedName(gnameOptions[1])}
      >
        <Text style={styles.buttonText}>{gnameOptions[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => pressedName(gnameOptions[2])}
      >
        <Text style={styles.buttonText}>{gnameOptions[2]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => pressedName(gnameOptions[3])}
      >
        <Text style={styles.buttonText}>{gnameOptions[3]}</Text>
      </TouchableOpacity>
      <Text 
        style={styles.scoreText}
        >{total}
      </Text>
      <Text 
        style={styles.scoreText}
        >{correctScore}
      </Text>
    </View>
  );
}
