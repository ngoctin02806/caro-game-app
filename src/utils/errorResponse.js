export const errorResponse = (code) => {
  switch (code) {
    case 5000:
      return "Lỗi máy chủ";
    case 7001:
      return "Tài nguyên không tìm thấy";
    case 7002:
      return "Chưa xác thưc";
    case 7003:
      return "Người dùng không tồn tại";
    case 7004:
      return "Mật khẩu không đúng";
    case 7005:
      return "Người dùng đã tồn tại";
    case 7006:
      return "Chưa xác thực email";
    case 7007:
      return "Mã code không khớp";
    case 7008:
      return "Phòng chơi không tồn tại";
    case 7009:
      return "Chat không tồn tại";
    case 7010:
      return "Bạn đã ở trong phòng";
    case 7013:
      return "Mật khẩu không đúng";
    case 7017:
      return "Bạn không đủ điểm";
    case 7022:
      return "Tài khoản đã bị khóa";

    default:
      return "Unknow error";
  }
};
