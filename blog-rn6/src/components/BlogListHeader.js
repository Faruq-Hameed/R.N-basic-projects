import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "./Icon";

const BlogListHeader = ({ iconName, library }) => {

  return (
    <View style={headerStyles.container}>
      <Text>Blog List</Text>
      <Icon name={iconName} screen="Add" library={library} />
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    height: 40,
    backgroundColor: "rgb(230, 231, 231)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 30,
  },
});

export default BlogListHeader;
