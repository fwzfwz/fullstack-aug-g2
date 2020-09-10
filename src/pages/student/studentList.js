import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import db from '../../config/firebase';

const StudentList = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [students, setStudents] = useState([]);
  const history = useHistory();

  const getStudentsFromDb = async () => {
    let sss = [];
    db.collection('students')
      .get()
      .then(ss => {
        ss.forEach(s => {
          let student = s.data();
          student.id = s.id;
          sss.push(student);
        });
        setStudents(sss);
      })
      .catch(error => {
        console.error(`Error ${error}`);
      });
  };

  useEffect(() => {
    getStudentsFromDb();
  }, []);

  useEffect(() => {
    if (Object.keys(props.loggedUser).length <= 1) {
      history.replace('/');
    }
  });

  const deleteStudentFromDb = studentId => {
    db.collection('students')
      .doc(studentId)
      .delete()
      .then(() => console.log('Deleted'))
      .catch(() => console.log('Error Delete'));
    window.location.reload();
  };

  return (
    <div className="w-75 mx-auto">
      {props.loggedUser !== null ? (
        <>
          {props.loggedUser.username === 'admin' ? (
            <Link
              to={{
                pathname: `/student/add`,
                studentId: 'add',
              }}
              className="btn btn-primary ml-4 mt-1"
            >
              + Student
            </Link>
          ) : null}
          <Button className="ml-4 mt-1" onClick={() => setIsEdit(!isEdit)}>
            {isEdit ? 'Unmodify' : 'Modify'}
          </Button>
        </>
      ) : (
        <Link to="/" className="btn btn-primary ml-4 mt-1">
          Login
        </Link>
      )}
      <div className="d-flex flex-wrap flex-row bd-highlight">
        {props.loggedUser.username !== 'admin'
          ? students
              .filter(student => student.username === props.loggedUser.username)
              .map(student => {
                return (
                  <Card
                    style={{ width: '18rem' }}
                    className="mx-4 my-2"
                    key={student.username}
                  >
                    <Card.Img variant="top" src={student.img_url} />
                    <Card.Body>
                      <Card.Title>{student.name}</Card.Title>
                      <Card.Text>{student.motto}</Card.Text>
                      {isEdit ? (
                        <>
                          <Link
                            to={{
                              pathname: `/student/${student.id}`,
                              studentId: student.id,
                            }}
                            className="btn btn-warning mx-1"
                          >
                            Edit {student.username}
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => deleteStudentFromDb(student.id)}
                          >
                            Delete {student.username}
                          </Button>
                        </>
                      ) : (
                        <a
                          href={student.github}
                          target="_blank"
                          className="btn btn-primary"
                          rel="noopener noreferrer"
                        >
                          Github
                        </a>
                      )}
                    </Card.Body>
                  </Card>
                );
              })
          : students
              .filter(student => student.username !== 'admin')
              .map(student => {
                return (
                  <Card
                    style={{ width: '18rem' }}
                    className="mx-4 my-2"
                    key={student.username}
                  >
                    <Card.Img variant="top" src={student.img_url} />
                    <Card.Body>
                      <Card.Title>{student.name}</Card.Title>
                      <Card.Text>{student.motto}</Card.Text>
                      {isEdit ? (
                        <>
                          <Link
                            to={{
                              pathname: `/student/${student.id}`,
                              studentId: student.id,
                            }}
                            className="btn btn-warning mx-1"
                          >
                            Edit {student.username}
                          </Link>
                          <Button
                            variant="danger"
                            onClick={() => deleteStudentFromDb(student.id)}
                          >
                            Delete {student.username}
                          </Button>
                        </>
                      ) : (
                        <a
                          href={student.github}
                          target="_blank"
                          className="btn btn-primary"
                          rel="noopener noreferrer"
                        >
                          Github
                        </a>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
});

export default connect(mapStateToProps)(StudentList);
