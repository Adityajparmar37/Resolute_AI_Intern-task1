import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomModal from "../../Components/CustomModal/CustomModal";
import TableCard from "../../Components/TableCard/TableCard";
import { useLoading } from "../../Hooks/useLoading";
import {
  deleteUser,
  getAll,
  getUserInfo,
  updateUser,
} from "../../Services/UserService";

export default function ManageTask() {
  const [user, setUser] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [modalIsOpen, setModalIsOpen] =
    useState(false);
  const [filterValue, setFilterValue] =
    useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] =
    useState("asc"); // or "desc"
  const { showLoading, hideLoading } =
    useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        const allUser = await getAll();
        setUser(allUser);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error(
          "Error fetching tasks:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const DeleteUser = async (id) => {
    try {
      console.log(id);
      const responseData = await deleteUser(id);
      if (responseData.success === true) {
        setUser((prevUser) =>
          prevUser.filter(
            (User) => User._id !== id
          )
        );
      }
    } catch (error) {
      console.error(
        "Error deleting user:",
        error
      );
    }
  };

  const UpdateUser = async () => {
    // Implement update logic here
  };

  const openModal = async (id) => {
    setModalIsOpen(true);

    try {
      const data = await getUserInfo(id);
      setUserInfo(data.userData);
    } catch (error) {
      console.error(
        "Error fetching user info:",
        error
      );
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      console.log(userInfo);
      const updateData = await updateUser(
        userInfo
      );
      console.log(updateData);
    } catch (error) {
      toast.error("Please try again");
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      // Reverse sort direction if same key clicked
      setSortDirection(
        sortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Set new sort key and default direction
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredUser = user.filter((userData) =>
    userData.name
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  );

  const sortedUser = sortKey
    ? filteredUser.sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      })
    : filteredUser;

  return (
    <>
      <div className="pt-20 h-screen bg-gray-100">
        {user && user.length > 0 ? (
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row mt-14 justify-center items-center">
              <label className="text-black items-center mr-3 text-lg font-bold">
                Search:{" "}
              </label>
              <input
                type="text"
                placeholder="Filter by name"
                value={filterValue}
                className="p-1 text-black font-semibold border focus:shadow-inner"
                onChange={(e) =>
                  setFilterValue(e.target.value)
                }
              />
              <th
                scope="col"
                className="cursor-pointer text-lg mr-5 ml-5"
                onClick={() =>
                  handleSort("name")
                }>
                Sort: {""}
                {sortKey === "name" && (
                  <span>
                    {sortDirection === "asc"
                      ? "▲ New"
                      : " ▼ Old"}
                  </span>
                )}
              </th>
            </div>
            <table className="w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-20">
              <thead className="text-[1rem] font-bold text-white uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-40 border-b-4 border-white">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <label className="text-white font-bold text-1xl">
                        🧑🏻‍🏫
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border-l-4">
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    User Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUser.map(
                  (userData, index) => (
                    <TableCard
                      key={userData._id} // Don't forget to add a unique key
                      index={index}
                      userData={userData}
                      DeleteUser={DeleteUser}
                      openModal={openModal} // Pass openModal function
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center w-screen h-screen">
            <Link to="/home">
              <h1 className=" bg-gray-600 text-white text-lg rounded-md p-2">
                No user found
              </h1>
            </Link>
          </div>
        )}
      </div>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}>
        <h1 className="text-xl font-semibold text-gray-800">
          Update Information
        </h1>{" "}
        <div className="flex justify-center items-center py-3 m-16 overflow-hidden">
          <form>
            <div className="flex flex-col ">
              <label className="font-semibold text-lg">
                Name:
              </label>
              <input
                value={userInfo.name || ""}
                onChange={handleInputChange}
                required
                type="text"
                name="name"
                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[30rem] font-bold mb-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-lg">
                Email:
              </label>
              <input
                value={userInfo.email || ""}
                onChange={handleInputChange}
                required
                type="email"
                name="email"
                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[30rem] font-bold mb-2"
              />
            </div>
            <div className="flex mt-5  justify-center items-center">
              <button
                type="submit"
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 hover:rounded-[3rem] text-white font-bold py-1 px-2 w-[6rem] rounded">
                Update
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  );
}
