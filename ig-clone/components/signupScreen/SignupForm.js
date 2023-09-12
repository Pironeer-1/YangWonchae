import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { app, auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from "firebase/firestore"; 

const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is requried'),
        password: Yup.string().required().min(6, 'Your password has to have at least 8 characters')
    })

    const onSignup = async (email, password, username) => {
        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password)
            console.log("🔥 Firebase User Created Successfuly 🔥", email, password)
            const picture = await getRandomProfilePicture()
            const docRef = await addDoc(collection(db, "users"), {
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: picture,
            })
        } catch(error) {
            Alert.alert('🔥 My Lord ...', error.message)
        }
    }

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email: '', username: '', password: ''}}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
            <>
            <View style={[styles.inputField,
                {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc' : 'red'}
            ]}>
                <TextInput
                    placeholderTextColor='#444'
                    placeholder='Email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus={true}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
            </View>
            <View style={[styles.inputField,
                {borderColor: values.username.length > 2 || values.username.length < 1 ? '#ccc' : 'red'}
            ]}>
                <TextInput
                    placeholderTextColor='#444'
                    placeholder='Username'
                    autoCapitalize='none'
                    autoFocus={true}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                />
            </View>
            <View style={[styles.inputField,
                {borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red'}
            ]}>
                <TextInput
                    placeholderTextColor='#444'
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType='password'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                />
            </View>
            <View style={{alignItems: 'flex-end', marginBottom: 30}}></View>
            <Pressable
                titleSize={20}
                style={styles.button(isValid)}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <View style={styles.signUpContainer}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{color: '#6BB0F5'}}> Log In</Text>
                </TouchableOpacity>
            </View>
            </>
            )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 20,
    },
    signUpContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50,
    }
})

export default SignupForm