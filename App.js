import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import GoalInput from "./components/GoalInput";

import GoalItem from "./components/GoalItem";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  const [hasModal, setHasModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const onChangeHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoal.trim() != "") {
      setCourseGoals((currentGoals) => [
        ...currentGoals,
        { id: Math.random().toString(), value: enteredGoal },
      ]);
      setEnteredGoal("");
      setHasModal(false);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const onDeleteHandler = (goalId) => {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== goalId)
    );
  };

  const onCancelHandler = () => {
    setHasModal(false);
    setShowError(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Course Goal</Text>
      </View>
      <Button title="Add New Goal" onPress={() => setHasModal(true)} />
      <GoalInput
        visible={hasModal}
        onChange={onChangeHandler}
        valueGoal={enteredGoal}
        addGoal={addGoalHandler}
        onCancel={onCancelHandler}
        error={showError}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            onDelete={onDeleteHandler.bind(this, itemData.item.id)}
            title={itemData.item.value}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "green",
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  screen: {
    padding: 50,
  },
});
