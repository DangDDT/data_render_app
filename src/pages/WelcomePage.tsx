import { useModal } from "@hooks";
import { db } from "@services";
import {
  get,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  ref,
} from "firebase/database";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RoomModel, UserModel } from "@models";
import classNames from "classnames";
import { CircularProgressLoading } from "@components/common";
import { WebBackground1, WebBackground2, WebBackground3 } from "@assets";
import { UserRoom } from "@components/welcome/UserRoom";
import { SettingIcon } from "@components/icons";
import Lottie from "react-lottie";
import animationData from "../assets/welcome-user.json";

const WelcomePage = () => {
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [_, setDisplayRoom] = useState<RoomModel | null>(null);
  const selectedRoomRef = useRef<RoomModel | null>(null);
  const [background, setBackground] = useState(0);
  const backgrounds = useMemo(
    () => [WebBackground1, WebBackground2, WebBackground3],
    [],
  );
  const {
    Modal: RoomModal,
    showModal: showRoomModal,
    hideModal: hideRoomModal,
    isOpen: roomModalIsOpen,
  } = useModal();
  const [loading, setLoading] = useState(true);

  /// For show modal when user enroll the room.
  const {
    Modal: WelcomeUserModal,
    showModal: showWelcomeUserModal,
    hideModal: hideWelcomeUserModel,
    isOpen: welcomeUserModalIsOpen,
  } = useModal();

  const [newUser, setNewUser] = useState<UserModel | null>(null);

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

  const handleWhenNewUserEnroll = useCallback((user: UserModel) => {
    if (roomModalIsOpen()) {
      hideRoomModal();
    }
    if (welcomeUserModalIsOpen()) {
      hideWelcomeUserModel();
    }
    setNewUser(user);
    showWelcomeUserModal();
    // setTimeout(() => {
    //   hideWelcomeUserModel();
    // }, 10000);
  }, []);

  const handleWhenSettingClicked = useCallback(() => {
    if (welcomeUserModalIsOpen()) {
      hideWelcomeUserModel();
    }
    if (!roomModalIsOpen()) {
      showRoomModal();
    }
  }, []);

  const defaultOptions = useMemo(() => {
    return {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
  }, []);

  return (
    <section className="relative flex h-screen w-full items-center">
      <div className="absolute inset-0 z-0 h-screen w-full">
        <video
          className="bg-opacity-950 h-screen w-full object-cover bg-blend-darken"
          autoPlay
          loop
          muted
          src={backgrounds[background]}
          typeof={"video/mp4"}
        />
      </div>
      <div className="flex w-full flex-col items-center">
        {loading ? (
          <CircularProgressLoading />
        ) : (
          <UserRoom
            roomId={selectedRoomRef.current?.id}
            onUserAdded={handleWhenNewUserEnroll}
          />
        )}
      </div>
      <div className="absolute bottom-0 right-0 z-[1000] p-4 text-center">
        <button
          onClick={handleWhenSettingClicked}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white opacity-10 hover:bg-blue-700"
        >
          {loading ? <CircularProgressLoading /> : <SettingIcon />}
        </button>
      </div>
      <RoomModal>
        <div className="flex flex-col gap-6">
          <div className="text-center text-2xl font-bold text-teal-700">
            Chọn phòng
          </div>
          <div className="grid grid-cols-5 gap-4">
            {rooms.map((room, index) => (
              <button
                key={index}
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
          <div className="text-center text-2xl font-bold text-teal-700">
            Chọn màu nền
          </div>
          <div className="grid grid-cols-4 gap-4">
            {backgrounds.map((_, index) => (
              <button
                key={index}
                className={classNames(
                  "rounded p-2 font-bold text-white",
                  index === background
                    ? "bg-blue-500"
                    : "bg-gray-500 hover:bg-gray-700",
                )}
                onClick={() => setBackground(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </RoomModal>
      <WelcomeUserModal
        scaleIn={true}
        hasCloseButton={false}
        overrideClassName="rounded-md border-8 border-[#4ffc92] bg-transparent min-w-[40%] p-2"
      >
        <div className="flex w-full flex-col items-center justify-center gap-5 rounded-md bg-[#00672B] p-4">
          <div onClick={hideWelcomeUserModel}>
            <Lottie options={defaultOptions} height={250} width={250} />
          </div>
          <div className="text-center text-2xl font-bold text-white">
            Chào mừng bạn
          </div>
          <div className="animate-scale text-center text-5xl font-bold text-white">
            {newUser?.name}
          </div>
          <div className="text-center text-2xl font-bold text-white">
            đã trở thành vi mạch
          </div>
        </div>
      </WelcomeUserModal>
    </section>
  );
};

export default WelcomePage;
