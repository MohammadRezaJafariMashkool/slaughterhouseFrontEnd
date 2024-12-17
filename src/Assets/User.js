import p1_img from "./UserProfileMan.png";
import p2_img from "./UserProfileWomen.png";
import p3_img from "./Icons/UserIconDrak.png";



let all_users = [
  {
    id: 1,
    name: "رامین",
    avatar: {
        public_id: "1",
        url:p1_img
    },
    address: "تهران",
    password: "12345",
    email: "ramin1350@gmail.com",
    tel: "09121111111",
    role: 'user',
    createdAt: 20241212,
    resetPasswordToken: "resetpasswordurl1",
    resetPasswordExpire : 20241212,
  },
  {
    id: 2,
    name: "فرنگیس",
    avatar: {
        public_id: "p2",
        url:p2_img
    },
    address: "تبریز",
    password: "00000",
    email: " farangis1359@gmail.com",
    tel: "09352222222",
    role: 'user',
    createdAt: 20241212,
    resetPasswordToken: "resetpasswordurl2",
    resetPasswordExpire : 20241212,
  },
  {
    id: 3,
    name: "عزت",
    avatar: {
        public_id: "p3",
        url:p3_img
    },
    address: "اصفهان",
    password: "11111",
    email: " ezat1359@gmail.com",
    tel: "09303333333",
    role: 'user',
    createdAt: 20241212,
    resetPasswordToken: "resetpasswordurl2",
    resetPasswordExpire : 20241212,
  },
];

export default all_users;
