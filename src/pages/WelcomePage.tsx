import { useModal } from "@hooks";
import { db } from "@services";
import {
  get,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  ref,
} from "firebase/database";
import { useEffect, useMemo, useRef, useState } from "react";
import { RoomModel, UserModel } from "@models";
import classNames from "classnames";
import React from "react";
import { CircularProgressLoading } from "@components/common";
import { WebBackground } from "@assets";

type MovingLinesProps = {
  users: UserModel[];
  lineSize: number;
};

const MovingLines = React.memo(({ users, lineSize }: MovingLinesProps) => {
  const numOfLines = useMemo(
    () => Math.ceil(users.length / lineSize),
    [users, lineSize],
  );
  const userlines = useMemo(() => {
    const userlines: UserModel[][] = [];
    for (let i = 0; i < numOfLines; i++) {
      for (let j = i * lineSize; j < i * lineSize + lineSize; j++) {
        userlines[i] = [...(userlines[i] || []), users[j]];
      }
    }
    return userlines;
  }, [users, lineSize]);

  return (
    <>
      {userlines.map((users, index) => {
        console.log(users);
        const type = index;
        const type2 = index % 15;
        const fontSize = type2 * type * 0.0143172 + 10.315;
        const zIndex = index;
        let top = type * 60 + 30;
        if (top > window.innerHeight - 100) {
          top = window.innerHeight - type2 * 100;
        }
        const direction = type2 % 3 === 0 ? 1 : -1;
        let speed = 1.2;
        switch (type2) {
          case 0:
            speed = 1.4376457;
            break;
          case 1:
            speed = 1.4351;
            break;
          case 2:
            speed = 1.6126435;
            break;
          case 3:
            speed = 1.823112;
            break;
          case 4:
            speed = 1.742323;
            break;
          case 5:
            speed = 1.275345;
            break;
          case 6:
            speed = 1.9172;
            break;
          case 7:
            speed = 1.412435;
            break;
          case 8:
            speed = 1.86341;
            break;
          case 9:
            speed = 1.95325;
            break;
          case 10:
            speed = 1.4421;
            break;
          case 11:
            speed = 1.84543;
            break;
          case 12:
            speed = 1.7156;
            break;
          case 13:
            speed = 1.98436;
            break;
          case 14:
            speed = 1.8826;
            break;
          default:
            speed = 1.171261;
            break;
        }
        speed = speed  * type2 * 0.017126389 + 0.011518 + (15 - type2) * 0.04;
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

const UserLine = React.memo(
  ({
    direction,
    speed,
    users,
    fontSize,
    zIndex,
    top,
  }: {
    direction: number;
    speed: number;
    users: UserModel[];
    fontSize: number;
    zIndex: number;
    top: number;
  }) => {
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const line = lineRef.current;
      if (!line) return;
      let positionX = direction > 0 ? -100 : window.innerWidth;

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
            return (
              <>
                {i === 0 && (
                  <div className="flex">
                    {
                      user.name.length % 3 === 0 ? <LineWithCircleLeftUp /> : <LineWithCircleLeftDown />
                    }
                  </div>
                )}
                {user && <UserItem key={i} user={user} />}
                {i !== users.length - 1 && (
                  <div className="flex flex-col">
                    {numberLine === 0 ? (
                      <Line key={i} />
                    ) : numberLine === -1 ? (
                      <></>
                    ) : (
                      Array.from({ length: numberLine }).map((_, index) => (
                        <Line key={index} />
                      ))
                    )}
                  </div>
                )}
                {i === users.length - 1 && <div className="flex">
                  <LineWithCircleRight />
                </div>}
              </>
            );
          })}
        </div>
      </div>
    );
  },
);

const Line = React.memo(() => {
  return <div className="mb-2 mt-2 h-0.5 w-16 bg-[#4ffc92]"></div>;
});

const LineWithCircleLeftUp = React.memo(() => {
  return (
    <div className="flex">
      <div className="absolute h-4 w-4 rounded-full border-4 left-[-30px] top-[-2px] border-[#4ffc92]"></div>
      <div className="flex">
        <div className="absolute mb-0 mt-0 h-0.5 w-6 rotate-45 transform bg-[#4ffc92] left-[-19px]"></div>
        <div className="mb-2 mt-2 h-0.5 w-16 bg-[#4ffc92]"></div>
      </div>
    </div>
  );
});

const LineWithCircleLeftDown = React.memo(() => {
  return (
    <div className="flex">
      <div className="absolute h-4 w-4 rounded-full border-4 left-[-30px] bottom-[-2px] border-[#4ffc92]"></div>
      <div className="flex">
        <div className="absolute mb-0 mt-0 h-0.5 w-6 -rotate-45 transform bg-[#4ffc92] left-[-20px] top-[34px]"></div>
        <div className="mb-2 mt-2 h-0.5 w-16 bg-[#4ffc92]"></div>
      </div>
    </div>
  );
});

const LineWithCircleRight = React.memo(() => {
  return (
    <div className="flex">
      <div className="mb-2 mt-2 h-0.5 w-16 bg-[#4ffc92]"></div>
      <div className="right-[30px] top-[2px] h-4 w-4 rounded-full border-4 border-[#4ffc92]"></div>
    </div>
  );
});

const UserItem = React.memo(({ user }: { user: UserModel }) => {
  return (
    <div className="inline-block rounded-md border-2 border-[#4ffc92] px-2 py-2 text-white">
      <div className="bg-[#00672B] p-2 text-yellow-300">
        {user && user.name}
      </div>
    </div>
  );
});

type UserRoomProps = {
  roomId: string | null;
};

const UserRoom = ({ roomId }: UserRoomProps) => {
  const usersRef = useRef<UserModel[]>([]);
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    if (!roomId) return;
    usersRef.current = [];
    const userRef = ref(db, `/rooms/${roomId}/users`);
    const handleChildAdded = onChildAdded(userRef, (snapshot) => {
      const newUser = snapshot.val();
      if (newUser) {
        usersRef.current = [
          ...usersRef.current,
          { id: snapshot.key, name: newUser.name },
        ];
        forceUpdate({}); // Trigger re-render nếu cần
      }
    });

    // Listener for users updated
    const handleChildChanged = onChildChanged(userRef, (snapshot) => {
      const updatedUser = snapshot.val();
      if (updatedUser) {
        usersRef.current = usersRef.current.map((user) =>
          user.id === snapshot.key ? { ...user, name: updatedUser.name } : user,
        );
        forceUpdate({}); // Trigger re-render nếu cần
      }
    });

    // Listener for users removed
    const handleChildRemoved = onChildRemoved(userRef, (snapshot) => {
      usersRef.current = usersRef.current.filter(
        (user) => user.id !== snapshot.key,
      );
      forceUpdate({}); // Trigger re-render nếu cần
    });

    return () => {
      handleChildAdded();
      handleChildChanged();
      handleChildRemoved();
    };
  }, [roomId]);

  return (
    <>
      {usersRef.current && (
        <MovingLines users={usersRef.current} lineSize={6} />
      )}
    </>
  );
};

