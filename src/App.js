import { Avatar, Table, Spin, Modal, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Container from './Container';
import './App.css';
import { getAllStudents } from './client';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentForm';

import useNotification from './Notification'
const getIndicatorIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
  const { openNotificationWithIcon, contextHolder } = useNotification();
  useEffect(() => {
    fetchStudents();
  }, []);//只能当这个依赖数组中的值发生变化时，该函数才会重新运行，在上面的例子中，由于依赖数组是空的，所以该函数只会在组件首次挂载时运行，这与 componentDidMount 的行为类似。


  const fetchStudents = () => {
    setIsFetching(true);
    getAllStudents()
      .then(res => res.json())
      .then(students => {
        console.log(students);
        setStudents(students);
        setIsFetching(false);
      })
      .catch(error => {
        console.log(error.error.message);
        const message = error.error.message;
        openNotificationWithIcon('error', message, message);
        setIsFetching(false);
      })
      ;
  };
  const commonElements = () => (
    <div>
      <Modal
          title='Add new student'
          open={isAddStudentModalVisible}
          onOk={() => setIsAddStudentModalVisible(false)}
          onCancel={() => setIsAddStudentModalVisible(false)}
          width={1000}>
          <h1>Hello with my modal</h1>
          <AddStudentForm
            onSuccess={() => {
              setIsAddStudentModalVisible(false);
              fetchStudents();
            }}

          />
        </Modal>
        <Footer
          numberOfStudents={students.length}
          handleAddStudentClickEvent={() => setIsAddStudentModalVisible(true)}>
        </Footer>
    </div>
  );

  if (isFetching) {
    return (
      <Container>
        {contextHolder}
        <Spin indicator={getIndicatorIcon} />
      </Container>
    );
  }
  if (students && students.length) {
    const columns = [
      {
        title: '',
        key: 'avatar',
        render: (text, student) => (
          <Avatar size='large'>
            {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
          </Avatar>
        )
      },
      {
        title: 'StudentId',
        dataIndex: 'studentId',
        key: 'studentId'

      },
      {
        title: 'FirstName',
        dataIndex: 'firstName',
        key: 'firstName'
      },
      {
        title: 'LastName',
        dataIndex: 'lastName',
        key: 'lastName'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender'
      }
    ];
    return (
      <Container>
        {contextHolder}
        {commonElements()}
      </Container>

    );

  }




  return (
    <Container>
      {contextHolder}
      <Empty description={
        <h1>No students available.</h1>
      }
      />
      {commonElements()}
    </Container>

  );




}

export default App;
