// src/components/Bài7/MonAnYeuThich.jsx
// LAB 5 — Kéo thả sắp xếp món ăn + phím tắt Alt+mũi tên + aria-live
import { useState, useRef } from 'react';
import monAnHue from '../../data/monAnHue';
import { diChuyen } from './mangUtils';

export default function MonAnYeuThich() {
  // State: mảng món ăn (ban đầu = dữ liệu gốc)
  const [dsMon, setDsMon] = useState(monAnHue);

  // Ref: id món đang kéo (dùng ref để KHÔNG gây re-render liên tục)
  const idDangKeo = useRef(null);

  // State: id món đang được kéo — chỉ để thêm class CSS
  const [idDangKeoHienThi, setIdDangKeoHienThi] = useState(null);
  const [idDangKeoQua, setIdDangKeoQua] = useState(null);

  // Vùng thông báo cho screen reader
  const [thongBao, setThongBao] = useState('');

  // ===== SỰ KIỆN KÉO THẢ =====

  function handleDragStart(e, mon, viTri) {
    idDangKeo.current = viTri;
    setIdDangKeoHienThi(mon.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', mon.id);
  }

  function handleDragOver(e, mon) {
    // 🛑 BẮT BUỘC — không có preventDefault thì không drop được
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIdDangKeoQua(mon.id);
  }

  function handleDrop(e, viTriDich) {
    e.preventDefault();

    const viTriNguon = idDangKeo.current;
    if (viTriNguon === null || viTriNguon === viTriDich) {
      handleDragEnd();
      return;
    }

    setDsMon((truoc) => {
      const mangMoi = diChuyen(truoc, viTriNguon, viTriDich);
      // Thông báo cho screen reader
      setThongBao(`Đã di chuyển "${truoc[viTriNguon].ten}" đến vị trí ${viTriDich + 1}`);
      return mangMoi;
    });

    handleDragEnd();
  }

  function handleDragEnd() {
    idDangKeo.current = null;
    setIdDangKeoHienThi(null);
    setIdDangKeoQua(null);
  }

  // ===== PHÍM TẮT Alt + mũi tên =====

  function handleKeyDown(e, viTri) {
    // Chỉ xử lý khi giữ Alt
    if (!e.altKey) return;

    let viTriMoi = viTri;
    if (e.key === 'ArrowUp') viTriMoi = viTri - 1;
    else if (e.key === 'ArrowDown') viTriMoi = viTri + 1;
    else return; // Phím khác → bỏ qua

    if (viTriMoi < 0 || viTriMoi >= dsMon.length) return;

    e.preventDefault(); // Chặn cuộn trang khi nhấn mũi tên

    setDsMon((truoc) => {
      const mangMoi = diChuyen(truoc, viTri, viTriMoi);
      setThongBao(`Đã di chuyển "${truoc[viTri].ten}" đến vị trí ${viTriMoi + 1}`);
      return mangMoi;
    });
  }

  // ===== XOÁ MÓN =====

  function handleXoa(id) {
    setDsMon((truoc) => {
      const monBiXoa = truoc.find((m) => m.id === id);
      setThongBao(`Đã xoá "${monBiXoa.ten}"`);
      return truoc.filter((m) => m.id !== id);
    });
  }

  return (
    <section className="bai7-section">
      <h2>Lab 5 — Kéo thả sắp xếp món ăn yêu thích</h2>

      <p style={{ fontSize: 13, color: '#666' }}>
        💡 Kéo thả chuột để sắp xếp, hoặc dùng <strong>Alt + ↑/↓</strong> khi
        thẻ đang focus.
      </p>

      <ul className="ds-mon-yeu-thich">
        {dsMon.map((mon, viTri) => (
          <li
            key={mon.id}
            className={`mon-an ${idDangKeoHienThi === mon.id ? 'dang-keo' : ''} ${
              idDangKeoQua === mon.id ? 'keo-qua' : ''
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, mon, viTri)}
            onDragOver={(e) => handleDragOver(e, mon)}
            onDrop={(e) => handleDrop(e, viTri)}
            onDragEnd={handleDragEnd}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, viTri)}
          >
            <span className="tay-cam">☰</span>
            <span className="ten-mon">{mon.ten}</span>
            <span className="gia-mon">{mon.gia.toLocaleString('vi-VN')}đ</span>

            <button
              className="nut-xoa"
              type="button"
              // 🛑 Chặn sự kiện bàn phím nổi lên thẻ cha (tránh kích hoạt Alt+mũi tên)
              onKeyDown={(e) => e.stopPropagation()}
              onClick={() => handleXoa(mon.id)}
            >
              ✕ Xoá
            </button>
          </li>
        ))}
      </ul>

      {/* Vùng thông báo cho screen reader — không hiển thị nhưng vẫn đọc được */}
      <div className="thong-bao" aria-live="polite" role="status">
        {thongBao}
      </div>
    </section>
  );
}