import React from 'react'

const ProfilePage = (props: any) => {
    return (
        <div>Your profile... {props.params.user}</div>
    )
}

export default ProfilePage