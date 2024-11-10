import { UserModel } from "@models";
import React from "react";

type UserItemProps = {
  user: UserModel;
};

export const UserItem = React.memo(({ user }: UserItemProps) => {
  return (
    <div className="inline-block rounded-md border-2 border-[#4ffc92] px-1 py-2 text-white">
      <div
        className="animate-scaleIn rounded-md bg-[#00672B] p-2 font-medium text-white"
        style={{ textShadow: "0 0 10px #4ffc92" }}
      >
        <div className="animate-scale">{user && user.name}</div>
      </div>
    </div>
  );
});