const WelcomePage = () => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [displayRoom, setDisplayRoom] = useState<RoomModel | null>(null); // State chỉ để hiển thị tên phòng
  const selectedRoomRef = useRef<RoomModel | null>(null); // Ref để lưu selectedRoom thực tế
  const { Modal: RoomModal, showModal: showRoomModel } = useModal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataRef = ref(db, "/rooms");

    getOnceFirstRoom().then((r) => r);

    const handleChildAdded = onChildAdded(dataRef, (snapshot) => {
      const newRoom = snapshot.val();
      if (newRoom) {
        setRooms((rooms) => [...rooms, { id: snapshot.key, ...newRoom }]);
      }

      // Chỉ đặt selectedRoomRef khi nó chưa được chọn
      if (!selectedRoomRef.current && rooms.length > 0) {
        selectedRoomRef.current = rooms[0];
        setDisplayRoom(rooms[0]); // Cập nhật để hiển thị tên phòng
      }
    });

    const handleChildChanged = onChildChanged(dataRef, (snapshot) => {
      const updatedRoom = snapshot.val();
      if (updatedRoom) {
        setRooms((rooms) =>
          rooms.map((room) =>
            room.id === snapshot.key
              ? { id: snapshot.key, ...updatedRoom }
              : room,
          ),
        );
      }
    });

    const handleChildRemoved = onChildRemoved(dataRef, (snapshot) => {
      setRooms((rooms) => rooms.filter((room) => room.id !== snapshot.key));
    });

    return () => {
      handleChildAdded();
      handleChildChanged();
      handleChildRemoved();
    };
  }, []);

  const handleRoomSelection = (room: RoomModel) => {
    if (selectedRoomRef.current?.id !== room.id) {
      selectedRoomRef.current = room; // Cập nhật selectedRoom thực tế
      setDisplayRoom(room); // Cập nhật tên phòng hiển thị
    }
  };

  const getOnceFirstRoom = async () => {
    const dataRef = ref(db, "/rooms");
    const data = await get(dataRef).then((snapshot) => {
      const rooms: RoomModel[] = [];
      snapshot.forEach((childSnapshot) => {
        rooms.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return rooms;
    });
    setRooms(data);
    if (data.length > 0) {
      selectedRoomRef.current = data[0];
      setDisplayRoom(data[0]);
    }
    setLoading(false);
  };

  return (
    <section className="flex h-screen w-full items-center">
      <div className="absolute inset-0 z-0 h-screen w-full">
        <img
          src={WebBackground}
          alt="background"
          className="bg-opacity-950 h-screen w-full object-cover bg-blend-darken"
          style={{ filter: "blur(2px) brightness(0.5)" }}
        />
      </div>
      <div className="flex w-full flex-col items-center">
        {/* Chỉ render UserRoom với roomId từ selectedRoomRef, tránh re-render khi rooms thay đổi */}
        {loading ? (
          <CircularProgressLoading />
        ) : (
          selectedRoomRef.current && (
            <UserRoom roomId={selectedRoomRef.current?.id} />
          )
        )}
      </div>
      <div className="absolute bottom-0 right-0 z-[1000] p-4 text-center">
        <button
          onClick={showRoomModel}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          {loading ? <CircularProgressLoading /> : displayRoom?.name}
        </button>
      </div>
      <RoomModal>
        <div className="grid grid-cols-5 gap-4">
          {rooms.map((room) => (
            <button
              key={room.id}
              className={classNames(
                "rounded p-2 font-bold text-white",
                selectedRoomRef.current?.id === room.id
                  ? "bg-blue-500"
                  : "bg-gray-500 hover:bg-gray-700",
              )}
              onClick={() => handleRoomSelection(room)}
            >
              {room.name}
            </button>
          ))}
        </div>
      </RoomModal>
    </section>
  );
};

export default WelcomePage;
