import React, { useEffect, useState } from 'react';
import AuthService from '../../service/AuthService';

const Profile = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await AuthService.getProfile();
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile">
            <h2>Profile</h2>
            <p><strong>ID:</strong> {profile.id}</p>
            <p><strong>Username:</strong> {profile.username}</p>
        </div>
    );
};

export default Profile;
