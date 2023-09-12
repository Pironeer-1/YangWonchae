import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'

export const bottomTabIcons = [
    {
        name: 'Home',
        active: require('../../assets/home-5-fill.png'),
        inactive: require('../../assets/home-5-line.png')
    },
    {
        name: 'Search',
        active: require('../../assets/search-fill.png'),
        inactive: require('../../assets/search-line.png')
    },
    {
        name: 'Reels',
        active: require('../../assets/movie-fill.png'),
        inactive: require('../../assets/movie-line.png')
    },
    {
        name: 'Shop',
        active: require('../../assets/store-fill.png'),
        inactive: require('../../assets/store-line.png')
    },
    {
        name: 'Profile',
        active: require('../../assets/profile.jpg'),
        inactive: require('../../assets/profile.jpg')
    }
]

const BottomTabs = ({icons}) => {
    const [activeTab, setActiveTab] = useState('Home')
    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image
                source={activeTab === icon.name ? icon.active : icon.inactive}
                // 중요!!
                style={[
                    styles.icon,
                    icon.name === 'Profile' ? styles.profilePick() : null,
                    activeTab === 'Profile' && icon.name === activeTab ? styles.profilePick(activeTab) : null,
                ]}
            />
        </TouchableOpacity>
    )
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom:'0%',
        zIndex: 999,
        backgroundColor: '#000',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
    },
    icon: {
        width: 30,
        height: 30
    },
    profilePick: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === 'Profile' ? 2 : 0,
        borderColor: '#fff',
    })
})

export default BottomTabs