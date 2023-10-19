import {notification} from 'antd';

const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description
        });
    };

    return { openNotificationWithIcon, contextHolder };
}

export default useNotification;
