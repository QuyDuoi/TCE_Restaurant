export const formatDate = (date?: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'khong co ngay';
  }

  const day = date.getDate().toLocaleString('vi-VN');
  const month = (date.getMonth() + 1).toLocaleString('vi-VN');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatTime = (time: Date) => {
  if (!(time instanceof Date) || isNaN(time.getTime())) {
    return 'khong co thoi gian';
  }

  const newTime = new Date(time);
  const hours = newTime.getHours() - 7;
  const minutes = time.getMinutes();
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const formatMoney = (money: number | null) => {
  if (money === 0 || money === null || money === undefined) {
    return '0';
  }
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
