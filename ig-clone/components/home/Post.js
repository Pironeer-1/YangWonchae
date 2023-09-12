import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import { updateDoc } from 'firebase/firestore'
import { app, auth, db } from '../../firebase'

const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: require('../../assets/heart-line.png'),
        likedImageUrl: require('../../assets/heart-fill.png')
    },
    {
        name: 'Comment',
        imageUrl: require('../../assets/chat-3-line.png')
    },
    {
        name: 'Share',
        imageUrl: require('../../assets/send-plane-2-line.png')
    },
    {
        name: 'Save',
        imageUrl: require('../../assets/bookmark-line.png'),
        savedImageUrl: require('../../assets/bookmark-fill.png')
    }
]

const Post = ({ post }) => {
    const handleLike = async (post) => {
        const currentLikeStatus = !post.likes_by_users.includes(
            auth.currentUser.email
        )
        const userDocRef = doc(db, 'users', post.owner_email);
        const postsCollectionRef = collection(userDocRef, 'posts');
        try {
            const docRef = await updateDoc(postsCollectionRef, {
                likes_by_users: currentLikeStatus ?
                db.FieldValue.arrayUnion(
                    auth.currentUser.email
                ):
                db.FieldValue.arrayRemove(
                    auth.currentUser.email
                )
            })
            console.log('Document successfully updated!')
        } catch (error) {
            console.log('Error updating document:', error)
        }
    }
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={0.5} oriantation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{marginHorizontal: 15, marginTop: 10}}>
                <PostFooter post={post} handleLike={handleLike} />
                <Likes post={post} />
                <Caption post={post} />
                <CommentSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}

const PostHeader = ({ post }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={post.profile_picture}
                    style={styles.story}
                />
                <Text
                    style={{
                        color: 'white',
                        marginLeft: 5,
                        fontWeight: '700'
                    }}
                >
                    {post.user}
                </Text>
            </View>

            <Text style={{color: 'white', fontWeight: '900'}}>...</Text>
        </View>
    )
}

const PostImage = ({post}) => (
    <View
        style={{
            width: '100%',
            height: 450
        }}
    >
        <Image
            source={post.imageUrl}
            style={{
                height: '100%',
                resizeMode: 'cover'
            }}
        />
    </View>
)

const PostFooter = ({handleLike, post}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.leftFooterIconsContainer}>
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image
                    style={styles.footerIcon}
                    source={
                        post.likes_by_users.includes(auth.currentUser.email)
                        ? postFooterIcons[0].likedImageUrl
                        : postFooterIcons[0].imageUrl
                    }
                />
            </TouchableOpacity>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
            <Icon
                imgStyle={[styles.footerIcon, styles.shareIcon]}
                imgUrl={postFooterIcons[2].imageUrl}
            />
        </View>
        {/* <View style={{flex: 1, alignItems: 'flex-end'}}> */}
        <View>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
        </View>
    </View>
)

const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={imgUrl} />
    </TouchableOpacity>
)

const Likes = ({post}) => (
    <View style={{flexDirection: 'row', marginTop: 4}}>
        <Text style={{color: 'white', fontWeight: '600'}}>
            {post.likes_by_users.length.toLocaleString('en')} likes
        </Text>
    </View>
)

const Caption = ({post}) => (
    <View style={{margineTop: 5}}>
        <Text style={{color: 'white'}}>
            <Text style={{fontWeight: '600'}}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentSection = ({post}) => (
    <View style={{marginTop: 5}}>
        {/* 중요!! */}
        {!!post.comments.length && (
            <Text style={{color: 'gray'}}>
                View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
                {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>
        )}
    </View>
)

const Comments = ({post}) => (
    <>
    {post.comments.map((comment, index) => (
        <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'white'}}>
                <Text style={{fontWeight: '600'}}>{comment.user} </Text>
                {comment.comment}
            </Text>
        </View>
    ))}
    </>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    footerIcon: {
        width: 33,
        height: 33,
        marginRight: 10
    },
    shareIcon: {
        transform: [{rotate: '320deg'}],
        marginTop: -3
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: 32,
        justifyContent: 'space-between'
    }
})

export default Post