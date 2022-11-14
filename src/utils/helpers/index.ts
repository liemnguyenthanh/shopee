
export const SwapItemInArray = (list: any, itemIndex: number, itemSwapIndex: number) => {
  const item = list[itemIndex];
  list.splice(itemIndex, 1);
  list.splice(itemSwapIndex, 0, item);
  return list;
}

export const convertNumberToShowInCart = (num: number | string) => {
  return num > 100 ? '99+' : num
}

export function convertToSlug(str: string) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase()
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
  // Thay ký tự đĐ
  str = str.replace(/[đĐ]/g, 'd');

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, '-');

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, '');

  // return
  return str;
}

export const convertUrlToObject = (search: string) => {
  if (search === '') return
  search = search.substring(1);
  return JSON.parse(
    '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value)
    })
}

export const getUserLocal = () => {
  return {
    id: "123"
  }
}

export const randomNameGenerator = (num: number) => {
  let res = '';
  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * 27);
    res += String.fromCharCode(97 + random);
  };
  return res;
};
