// src/components/Bài7/mangUtils.js
// Hàm tiện ích thuần JavaScript — không phụ thuộc React

/**
 * Di chuyển 1 phần tử trong mảng từ vị trí `tu` sang `den`.
 * ✅ Trả về MẢNG MỚI — không mutate mảng gốc.
 */
export function diChuyen(mang, tu, den) {
  // Tạo bản sao mảng gốc để không mutate
  const banSao = [...mang];

  // Nếu vị trí không hợp lệ → trả về mảng gốc
  if (tu < 0 || tu >= banSao.length) return mang;
  if (den < 0 || den >= banSao.length) return mang;
  if (tu === den) return mang;

  // Lấy phần tử ra khỏi mảng (splice trả về mảng các phần tử bị xoá)
  const [phanTu] = banSao.splice(tu, 1);

  // Chèn phần tử vào vị trí mới
  banSao.splice(den, 0, phanTu);

  return banSao;
}