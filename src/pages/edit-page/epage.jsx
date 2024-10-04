import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./epage_style.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/usersSlice";
const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;
  const user_img_src = "/user_avatar.jfif";
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [name, setName] = useState();
  const [nick, setNick] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [phone, setPhone] = useState();
  const [company, setCompany] = useState();
  const [nameError, setNameError] = useState(false);
  const [nickError, setNickError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const dispatch = useDispatch();

  const validateFields = () => {
    let isValid = true;

    if (!name) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!nick) {
      setNickError(true);
      isValid = false;
    } else {
      setNickError(false);
    }

    if (!email) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!city) {
      setCityError(true);
      isValid = false;
    } else {
      setCityError(false);
    }

    if (!phone) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (!company) {
      setCompanyError(true);
      isValid = false;
    } else {
      setCompanyError(false);
    }

    return isValid;
  };
  const saveData = () => {
    if (!validateFields()) {
      return;
    }
    const updatedUser = {
      ...user,
      name: name,
      username: nick,
      email: email,
      address: {
        ...user.address,
        city: city,
      },
      phone: phone,
      company: {
        ...user.company,
        name: company,
      },
    };
    dispatch(updateUser(updatedUser));

    setIsPopupVisible(true);

    setTimeout(() => {
      setIsPopupVisible(false);
    }, 4000);
  };

  return (
    <div className="main_edit_div">
      <div
        className="back_div"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 12H0.75"
            stroke="#161616"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 17.25L0.75 12L6 6.75"
            stroke="#161616"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>Назад</p>
      </div>
      <div className="main_content_div">
        <div className="left_content_part">
          <img className="title_main_img" src={user_img_src}></img>
          <p className="about_p active_p">Данные профиля</p>
          <p className="about_p">Рабочее пространство</p>
          <p className="about_p">Приватность</p>
          <p className="about_p">Безопасность</p>
        </div>
        <div className="right_content_part">
          <p className="big_tag_p">Данные профиля</p>
          <div className="input_div">
            <p className="heading_p">Имя</p>
            <input
              type="text"
              className={`content_input ${nameError ? `error_border` : ""}`}
              id="name"
              placeholder={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input_div">
            <p className="heading_p">Никнейм</p>
            <input
              type="text"
              className={`content_input ${nickError ? `error_border` : ""}`}
              id="nick"
              placeholder={user.username}
              onChange={(e) => setNick(e.target.value)}
            />
          </div>
          <div className="input_div">
            <p className="heading_p">Почта</p>
            <input
              type="email"
              className={`content_input ${emailError ? `error_border` : ""}`}
              id="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {isPopupVisible && (
            <div className="save_popup">
              <div className="save_popup_main">
                <div className="popup_exit">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setIsPopupVisible(false)}
                  >
                    <path
                      d="M9.06588 1.99469C9.35877 1.70179 9.35877 1.22692 9.06588 0.934025C8.77298 0.641132 8.29811 0.641132 8.00522 0.934025L5.00002 3.93922L1.99482 0.934026C1.70192 0.641133 1.22705 0.641132 0.934157 0.934026C0.641264 1.22692 0.641264 1.70179 0.934157 1.99469L3.93936 4.99989L0.934147 8.00509C0.641254 8.29799 0.641254 8.77286 0.934147 9.06575C1.22704 9.35865 1.70191 9.35865 1.99481 9.06575L5.00002 6.06054L8.00522 9.06575C8.29812 9.35865 8.77299 9.35865 9.06588 9.06575C9.35878 8.77286 9.35878 8.29799 9.06588 8.00509L6.06068 4.99989L9.06588 1.99469Z"
                      fill="#161616"
                    />
                  </svg>
                </div>
                <div className="popup_img">
                  <svg
                    width="61"
                    height="60"
                    viewBox="0 0 61 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1087 1.19075C24.9151 -0.0170324 36.085 -0.0170324 46.8914 1.19075C50.9487 1.6442 54.5103 3.83827 56.7633 7.02464L28.7501 35.0378L20.1063 26.394C19.0812 25.3688 17.4191 25.3688 16.394 26.394C15.3688 27.4191 15.3688 29.0811 16.394 30.1063L26.894 40.6063C27.9191 41.6314 29.5812 41.6314 30.6063 40.6063L59.0103 12.2023C59.089 12.5857 59.1517 12.9751 59.1979 13.3698C60.4902 24.419 60.4902 35.5812 59.1979 46.6304C58.4459 53.0598 53.2838 58.095 46.8914 58.8095C36.085 60.0173 24.9151 60.0173 14.1087 58.8095C7.71635 58.095 2.55421 53.0598 1.80224 46.6304C0.509931 35.5812 0.509931 24.419 1.80224 13.3698C2.55421 6.94043 7.71636 1.90518 14.1087 1.19075Z"
                      fill="#C6F4C6"
                    />
                  </svg>
                </div>

                <p className="popup_text">Изменения сохранены!</p>
              </div>
            </div>
          )}

          <div className="input_div">
            <p className="heading_p">Город</p>
            <input
              type="text"
              className={`content_input ${cityError ? `error_border` : ""}`}
              id="city"
              placeholder={user.address.city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="input_div">
            <p className="heading_p">Телефон</p>
            <input
              type="phone"
              className={`content_input ${phoneError ? `error_border` : ""}`}
              id="phone"
              placeholder={user.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="input_div">
            <p className="heading_p">Название компании</p>
            <input
              type="text"
              className={`content_input ${companyError ? ` error_border` : ""}`}
              id="company"
              placeholder={user.company.name}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="main_save_btn_div">
            <button className="main_save_btn" onClick={() => saveData()}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditPage;
