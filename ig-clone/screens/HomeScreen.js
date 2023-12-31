import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import { db } from '../firebase'
import { collectionGroup, query, where, getDocs, orderBy } from "firebase/firestore";  

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      // const querySnapshot = await getDocs(query(collectionGroup(db, 'posts'), orderBy('createdAt', 'desc')))
      const querySnapshot = await getDocs(query(collectionGroup(db, 'posts')))
      querySnapshot.forEach((doc) => {
        setPosts({ id: doc.id, ...doc.data()});
      })
    }
    console.log(posts)
    fetchData()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
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