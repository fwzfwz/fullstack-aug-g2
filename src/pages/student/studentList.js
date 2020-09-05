import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';

const StudentList = props => {
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  // const isExist = props.user() !== null;

  return (
    <div className="w-75 mx-auto">
      {props.user() !== null ? (
        <>
          {props.user().id === 'admin' ? (
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
        {props.user().id === 'admin'
          ? props
              .students()
              .filter(student => student.id !== 'admin')
              .map(student => {
                return (
                  <Card
                    style={{ width: '18rem' }}
                    className="mx-4 my-2"
                    key={student.id}
                  >
                    <Card.Img variant="top" src={student.imgUrl} />
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
                            onClick={() => props.deleteStudent(student.id)}
                          >
                            Delete {student.username}
                          </Button>
                        </>
                      ) : (
                        <a
                          href={student.github}
                          target="_blank"
                          className="btn btn-primary"
                        >
                          Github
                        </a>
                      )}
                    </Card.Body>
                  </Card>
                );
              })
          : props
              .students()
              .filter(student => student.id === props.user().id)
              .map(student => {
                return (
                  <Card
                    style={{ width: '18rem' }}
                    className="mx-4 my-2"
                    key={student.id}
                  >
                    <Card.Img variant="top" src={student.imgUrl} />
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
                            onClick={() => props.deleteStudent(student.id)}
                          >
                            Delete {student.username}
                          </Button>
                        </>
                      ) : (
                        <a
                          href={student.github}
                          target="_blank"
                          className="btn btn-primary"
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

export default StudentList;
