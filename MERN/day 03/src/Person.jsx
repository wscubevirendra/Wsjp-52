function Person(props) {
    console.log(props)

    return (
        <div className="box">
            <img src={props.path} alt="" />
            <h3>Name:{props.name}</h3>
            <h3>Email:{props.email}</h3>
            <h3 style={{ color: props.age >= 35 ? 'red' : 'green' }}>Age:{props.age}</h3>
        </div>
    )
}


export default Person


