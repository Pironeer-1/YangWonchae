import React from 'react';
import Notification from './Notification';

const reservedNotifications = [
    {
        id: 0,
        message: '안녕하세요, 오늘 일정을 알려드립니다.',
    },
    {
        id: 1,
        message: '점심 식사 시간입니다.',
    },
    // {
    //     id: 2,
    //     message: '이제 곧 미팅이 시작됩니다.',
    // },
    // {
    //     id: 3,
    //     message: '리액트가 업데이트가 되었나요?',
    // },
]

let timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        }
    }

    componentDidMount() {
        console.log('container did mount');
        const { notifications } = this.state;
        timer = setInterval(async () => {
            if(notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                    notifications: notifications,
                });
                console.log(notifications.length, reservedNotifications.length, notifications);
            } else {
                this.setState({
                    notifications: []
                });
                clearInterval(timer);
            }
        }, 1000);
    }

    componentWillUnmount() {
        console.log('container will unmount');
        if (timer) {
            clearInterval(timer);
        }
    }

    render() {
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return (
                        <Notification
                            key={notification.id}
                            id={notification.id}
                            message={notification.message}
                        />
                    )
                })}
            </div>
        );
    }
}

export default NotificationList;