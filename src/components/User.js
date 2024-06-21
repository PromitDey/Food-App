import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const User = (props) => {
  const [userInfo, setUserInfo] = useState({
    name: "dummy_name",
    location: "dummy_location",
    avatar_url: "dummy_url",
    bio: "dummy_bio",
  });

  const [emailCopy, setEmailCopy] = useState(false);

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("promitdey140@gmail.com");
    alert("Email Copied, Check Clipboard . . .");
    setEmailCopy(true);
    setTimeout(() => {
      setEmailCopy(false);
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async function () {
    const data = await fetch("https://api.github.com/users/PromitDey");
    const jsonData = await data.json();
    //console.log(jsonData);

    setUserInfo(jsonData);
  };

  const { name, location, avatar_url, bio } = userInfo;

  return (
    <div className="flex flex-col p-2.5 uCard-custom border-2 border-solid border-black rounded-lg items-center">
      <img
        className="custom2 border-2 border-solid border-black"
        src={avatar_url}
        alt={"GitHub Avatar"}
      />
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Name: {name}</h3>
        <h3>Location: {location}</h3>
        <h3>{bio}</h3>
        <div className="flex justify-center text-3xl my-7">
          <button className="btn-mail-icon" onClick={handleEmailCopy}>
            <MdOutlineEmail className="mx-2" />
          </button>
          <Link to="https://github.com/PromitDey" className="about-icon-link">
            <AiOutlineGithub className="mx-2" />
          </Link>
          <Link
            to="https://www.linkedin.com/in/promitdey097/"
            className="about-icon-link"
          >
            <AiOutlineLinkedin className="mx-2" />
          </Link>
          <Link to="https://twitter.com/PromitDey5" className="about-icon-link">
            <FaXTwitter className="mx-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
