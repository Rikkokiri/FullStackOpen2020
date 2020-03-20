import React from 'react'

const Course = ({ course }) => {
  const total = course.parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    </div>
  )
}

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

export default Course
