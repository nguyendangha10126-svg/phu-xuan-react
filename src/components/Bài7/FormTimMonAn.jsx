// src/components/Bài7/FormTimMonAn.jsx
// LAB 4 — PHIÊN BẢN HOÀN CHỈNH
import { useState } from 'react';
import monAnHue from '../../data/monAnHue';

export default function FormTimMonAn({ onTimKiem }) {
  const [tuKhoa, setTuKhoa] = useState('');
  const [hienGoiY, setHienGoiY] = useState(false);

  // ✅ Submit — chặn reload trang
  function handleSubmit(e) {
    e.preventDefault(); // 🛑 Chặn hành vi mặc định của form
    onTimKiem(tuKhoa.trim());
    setHienGoiY(false);
  }

  // ✅ Bắt phím — Esc để đóng gợi ý
  function handleKeyDown(e) {
    // ⚠️ BỎ QUA khi đang gõ tiếng Việt (bộ gõ Telex/VNI đang composition)
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Escape') {
      setHienGoiY(false);
      e.target.blur(); // Bỏ focus khỏi input
    }
  }

  // Lọc gợi ý
  const dsGoiY =
    tuKhoa.trim() === ''
      ? []
      : monAnHue.filter((m) =>
          m.ten.toLowerCase().includes(tuKhoa.toLowerCase())
        );

  // Chọn 1 gợi ý
  function chonGoiY(mon) {
    setTuKhoa(mon.ten);
    onTimKiem(mon.ten);
    setHienGoiY(false);
  }

  return (
    <form className="form-tim-mon" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nhập tên món ăn (vd: bún, bánh...)"
        value={tuKhoa}
        onChange={(e) => setTuKhoa(e.target.value)}
        onFocus={() => setHienGoiY(true)}
        onBlur={() => setHienGoiY(false)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="btn">
        Tìm
      </button>

      {hienGoiY && dsGoiY.length > 0 && (
        <div className="goi-y">
          {dsGoiY.map((mon) => (
            <button
              key={mon.id}
              type="button"
              // ✅ onMouseDown ngăn blur input khi click nút gợi ý
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => chonGoiY(mon)}
            >
              {mon.ten}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}