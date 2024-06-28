import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/AuthService';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getProfile();
            setProfile(data);
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>ID: {profile.id}</p>
            <p>Username: {profile.username}</p>
        </div>
    );
};

export default ProfilePage;
