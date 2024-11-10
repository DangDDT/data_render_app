import { UserModel } from "@models";
import { db } from "@services";
import {
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  ref,
} from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import MovingLines from "./MovingLine";

type UserRoomProps = {
  roomId?: string | null;
  onUserAdded?: (newUser: UserModel) => void;
};

export const UserRoom = React.memo(({ roomId, onUserAdded }: UserRoomProps) => {
  const usersRef = useRef<UserModel[]>([]);
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    usersRef.current = [];
    const userRef = ref(db, `/rooms/${roomId}/users`);
    const handleChildAdded = onChildAdded(userRef, (snapshot) => {
      const newUser = snapshot.val();
      if (newUser) {
        usersRef.current = [
          ...usersRef.current,
          { id: snapshot.key, name: newUser.name },
        ];
        onUserAdded && onUserAdded({ id: snapshot.key, name: newUser.name });
        forceUpdate({});
      }
    });

    // Listener for users updated
    const handleChildChanged = onChildChanged(userRef, (snapshot) => {
      const updatedUser = snapshot.val();
      if (updatedUser) {
        usersRef.current = usersRef.current.map((user) =>
          user.id === snapshot.key ? { ...user, name: updatedUser.name } : user,
        );
        forceUpdate({});
      }
    });

    // Listener for users removed
    const handleChildRemoved = onChildRemoved(userRef, (snapshot) => {
      usersRef.current = usersRef.current.filter(
        (user) => user.id !== snapshot.key,
      );
      forceUpdate({});
    });

    return () => {
      handleChildAdded();
      handleChildChanged();
      handleChildRemoved();
      forceUpdate({});
    };
  }, [roomId]);

  return (
    <>
      <MovingLines users={usersRef.current} lineSize={6} />
    </>
  );
});
