import danhSachMonAn from './mon-an.json';

/**
 * Giả lập gọi API lấy chi tiết món ăn theo id.
 * - Mất 800ms để giả lập độ trễ mạng.
 * - Dùng Promise để học cách xử lý bất đồng bộ.
 */
export function fetchMonAn(idMonAn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const monAn = danhSachMonAn.find((m) => m.id === idMonAn);

      if (!monAn) {
        reject(new Error(`Không tìm thấy món ăn có id = ${idMonAn}`));
        return;
      }

      resolve(monAn);
    }, 800); // 800ms = 0.8 giây
  });
}

/**
 * Lấy toàn bộ danh sách món ăn (không cần delay).
 */
export function fetchTatCaMonAn() {
  return danhSachMonAn;
}