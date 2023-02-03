const Course = ({courses}) => {
  //console.log("courses: ", courses)
  return (
    <>
      <Header course={courses} />
      <Content parts={courses.parts} />
    </>
  )
}

const Header = ({course}) => {
  //console.log("Header: ", course)
  return (
    <>
      <h2>{course.name}</h2>
    </>
  )
}

const Content = ({parts}) => {
  //console.log("Content parts: ", parts)
  return (
    <div>
      {parts.map( part => <Part key={part.id} part={part}/> )}
      <Total parts={parts} />
    </div>
  )
}

const Part = (props) => {
  //console.log("Part: ", props)
  return (
    <>
      <p>
          {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Total = ({parts}) => {
  //console.log("Total: ", parts)
  let total = parts.reduce( (s, p) => s + p.exercises, 0)

  return (
    <>
      <b>total of exercises {total}</b>
    </>
  )
}

export default Course