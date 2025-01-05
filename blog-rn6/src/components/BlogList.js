import React, { useContext } from "react";
import { Text, View, FlatList } from "react-native";
import Icon from "./Icon";
import BlogReturnItem from "./BlogReturnItem";
import BlogContext from "../context/BlogContext";

const BlogList = ({ onPressDelete }) => {
  const blogPosts = useContext(BlogContext);
  return (
    <FlatList
      data={blogPosts}
      keyExtractor={(blogPost) => blogPost.title}
      renderItem={({ item }) => (
        <BlogReturnItem
          item={item}
          onPressDelete={() => onPressDelete(item.title)}
        />
      )}
    />
  );
};

export default BlogList;
