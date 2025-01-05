import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

// import { useNavigation } from "@react-navigation/native";

import Icon from "./Icon";

const BlogReturnItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
           console.log("Here")
          // navigation.navigate("GetOne", { post: item })
        }
      >
        <Text>{item.title}</Text>
      </TouchableOpacity>
      <Icon library="AntDesign" name="delete" screen="GetAll" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    height: 50,
    marginHorizontal: 5,
  },

  item: {
    flex: 1,
  },
});

export default BlogReturnItem;
