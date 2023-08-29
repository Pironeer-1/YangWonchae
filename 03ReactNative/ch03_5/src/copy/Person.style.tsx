import { StyleSheet } from "react-native"
import { MD2Colors } from 'react-native-paper'
import color from 'color'

export const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        backgroundColor: MD2Colors.lime100,
        padding: 5
    },
    leftView: {padding: 5},
    avatar: {
        borderColor: color(MD2Colors.blue500).lighten(0.5).string(),
        borderWidth: 2
    },
    rightView: {flex: 1, padding: 5, marginRight: 10},
    name: {
        marginRight: 5,
        fontSize: 22,
        fontWeight: '500'
    },
    email: {
        textDecorationLine: 'underline',
        color: MD2Colors.blue500,
        textDecorationColor: MD2Colors.blue500
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3,
        marginTop: 5
    },
    text: {fontSize: 16},
    comments: {
        marginTop: 10,
        fontSize: 16
    },
    image: {
        height: 150,
        marginTop: 15
    },
    countsView: {
        flexDirection: 'row',
        padding: 3,
        justifyContent: 'space-around'
    },
    touchableIcon: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    iconText: {
        color: MD2Colors.deepPurple500,
        marginLeft: 3
    }
})