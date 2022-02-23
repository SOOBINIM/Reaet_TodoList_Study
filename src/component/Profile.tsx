import React from "react";

interface ProfileProps {
  name: string;
  age: number;
}

class Profile extends React.Component<ProfileProps> {
  render(): React.ReactNode {
    const { name, age } = this.props;
    return (
      <div>
        <h1>프로필</h1>
        <div>이름 : {name}</div>
        <div>나이 : {age}</div>
      </div>
    );
  }
}

export default Profile;
