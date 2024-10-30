import { db } from "@services";
import { onChildAdded, onValue, ref } from "firebase/database";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import UserModel from "src/models/user";
import classNames from "classnames";

type MovingLinesProps = {
  names: string[];
  lineSize: number;
};

const MovingLines = ({ names, lineSize }: MovingLinesProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numOfLines = Math.ceil(names.length / lineSize);
  const namelines = useMemo(() => {
    const namelines: string[][] = [];
    for (let i = 0; i < numOfLines; i++) {
      for (let j = i * lineSize; j < i * lineSize + lineSize; j++) {
        namelines[i] = [...(namelines[i] || []), names[j]];
      }
    }
    return namelines;
  }, [names, lineSize]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = Array.from(container.children) as HTMLDivElement[];

    lines.forEach((line, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      var speed = 1.2;
      switch (index % 3) {
        case 0:
          speed = 1.2;
          break;
        case 1:
          speed = 1.5;
          break;
        case 2:
          speed = 1.8;
          break;
        default:
          speed = 1.2;
          break;
      }
      let positionX = direction > 0 ? -100 : window.innerWidth;

      const animateLine = () => {
        positionX += direction * speed;

        if (direction > 0 && positionX >= window.innerWidth) {
          positionX = -line.offsetWidth;
        } else if (direction < 0 && positionX <= -line.offsetWidth) {
          positionX = window.innerWidth;
        }

        line.style.transform = `translateX(${positionX}px)`;
        requestAnimationFrame(animateLine);
      };

      animateLine();
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gray-900"
    >
      {namelines.map((names, index) => {
        var fontSize = 20;
        var top = names.length * 2 + index * 100;
        var zIndex = index;
        switch (index % 3) {
          case 0:
            fontSize = 20;
            break;
          case 1:
            fontSize = 30;
            break;
          case 2:
            fontSize = 40;
            break;
          default:
            fontSize = 20;
            break;
        }
        switch (index % 4) {
          case 0:
            top = names.length * 2 + index * 100;
            break;
          case 1:
            top = names.length * 2 + index * 200;
            break;
          case 2:
            top = names.length * 2 + index * 300;
            break;
          case 3:
            top = names.length * 2 + index * 400;
            break;
          default:
            top = names.length * 2 + index * 100;
            break;
        }
        switch (index % 5) {
          case 0:
            zIndex = index;
            break;
          case 1:
            zIndex = index * 2;
            break;
          case 2:
            zIndex = index * 3;
            break;
          case 3:
            zIndex = index * 4;
            break;
          case 4:
            zIndex = index * 5;
            break;
          default:
            zIndex = index;
            break;
        }
        if (top > window.innerHeight) {
          top = window.innerHeight - index * 100;
        }
        return (
          <div
            key={index}
            className="absolute whitespace-nowrap font-bold text-white"
            style={{
              top: top,
              zIndex: zIndex,
              fontSize: `${fontSize}px`,
            }}
          >
            <div className="inline-block">
              {names.map((name, i) => (
                <div key={i} className="mx-12 inline-block">
                  {name}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const removeDuplicates = (arr: UserModel[]) => {
  return arr.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
};

const WelcomePage: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    const dataRef = ref(db, "/users");

    const unsubscribe = onChildAdded(dataRef, (snapshot) => {
      const newUser = snapshot.val();
      var newUsers = removeDuplicates([...users, newUser]);
      newUsers.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(newUsers);
    });

    console.log(users);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section className="flex h-screen items-center bg-gray-50 dark:bg-gray-700">
      <div className="flex w-full flex-col items-center">
        <MovingLines names={users.map((u) => u.name)} lineSize={1} />
      </div>
    </section>
  );
};

export default WelcomePage;
