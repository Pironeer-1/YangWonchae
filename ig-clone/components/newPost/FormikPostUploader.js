import { View, Text, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import { app, auth, db } from '../../firebase'
import { collection, query, where, getDocs, getDoc, doc, addDoc, serverTimestamp, limit, onSnapshot } from 'firebase/firestore'

const PLACEHOLDER_IMG = 'https://picsum.photos/seed/picsum/200/300'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit.')
})

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

    const getUsername = async () => {
        const user = auth.currentUser
        const userCollectionRef = collection(db, 'users');
        const queryRef = query(
            userCollectionRef,
            where('owner_uid', '==', user.uid),
            limit(1)
        );
        console.log(user.uid)
        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
              setCurrentLoggedInUser({
                username: doc.data().username,
                profilePicture: doc.data().profile_picture
              });
            });
        });
        return unsubscribe
    }

    useEffect(() => {
        async function fetchData() {
            await getUsername()
        }
        fetchData()
    }, [])
    
    console.log(currentLoggedInUser)
    const uploadPostToFirebase = async (imageUrl, caption) => {
        const unsubscribe = await getDoc(doc(db, "users", auth.currentUser.email))
        const userDocRef = doc(db, 'users', auth.currentUser.email);
        const postsCollectionRef = collection(userDocRef, 'posts');
        const docRef = await addDoc(postsCollectionRef, {
            imageUrl: imageUrl,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profilePicture,
            owner_uid: auth.currentUser.uid,
            owner_email: auth.currentUser.email,
            caption: caption,
            createdAt: serverTimestamp(),
            likes_by_users: [],
            comments: []
        })
        navigation.goBack()
        return unsubscribe
    }

    return (
        <Formik
            initialValues={{caption: '', imageUrl: ''}}
            onSubmit={(values) => {
                uploadPostToFirebase(values.imageUrl, values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {/* form: caption, url */}
            {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
                <>
                <View
                    style={{
                        margin: 20,
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG}}
                        style={{width: 100, height: 100}}
                    />
                    <View style={{flex: 1, marginLeft: 12}}>
                        <TextInput
                            style={{color: 'white', fontSize: 20}}
                            placeholder='Write a caption...'
                            placeholderTextColor='grey'
                            multiline={true}
                            onChangeText={handleChange('caption')}
                            onBlur={handleBlur('caption')}
                            value={values.caption}
                        />
                    </View>
                </View>
                <Divider width={0.2} orientation='vertical' />
                <TextInput
                    onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                    style={{color: 'white', fontSize: 18}}
                    placeholder='Enter Image Url'
                    placeholderTextColor='grey'
                    onChangeText={handleChange('imageUrl')}
                    onBlur={handleBlur('imageUrl')}
                    value={values.imageUrl}
                />
                {errors.imageUrl && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.imageUrl}
                    </Text>
                )}
                <Button
                    onPress={handleSubmit}
                    title='Share'
                    disabled={!isValid}
                />
                </>
            )}
        </Formik>
    )
}

export default FormikPostUploader