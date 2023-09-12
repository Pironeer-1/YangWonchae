import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import { db } from '../firebase'
import { collectionGroup, query, where, getDocs } from "firebase/firestore";  

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(query(collectionGroup(db, 'posts')))
      querySnapshot.forEach((doc) => {
        setPosts(doc.data());
      })
    }
    fetchData()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {setPosts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    }
})

export default HomeScreen