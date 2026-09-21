// src/components/Bài7/TheDiaDanhMoRong.jsx
// LAB 3 — PHIÊN BẢN HOÀN CHỈNH: có stopPropagation
import { useState } from 'react';

export default function TheDiaDanhMoRong({
  diaDanh,
  dangMo,
  dangYeuThich,
  onMoThu,
  onYeuThich,
  onChiaSe,
}) {
  // ✅ Handler cho nút Yêu thích — có stopPropagation
  function handleYeuThich(e) {
    e.stopPropagation(); // 🛑 Chặn KHÔNG cho nổi bọt lên thẻ cha
    onYeuThich(diaDanh.id);
  }

  // ✅ Handler cho nút Chia sẻ — cũng có stopPropagation (async)
  async function handleChiaSe(e) {
    e.stopPropagation(); // 🛑 Chặn nổi bọt
    await onChiaSe(diaDanh);
  }

  return (
    <div
      className="the-dia-danh"
      onClick={() => onMoThu(diaDanh.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className="ten">{diaDanh.ten}</div>
      <div className="loai">{diaDanh.loai}</div>

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button className="btn" onClick={handleYeuThich}>
          {dangYeuThich ? '❤️ Đã thích' : '🤍 Yêu thích'}
        </button>

        <button className="btn btn-phu" onClick={handleChiaSe}>
          🔗 Chia sẻ
        </button>
      </div>

      {dangMo && (
        <p className="mo-ta" style={{ marginTop: 8 }}>
          {diaDanh.moTa}
        </p>
      )}
    </div>
  );
}