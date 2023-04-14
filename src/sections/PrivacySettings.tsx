import CommunicationPreferences from '@/components/CommunicationPreferences';
import PrivacySettings from '@/components/PrivacySettings';
import React, { useState } from 'react';

const PrivacySettingsSection: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [isVisibleToFriends, setIsVisibleToFriends] = useState(false);
  const [isEmailSubscribed, setIsEmailSubscribed] = useState(true);
  const [isNotificationSubscribed, setIsNotificationSubscribed] =
    useState(true);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-medium mb-8">Settings</h1>
      <PrivacySettings
        isPublic={isPublic}
        setIsPublic={setIsPublic}
        isVisibleToFriends={isVisibleToFriends}
        setIsVisibleToFriends={setIsVisibleToFriends}
      />
      <CommunicationPreferences
        isSubscribedToEmails={isEmailSubscribed}
        setIsSubscribedToEmails={setIsEmailSubscribed}
        isSubscribedToNotifications={isNotificationSubscribed}
        setIsSubscribedToNotifications={setIsNotificationSubscribed}
      />
      <button className="bg-red hover:bg-pink text-white py-2 px-4 rounded-lg mt-8">
        Save Changes
      </button>
    </div>
  );
};

export default PrivacySettingsSection;
