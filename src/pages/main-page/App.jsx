import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, setUsersArchive } from "../../redux/usersSlice";

const Main_page = () => {
  const user_img_src = "/user_avatar.jfif";
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.userData);
  const archivedUsers = useSelector((state) => state.users.userDataArchive);
  // const [userData, setUserData] = useState(
  //   useSelector((state) => state.users.userData)
  // );
  // const [userDataArchive, setUserDataArchive] = useState(
  //   useSelector((state) => state.users.userDataArchive)
  // );
  const [activePopup, setActivePopup] = useState(null);
  const [activeArchivePopup, setActiveArchivePopup] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const navigate = useNavigate();
  const togglePopup = (userId) => {
    console.log("переключение", userId);
    if (activePopup === userId) {
      setActivePopup(null);
    } else {
      setActivePopup(userId);
    }
  };
  const toggleArchivePopup = (userId) => {
    console.log("переключение", userId);
    if (activeArchivePopup === userId) {
      setActiveArchivePopup(null);
    } else {
      setActiveArchivePopup(userId);
    }
  };
  const archiveUser = (userId) => {
    const findedUser = users.find((user) => user.id === userId);
    if (findedUser) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      dispatch(setUsers(updatedUsers));
      dispatch(setUsersArchive([...archivedUsers, findedUser]));
      setActivePopup(null);
    }
  };
  const unArchiveUser = (userId) => {
    const findedUser = archivedUsers.find((user) => user.id === userId);
    if (findedUser) {
      const updatedArchivedUsers = archivedUsers.filter(
        (user) => user.id !== userId
      );
      dispatch(setUsersArchive(updatedArchivedUsers));
      dispatch(setUsers([...users, findedUser]));
      setActiveArchivePopup(null);
    }
  };
  const deleteUser = (userId, isActive) => {
    if (isActive) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      dispatch(setUsers(updatedUsers));
    } else {
      const updatedArchivedUsers = archivedUsers.filter(
        (user) => user.id !== userId
      );
      dispatch(setUsersArchive(updatedArchivedUsers));
    }
  };

  const getUsers = async () => {
    
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const respJson = await response.json();
        respJson.length = 6;
        dispatch(setUsers(respJson));
  
        console.log("started", users);
      } catch (e) {
        console.error("Error with getting user data", e);
      } finally {
        setIsPageLoaded(true);
        console.log("R");
      }
    
   
  };


  useEffect(() => {
    if(users.length===0&&archivedUsers.length===0){
    getUsers();
  }else{
    setIsPageLoaded(true);
  }
  }, []);

  const userEdit = (user) => {
    navigate(`/edit/${user.id}`, { state: { user } });
  };

  return (
    <div className="main_div">
      <p className="section_name">Активные</p>
      {!isPageLoaded ? (
        <span className="loader"></span>
      ) : (
        <div className="active_div grid">
          {users.map((user) => (
            <div key={user.phone} className="user_card">
              <img src={user_img_src} className="card_avatar"></img>
              <div className="media_group">
                {activePopup === user.id && (
                  <div className="main_popup">
                    <button
                      className="main_popup_btn"
                      onClick={() => userEdit(user)}
                    >
                      Редактировать
                    </button>
                    <button
                      className="main_popup_btn"
                      onClick={() => archiveUser(user.id)}
                    >
                      Архивировать
                    </button>
                    <button
                      className="main_popup_btn"
                      onClick={() => deleteUser(user.id, true)}
                    >
                      Скрыть
                    </button>
                  </div>
                )}
                {activePopup !== user.id && (
                  <div className="user_data">
                    <div>
                      <p className="user_data_name card_text">{user.name}</p>
                      <p className="user_data_company card_text">
                        {user.company.name}
                      </p>
                    </div>
                    <p className="user_data_city card_text">
                      {user.address.city}
                    </p>
                  </div>
                )}

                <div
                  style={activePopup === user.id ? { marginLeft: "10%" } : {}}
                  className="btn card_edit_btn"
                  onClick={() => togglePopup(user.id)}
                >
                  <svg
                    width="4"
                    height="17"
                    viewBox="0 0 4 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="card_edit_btn_target"
                  >
                    <path
                      d="M0 14.5C0 15.6 0.9 16.5 2 16.5C3.1 16.5 4 15.6 4 14.5C4 13.4 3.1 12.5 2 12.5C0.9 12.5 0 13.4 0 14.5ZM0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5C0.9 0.5 0 1.4 0 2.5ZM0 8.5C0 9.6 0.9 10.5 2 10.5C3.1 10.5 4 9.6 4 8.5C4 7.4 3.1 6.5 2 6.5C0.9 6.5 0 7.4 0 8.5Z"
                      fill={activePopup !== user.id ? "#161616" : "#595959"}
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="section_name bot_section_name">Архив</p>
      <div className="non_active_div grid">
        {archivedUsers.map((user) => (
          <div key={user.phone} className="user_card">
            <img src={user_img_src} className="card_avatar img_archive"></img>
            <div className="media_group">
              {activeArchivePopup === user.id && (
                <div className="main_popup">
                  <button
                    className="main_popup_btn"
                    onClick={() => userEdit(user)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="main_popup_btn"
                    onClick={() => unArchiveUser(user.id)}
                  >
                    Вернуть из архива
                  </button>
                  <button
                    className="main_popup_btn"
                    onClick={() => deleteUser(user.id, false)}
                  >
                    Скрыть
                  </button>
                </div>
              )}
              {activeArchivePopup !== user.id && (
                <div className="user_data">
                  <div>
                    <p className="user_data_name card_text name_text_archive">
                      {user.name}
                    </p>
                    <p className="user_data_company card_text company_text_archive ">
                      {user.company.name}
                    </p>
                  </div>
                  <p className="user_data_city card_text ">
                    {user.address.city}
                  </p>
                </div>
              )}
              <div
                style={
                  activeArchivePopup === user.id
                    ? { marginLeft: "10%" }
                    : { marginLeft: "0" }
                }
                className="btn card_edit_btn"
                onClick={() => toggleArchivePopup(user.id)}
              >
                <svg
                  width="4"
                  height="17"
                  viewBox="0 0 4 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="card_edit_btn_target"
                >
                  <path
                    d="M0 14.5C0 15.6 0.9 16.5 2 16.5C3.1 16.5 4 15.6 4 14.5C4 13.4 3.1 12.5 2 12.5C0.9 12.5 0 13.4 0 14.5ZM0 2.5C0 3.6 0.9 4.5 2 4.5C3.1 4.5 4 3.6 4 2.5C4 1.4 3.1 0.5 2 0.5C0.9 0.5 0 1.4 0 2.5ZM0 8.5C0 9.6 0.9 10.5 2 10.5C3.1 10.5 4 9.6 4 8.5C4 7.4 3.1 6.5 2 6.5C0.9 6.5 0 7.4 0 8.5Z"
                    fill={
                      activeArchivePopup !== user.id ? "#161616" : "#595959"
                    }
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main_page;
