import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomModal from "../../Components/CustomModal/CustomModal";
import TableCard from "../../Components/TableCard/TableCard";
import { useLoading } from "../../Hooks/useLoading";
import {
  deleteUser,
  getAll,
} from "../../Services/UserService";

export default function ManageTask() {
  const [updateId, setUpdateId] = useState();
  const [user, setUser] = useState([]);
  const [modalIsOpen, setModalIsOpen] =
    useState(false);
  const { showLoading, hideLoading } =
    useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        const allUser = await getAll();
        // console.log("ALL Task ==> ", allTask);
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
        toast.success(responseData.message);
        setUser((prevUser) =>
          prevUser.filter(
            (User) => User._id !== id
          )
        );
      } else if (responseData.success === false) {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Please try again!");
    }
  };

  const UpdateUser = async () => {};

  const openModal = (id) => {
    setUpdateId(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="pt-20 h-screen bg-gray-100">
        {user && user.length > 0 ? (
          <>
            <div className="flex flex-col justify-center items-center">
              <table className="w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-20">
                <thead className="text-[1rem] font-bold text-white uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-40 border-b-4 border-white">
                  <tr>
                    <th
                      scope="col"
                      className="p-4">
                      <div className="flex items-center">
                        <label className="text-white font-bold text-1xl">
                          🧑🏻‍🏫
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 border-l-4 ">
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
                      Create At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user &&
                    user.map(
                      (userData, index) => (
                        <TableCard
                          index={index}
                          userData={userData}
                          DeleteUser={DeleteUser}
                          openModal={openModal}
                        />
                      )
                    )}
                </tbody>
              </table>
            </div>
          </>
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
        </h1>
      </CustomModal>
    </>
  );
}
