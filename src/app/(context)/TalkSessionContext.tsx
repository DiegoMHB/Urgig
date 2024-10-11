import React, { createContext, useContext, useEffect, useState } from 'react';
import Talk from 'talkjs';
import { useUser } from '@clerk/nextjs';

interface TalkSessionContextProps {
  session: Talk.Session | null;
  userId: string | null;
}

const TalkSessionContext = createContext<TalkSessionContextProps>({ session: null, userId: null });

export const useTalkSession = () => useContext(TalkSessionContext);

export const TalkSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Talk.Session | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if(isLoaded && user) {
      setUserId(user.id);
      console.log(user);
      Talk.ready.then(() => {
        const mainUser = new Talk.User({
          id: user?.id ?? '',
          name: user?.firstName + ' ' + user?.lastName,
          email: user?.emailAddresses[0].emailAddress,
          photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
          welcomeMessage: 'Hi!',
        });
  
        const talkSession = new Talk.Session({
          appId: process.env.NEXT_PUBLIC_TALKJS_APP_ID!,
          me: mainUser,
        });
  
        setSession(talkSession);
      });
    } 
  }, [isLoaded]);

  return (
    <TalkSessionContext.Provider value={{ session, userId }}>
      {children}
    </TalkSessionContext.Provider>
  );
};