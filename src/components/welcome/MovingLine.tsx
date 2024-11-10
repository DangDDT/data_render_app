import { UserModel } from "@models";
import React, { useMemo } from "react";
import { UserLine } from "./UserLine";

type MovingLinesProps = {
  users: UserModel[];
  lineSize: number;
};

const MovingLines = React.memo(({ users, lineSize }: MovingLinesProps) => {
  const numOfLines = useMemo(() => {
    const numOfLines = Math.ceil(users.length / lineSize);
    return numOfLines;
  }, [users, lineSize]);
  const userLines = useMemo(() => {
    const userLines: UserModel[][] = [];
    if (numOfLines === 0) return userLines;
    for (let i = 0; i < numOfLines; i++) {
      for (let j = i * lineSize; j < i * lineSize + lineSize; j++) {
        userLines[i] = [...(userLines[i] || []), users[j]];
      }
    }
    return userLines;
  }, [numOfLines, users, lineSize]);

  return (
    <>
      {userLines.map((users, index) => {
        const type = index;
        const type2 = index % 16;
        const fontSize = 14;
        const zIndex = index;
        let top = type * 36 + 20 + type2 * 25;
        let direction = type2 % 2 === 0 ? 1 : -1;
        while (top > window.innerHeight) {
          top = top - window.innerHeight;
        }
        let speed;
        switch (type2) {
          case 0:
            speed = 2.4376457;
            break;
          case 1:
            speed = 2.4351;
            break;
          case 2:
            speed = 2.6126435;
            break;
          case 3:
            speed = 2.823112;
            break;
          case 4:
            speed = 2.742323;
            break;
          case 5:
            speed = 2.275345;
            break;
          case 6:
            speed = 2.9172;
            break;
          case 7:
            speed = 2.412435;
            break;
          case 8:
            speed = 2.86341;
            break;
          case 9:
            speed = 2.95325;
            break;
          case 10:
            speed = 2.9421;
            break;
          case 11:
            speed = 2.14543;
            break;
          case 12:
            speed = 2.7156;
            break;
          case 13:
            speed = 2.98436;
            break;
          case 14:
            speed = 2.8826;
            break;
          case 15:
            speed = 2.471261;
            break;
          default:
            speed = 2.171261;
            break;
        }
        speed = speed * type2 * 0.017126389 + 0.021518 + (16 - type2) * 0.03;
        return (
          <UserLine
            key={index}
            direction={direction}
            speed={speed}
            users={users}
            fontSize={fontSize}
            zIndex={zIndex}
            top={top}
          />
        );
      })}
    </>
  );
});

export default MovingLines;
