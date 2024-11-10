import { UserModel } from "@models";
import React, { useEffect, useRef } from "react";
import {
  BaseLine,
  LineWithCircleLeftDown,
  LineWithCircleLeftUp,
  LineWithCircleRight,
} from "./Line";
import { UserItem } from "./UserItem";

type UserLineProps = {
  users: UserModel[];
  direction: number;
  speed: number;
  fontSize: number;
  zIndex: number;
  top: number;
};

export const UserLine = React.memo(
  ({ direction, speed, users, fontSize, zIndex, top }: UserLineProps) => {
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const line = lineRef.current;
      if (!line) return;
      let positionX = direction > 0 ? -400 : window.innerWidth;

      const animateLine = () => {
        positionX += direction * speed * 2;

        if (direction > 0 && positionX >= window.innerWidth) {
          positionX = -line.offsetWidth;
        } else if (direction < 0 && positionX <= -line.offsetWidth) {
          positionX = window.innerWidth;
        }

        line.style.transform = `translateX(${positionX}px)`;
        requestAnimationFrame(animateLine);
      };

      animateLine();
    }, [direction, speed]);

    return (
      <div
        className="absolute w-full"
        style={{
          top: top,
          zIndex: zIndex,
          fontSize: `${fontSize}px`,
        }}
      >
        <div className="flex items-center" ref={lineRef}>
          {users.map((user, i) => {
            if (!user || !user.name) return null;
            let numberLine = (user?.name.length ?? 0) % 3;
            if (!users[i + 1] || !users[i + 1].name) {
              numberLine = -1;
            }
            let usersLength = 0;
            for (let j = 0; j < users.length; j++) {
              if (users[j] && users[j].name) {
                usersLength++;
              }
            }
            return (
              <>
                {i === 0 && (
                  <div className="flex">
                    {user.name.length % 3 === 0 ? (
                      <LineWithCircleLeftUp />
                    ) : (
                      <LineWithCircleLeftDown />
                    )}
                  </div>
                )}
                {user && <UserItem key={user.id} user={user} />}
                {i !== users.length - 1 && (
                  <div className="flex flex-col">
                    {numberLine === 0 ? (
                      <BaseLine key={i} />
                    ) : numberLine === -1 ? (
                      <></>
                    ) : (
                      Array.from({ length: numberLine }).map((_, index) => (
                        <BaseLine key={index} />
                      ))
                    )}
                  </div>
                )}
                {i === usersLength - 1 && (
                  <div className="flex">
                    <LineWithCircleRight />
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  },
);
