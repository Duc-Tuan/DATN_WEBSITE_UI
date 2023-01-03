import className from "classnames/bind";
import style from "./ProfileMy.module.scss";
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { useStateValue } from "../../../contexts/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MessProduct from "../../../components/MessProduct";
import { setUpdateUSer } from "../../../contexts/Reducer";
// import * as UserService from "../../../services/LoginService";

const ctx = className.bind(style);

function ProfileMy() {
  const [image, setImage] = useState("");

  const [{ user }, dispatch] = useStateValue();
  const [dataUser, setDataUser] = useState([]);

  const [DataName, setDataName] = useState("");
  const [DataEmail, setDataEmail] = useState("");
  const [DataPhone, setDataPhone] = useState("");
  const [DataImage, setDataImage] = useState(null);

  const [isMessager, setIsMessager] = useState(false);
  const [Messager, setMessager] = useState("");

  useEffect(() => {
    if (user !== null) {
      if (user.constructor === Object) {
        setDataName(user.user_aliases);
        setDataEmail(user.user_email);
        setDataPhone(user.user_phone);
        setImage(user.avatar);
        return setDataUser(user);
      } else {
        user.then((data) => {
          setDataName(data.user_aliases);
          setDataEmail(data.user_email);
          setDataPhone(data.user_phone);
          setImage(data.avatar);
          return setDataUser(data);
        });
      }
    }
  }, [user]);

  const handleImg = () => {
    const img = document.querySelector("#updataFile");
    img.click();
    img.addEventListener("change", (e) => {
      setDataImage(e.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", (e) => {
        setImage(e.target.result);
      });
    });
  };

  const handleSave = async () => {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    setIsMessager(true);
    if (regex.test(DataPhone)) {
      const formData = new FormData();
      formData.append("user_aliases", DataName);
      formData.append("user_email", DataEmail);
      formData.append("user_phone", DataPhone);
      formData.append("avatar", DataImage);
      dispatch(setUpdateUSer(dataUser._id, formData));
      setMessager("Successfully Update!!!");
    } else {
      setMessager(
        "phone number contains only numbers and must be 10 numbers!!"
      );
    }
    return setTimeout(() => {
      setIsMessager(false);
    }, 1000);
  };

  return (
    <div className={ctx("wapper")}>
      {isMessager && <MessProduct data={Messager} />}
      <div className={ctx("title")}>
        <h5>My profile</h5>
        <div className={ctx("opcity-09 mt-2")}>
          <h6>Manage profile information for account security</h6>
        </div>
      </div>
      <hr></hr>

      <div className={ctx("dfcenter", "sub_dfcenter")}>
        <div className={ctx("info", "mx-3")}>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}>user name: </div>
            <div className={ctx("content", "mx-2")}>{dataUser.user_name}</div>
          </div>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}>Name: </div>
            <div className={ctx("content", "mx-2")}>
              <input
                type="text"
                value={DataName}
                name="name"
                onChange={(e) => setDataName(e.target.value)}
              />
            </div>
          </div>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}>Email: </div>
            <div className={ctx("content", "mx-2")}>
              <input
                type="text"
                name="email"
                value={DataEmail}
                onChange={(e) => setDataEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={ctx("group", "dfcenter mb-3")}>
            <div className={ctx("name")}>Phone: </div>
            <div className={ctx("content", "mx-2")}>
              <input
                type="text"
                name="phone"
                value={DataPhone !== null ? DataPhone : ""}
                placeholder="Enter phone number..."
                onChange={(e) => setDataPhone(e.target.value)}
              />
            </div>
          </div>

          <div className={ctx("save")}>
            <Button className={ctx("btnSave")} onClick={(e) => handleSave(e)}>
              <h5>Save</h5>
            </Button>
          </div>
        </div>
        <div className={ctx("infoImage")}>
          <div className={ctx("infoImage__avatar", "dfcenter")}>
            {image !== undefined && image !== null ? (
              <img width="100%" src={image} alt="" />
            ) : (
              <div className={ctx("avatarNull", "dfcenter opcity-08")}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
          </div>
          <div className={ctx("updateImage", "dfcenter mt-2")}>
            <input type="file" name="file" hidden id="updataFile" />
            <Button className={ctx("btnImage")} onClick={handleImg}>
              <h6>Select image</h6>
            </Button>
          </div>
          <span className={ctx("opcity-08 mt-2")}>Format: .JPG, .PNG</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileMy;
