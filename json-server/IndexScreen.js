import React, { useCallback, useContext, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';  // Import useFocusEffect
import { useNavigation } from "@react-navigation/native";


import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

//ADDED THE COMMENTS FOR MY REFERENCE LATER AS I JOURNEY INTO MOBILE APPS WORLD
const IndexScreen = () => {
    const navigation = useNavigation()
  
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);
//  useEffect(() =>{
//   //run this in first render of this page when the app is loaded 
//   //so that the initial data is loaded when the app starts
//   getBlogPosts() 

//   //every time we navigate (when we focus)this screen the  callback inside will be called 
//   // i.e for every rendering of this page
//   /**listener for when this screen gains focus (becomes active). */
//   const listener = navigation.addListener("focus", () =>{
//     getBlogPosts();
//   })

//   // Clean up the listener when the component unmounts or the effect re-runs.
//   // This prevents memory leaks by removing the event listener to avoid duplicating it.
//   return ()=>{
//     listener.remove()
//   }
//  }, []) //empty array to ensure getBlogPosts is called once on first render


 // Fetch blog posts every time the screen comes into focus
 useFocusEffect(
  useCallback(() => {
    getBlogPosts();
  }, [state]) // useCallback prevents unnecessary re-renders
);
// useEffect(() => {
//   // Fetch blog posts initially when the component first renders
//   getBlogPosts();

//   // Add a focus listener to refresh blog posts every time this screen gains focus
//   const listener = navigation.addListener("focus", () => {
//     getBlogPosts();
//   });

//   // Cleanup function to remove the focus listener when the component unmounts
//   return () => {
//     listener.remove();
//   };
// }, []);



return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Show', { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

// IndexScreen.navigationOptions = ({ navigation }) => {
//   return {
//     headerRight: () => (
//       <TouchableOpacity onPress={() => navigation.navigate('Create')}>
//         <Feather name="plus" size={30} />
//       </TouchableOpacity>
//     ),
//   };
// };

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
