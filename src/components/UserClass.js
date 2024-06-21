import React from "react";

class UserClass extends React.Component {
  //constructor will recieve props
  constructor(props) {
    super(props); //?? Why do we always need to write super(props)

    //state variable in class based component
    //it is a big object it contains all the state variables
    //never update state variables directly
    this.state = {
      userInfo: {
        name: "name not fetched",
        location: "location not fetched",
        avatar_url: "avatar_url not fetched",
      },
    };
    //console.log("Constructor in Child");
  }

  async componentDidMount() {
    //console.log("componentDidMount in child");
    //API Call
    const data = await fetch("https://api.github.com/users/PromitDey");
    const jsonData = await data.json();
    console.log(jsonData);

    this.setState({
      userInfo: jsonData,
    });
  }

  render() {
    //destructuring
    //console.log("Render in Child");

    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div className="user-card">
        <img
          className="about-user-avatar"
          src={avatar_url}
          alt={"GitHub Avatar"}
        />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: promitdey140@gmail.com</h4>
      </div>
    );
  }
}

export default UserClass;

/*
 * ---MOUNTING---
 * Constructor (Local state vars are created and given dummy data)
 * Render (It is rendered on the web using dummy data)
 *    <HTML> (with dummy data)
 * componentdidMount()
 *    API CALL is made
 *    this.setState() (local state var is upated with the Json Data fetched from API)
 * 
 * ---UPDATING---
 * Render(with API Data) the component is re-rendered as the local state var is updated
 * <HTML> (with API Data)
 * componentDidUpdate()
 * 
 * ---UNMOUNTING---
 * componentWillUnmount()
 * when we move to another page the data that was displayed in the UI gets unmounted resulting in triggering this method
*/
