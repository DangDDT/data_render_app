import { UserModel } from "@models";
import React from "react";

type UserItemProps = {
  user: UserModel;
};

export const UserItem = React.memo(({ user }: UserItemProps) => {
  return (
    <div className="inline-block rounded-md border-2 border-[#4ffc92] px-2 py-2 text-white">
      <div className="rounded-md bg-[#00672B] p-2 text-white">
        {user && user.name}
      </div>
    </div>
  );
});
