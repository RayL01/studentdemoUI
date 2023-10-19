
import fetch from 'unfetch';
const checkStatus = response => {
    if (response.ok) {
        return response;
    }else{
        
        let error = new Error(response.statusText);
        error.response = response;
        return response.json().then(e => {
            error.error = e;
            return Promise.reject(error);
        });
       
        
    }
};

export const getAllStudents = () => {
    console.log('getAllStudents called'); // 这里添加日志
    return fetch('api/students').then(checkStatus);
};

    
    
export const addNewStudent = student =>
    fetch(
        'api/students',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(student)
        }

    )
    .then(checkStatus);