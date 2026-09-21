// src/components/Bài7/DanhSachDiaDanh.jsx
// LAB 2 + BONUS: bộ lọc + derived state + chọn tất cả + useCallback
import { useState, useCallback } from 'react';
import diaDanhHue from '../../data/diaDanhHue';
import TheDiaDanh from './TheDiaDanh';

// Danh sách loại địa danh để làm nút lọc
const DS_LOAI = [
  { ma: 'tat-ca', nhan: 'Tất cả' },
  { ma: 'di-tich', nhan: 'Di tích' },
  { ma: 'chua', nhan: 'Chùa' },
  { ma: 'lang-tam', nhan: 'Lăng tẩm' },
  { ma: 'cau', nhan: 'Cầu' },
  { ma: 'cho', nhan: 'Chợ' },
];

export default function DanhSachDiaDanh() {
  // State 1: mảng id các địa danh đang được chọn
  const [dsDaChon, setDsDaChon] = useState([]);

  // State 2: loại đang được lọc ('tat-ca' = hiện tất cả)
  const [loaiDangLoc, setLoaiDangLoc] = useState('tat-ca');

  // ✅ DERIVED STATE — tính từ 2 state trên, KHÔNG tạo useState riêng
  const dsHienThi =
    loaiDangLoc === 'tat-ca'
      ? diaDanhHue
      : diaDanhHue.filter((dd) => dd.loai === loaiDangLoc);

  // ✅ useCallback — giữ cùng tham chiếu hàm qua các lần render
  // deps = [] vì chỉ dùng setDsDaChon (ổn định) và id truyền vào
  const handleChon = useCallback((id) => {
    setDsDaChon((truoc) =>
      truoc.includes(id) ? truoc.filter((x) => x !== id) : [...truoc, id]
    );
  }, []);

  // ✅ Bộ lọc — đọc data-loai từ nút bấm qua dataset
  const handleLoc = useCallback((e) => {
    const loai = e.currentTarget.dataset.loai;
    setLoaiDangLoc(loai);
  }, []);

  // ✅ Chọn tất cả — CHỈ thêm những id chưa có (lọc trùng)
  // deps = [dsHienThi] vì hàm dùng biến dsHienThi bên trong
  const handleChonTatCa = useCallback(() => {
    setDsDaChon((truoc) => {
      const idMoi = dsHienThi
        .map((dd) => dd.id)
        .filter((id) => !truoc.includes(id));
      return [...truoc, ...idMoi];
    });
  }, [dsHienThi]);

  // Bỏ chọn tất cả
  const handleBoChonTatCa = useCallback(() => {
    setDsDaChon([]);
  }, []);

  return (
    <section className="bai7-section">
     <h2>
  <span className="so-thu-tu">2</span>
  Bộ sưu tập địa danh
</h2>

      {/* ===== Bộ lọc theo loại ===== */}
      <div className="bo-loc">
        {DS_LOAI.map((l) => (
          <button
            key={l.ma}
            data-loai={l.ma}
            className={loaiDangLoc === l.ma ? 'dang-chon' : ''}
            onClick={handleLoc}
          >
            {l.nhan}
          </button>
        ))}
      </div>

      {/* ===== Thông tin ===== */}
     <div style={{ marginBottom: 12 }}>
  <span className="stat-badge">
    Đã chọn <strong>{dsDaChon.length}</strong>
  </span>
  <span className="stat-badge">
    Hiện thị <strong>{dsHienThi.length}</strong>
  </span>
</div>

      {/* ===== Nút thao tác nhanh ===== */}
     <div className="hang-nut">
        <button className="btn" onClick={handleChonTatCa}>
          Chọn tất cả đang hiện
        </button>
        <button className="btn btn-phu" onClick={handleBoChonTatCa}>
          Bỏ chọn tất cả
        </button>
      </div>

      {/* ===== Danh sách địa danh (đã lọc) ===== */}
      <div className="danh-sach">
        {dsHienThi.map((dd) => (
          <TheDiaDanh
            key={dd.id}
            diaDanh={dd}
            dangChon={dsDaChon.includes(dd.id)}
            onChon={handleChon}
          />
        ))}
      </div>

      {/* ===== Lộ trình ===== */}
      <p className="lo-trinh">
  <strong>Lộ trình:</strong>{' '}
  ...
</p>
    </section>
  );
}