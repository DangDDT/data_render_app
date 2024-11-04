import { RoomModel, UserModel } from "@models";
import { db } from "@services";
import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useModal } from "@hooks";

interface GuestTable {
  users: UserModel[];
  addGuestToRoom: (guest: UserModel) => void;
  editGuestInRoom: (guest: UserModel) => void;
  deleteGuestInRoom: (guest: UserModel) => void;
}

interface RoomModal {
  rooms: RoomModel[];
  pickedRoom: RoomModel | null;
  addRoom: (room: RoomModel) => void;
  onPickRoom: (room: RoomModel) => void;
}

const EDIT_SUCCESS_NOTI = "Sửa thành công!";
const FAILURE_NOTI = "Có lỗi xảy ra, vui lòng thử lại!";

const ADD_SUCCESS_NOTI = "Thêm thành công";
const DELETE_SUCCESS_NOTI = "Xóa thành công!";

const RoomModal: React.FC<RoomModal> = ({
  rooms,
  pickedRoom,
  addRoom,
  onPickRoom,
}) => {
  const [room, setRoom] = useState<string>("");

  const onAddRoom = () => {
    if (room === "") {
      return;
    } else {
      const roomObj: RoomModel = {
        id: rooms.length + 1 + "",
        name: room,
      };
      addRoom(roomObj);
      setRoom("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAddRoom();
    } else {
      return;
    }
  };
  return (
    <div>
      <div className="mb-5 flex">
        <input
          type="text"
          placeholder="Nhập tên"
          value={room}
          maxLength={40}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full rounded border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={onAddRoom}
          className={`ml-2 rounded border border-blue-500 bg-blue-500 px-4 text-white hover:bg-blue-600`}
        >
          Tạo mới
        </button>
      </div>
      <div className="flex w-96 flex-wrap">
        {rooms?.map((room, idx) => {
          const isSelected = pickedRoom?.id === room.id;
          return (
            <button
              key={idx}
              onClick={() => onPickRoom(room)}
              className={`ml-2 mt-5 rounded border ${isSelected ? "border-blue-500 bg-blue-500 hover:bg-blue-600" : "border-gray-500 bg-gray-500 hover:bg-gray-600"} px-4 py-2 text-white`}
            >
              {room?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const RowGuest: React.FC<{
  user: UserModel;
  editGuest: (user: UserModel) => void;
  deleteGuest: (user: UserModel) => void;
}> = ({ user, editGuest, deleteGuest }) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setName(user.name);
  }, [user]);

  const handleEditGuest = () => {
    if (name === "") {
      return;
    } else {
      editGuest({ id: user.id, name: name });
    }
  };

  return (
    <div className="flex">
      <input
        className="w-full px-2 text-black focus:outline-0"
        value={name === "" ? "" : name}
        onChange={(e) => setName(e?.target?.value)}
      />
      <button
        disabled={name === "" ? true : false}
        onClick={handleEditGuest}
        className="ml-2 rounded border border-blue-500 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Sửa
      </button>

      <button
        onClick={() => deleteGuest(user)}
        className="ml-2 rounded border border-red-500 bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        Xóa
      </button>
    </div>
  );
};

const GuestTable: React.FC<GuestTable> = ({
  users,
  addGuestToRoom,
  editGuestInRoom,
  deleteGuestInRoom,
}) => {
  const [guest, setGuest] = useState<string>("");

  const onSetGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuest(e.target.value);
  };

  const addGuest = () => {
    if (guest != "") {
      const userID = users?.length > 0 ? users[0]?.id : 0;
      const guestObj: UserModel = {
        id: Number(userID) + 1 + "",
        name: guest,
      };
      addGuestToRoom(guestObj);
      setGuest("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addGuest();
    } else {
      return;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-10 flex items-center gap-5">
        <input
          type="text"
          placeholder="Nhập tên"
          value={guest}
          maxLength={40}
          onKeyDown={handleKeyDown}
          onChange={(e) => onSetGuest(e)}
          className="w-full rounded border border-gray-300 p-2 transition duration-200 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={addGuest}
          className="rounded border border-blue-500 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Thêm
        </button>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Người tham gia</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="border border-gray-300 p-2 text-center text-white">
                {user.id}
              </td>
              <td className="border border-gray-300 p-2">
                {/* <input
                  className="w-full text-black focus:border-[1.5px] focus:outline-0"
                  value={user && user.name}
                  onSubmit={() => {}}
                  onChange={(name) => editGuestInRoom({ id: user.id, name })}
                /> */}

                <RowGuest
                  user={user}
                  editGuest={editGuestInRoom}
                  deleteGuest={deleteGuestInRoom}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const WelcomePage: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [rooms, setRooms] = useState<RoomModel[]>([]);
  const [pickedRoom, setPickedRoom] = useState<RoomModel | null>(null);

  const { showModal, Modal } = useModal();

  useEffect(() => {
    const refRoom = ref(db, "/rooms");

    const unSubRoomRef = onValue(refRoom, (snapshot) => {
      const dataRooms = snapshot.val();

      // Lấy tất cả giá trị thành mảng nếu là đối tượng
      const allRooms: RoomModel[] = dataRooms ? Object.values(dataRooms) : [];

      setRooms(allRooms);
    });
    return () => {
      unSubRoomRef();
    };
  }, []);

  useEffect(() => {
    if (pickedRoom !== null) {
      const dataRef = ref(db, `/rooms/${pickedRoom?.id}/users`);

      const unsubscribe = onValue(dataRef, (snapshot) => {
        setUsers([]);
        const data = snapshot.val();
        // Lấy tất cả giá trị thành mảng nếu là đối tượng
        const allUsers: UserModel[] = data ? Object.values(data) : [];
        // desc sort all users by id
        allUsers.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        setUsers(allUsers);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [pickedRoom]);

  const postDataToFirebase = (data: UserModel) => {
    try {
      const db = getDatabase(); // Kết nối với database
      const dataRef = ref(db, `/rooms/${pickedRoom?.id}/users/${data.id}`); // Đặt đường dẫn tới nơi bạn muốn lưu dữ liệu, ví dụ: 'users'

      set(dataRef, {
        id: data.id,
        name: data.name,
      })
        .then(() => {
          notify(ADD_SUCCESS_NOTI, true);
        })
        .catch(() => {
          notify(FAILURE_NOTI, false);
        });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const deleteGuest = (data: UserModel) => {
    try {
      const db = getDatabase();
      const dataRef = ref(db, `/rooms/${pickedRoom?.id}/users/${data.id}`);

      remove(dataRef)
        .then(() => {
          notify(DELETE_SUCCESS_NOTI, true);
        })
        .catch(() => {
          notify(FAILURE_NOTI, false);
        });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const editGuestInRoom = (data: UserModel) => {
    try {
      const db = getDatabase();
      const dataRef = ref(db, `/rooms/${pickedRoom?.id}/users/${data.id}`);

      set(dataRef, {
        id: data.id,
        name: data.name,
      })
        .then(() => {
          notify(EDIT_SUCCESS_NOTI, true);
        })
        .catch(() => {
          notify(FAILURE_NOTI, false);
        });
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  const createRoom = (room: RoomModel) => {
    try {
      const db = getDatabase();
      const dataRef = ref(db, `/rooms/${room.id}`);

      set(dataRef, {
        id: room.id,
        name: room.name,
      })
        .then(() => {
          notify(ADD_SUCCESS_NOTI, true);
        })
        .catch(() => {
          notify(FAILURE_NOTI, false);
        });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const notify = (textStatus: string, isSuccess: boolean) => {
    switch (isSuccess) {
      case true:
        return toast.success(textStatus, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      case false:
        return toast.error(textStatus, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    }
  };

  const onPickRoom = (room: RoomModel) => {
    setPickedRoom(room);
    showModal();
  };

  return (
    <section className="flex items-center justify-center bg-gray-50 dark:bg-gray-700">
      <div className="flex min-h-screen w-full flex-col items-center">
        <div className="flex justify-between">
          <button
            onClick={showModal}
            className={`ml-2 rounded border border-blue-500 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600`}
          >
            {pickedRoom === null ? "Chọn phòng" : pickedRoom.name}
          </button>
        </div>
        <div>
          <h1 className="mt-5 text-center text-2xl text-white">
            Tổng số:
            <span className="mt-5 text-center text-2xl text-blue-500">
              {" "}
              {users.length}
            </span>
          </h1>
        </div>
        {pickedRoom === null ? null : (
          <GuestTable
            users={users}
            addGuestToRoom={postDataToFirebase}
            editGuestInRoom={editGuestInRoom}
            deleteGuestInRoom={deleteGuest}
          />
        )}

        <ToastContainer />

        <Modal>
          <RoomModal
            rooms={rooms}
            pickedRoom={pickedRoom}
            addRoom={createRoom}
            onPickRoom={onPickRoom}
          />
        </Modal>
      </div>
    </section>
  );
};

export default WelcomePage;
