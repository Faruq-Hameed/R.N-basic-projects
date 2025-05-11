import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context as TrackContext } from '../contexts/TrackContext'
import { useNavigation } from '@react-navigation/native';

// This screen displays the details of a specific track
//NOT YET TESTED FULLY

const TrackDetailScreen = () => {
  const navigation = useNavigation();
  const { state } = useContext(TrackContext);
  const _id = navigation.getState().routes[1].params._id; // Get the _id from the params

  const track = state.find(t => t._id === _id);

  return <Text style={{ fontSize: 48 }}>{track.name}</Text>;
};

const styles = StyleSheet.create({});

export default TrackDetailScreen;
