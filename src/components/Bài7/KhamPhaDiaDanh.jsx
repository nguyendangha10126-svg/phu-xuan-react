// src/components/Bài7/KhamPhaDiaDanh.jsx
// LAB 3 — Cha: quản lý 3 state + onClickCapture đếm mọi cú bấm
import { useState } from 'react';
import diaDanhHue from '../../data/diaDanhHue';
import TheDiaDanhMoRong from './TheDiaDanhMoRong';

export default function KhamPhaDiaDanh() {
  const [idDangMo, setIdDangMo] = useState(null); // id thẻ đang mở mô tả
  const [dsYeuThich, setDsYeuThich] = useState([]); // mảng id đã yêu thích
  const [soTuongTac, setSoTuongTac] = useState(0); // đếm mọi cú bấm

  // ✅ onClickCapture — chạy TRƯỚC khi con kịp stopPropagation
  function handleBatSuKienCapture() {
    setSoTuongTac((truoc) => truoc + 1);
  }

  // Mở/đóng mô tả
  function handleMoThu(id) {
    setIdDangMo((truoc) => (truoc === id ? null : id));
  }

  // Toggle yêu thích
  function handleYeuThich(id) {
    setDsYeuThich((truoc) =>
      truoc.includes(id) ? truoc.filter((x) => x !== id) : [...truoc, id]
    );
  }

  // Chia sẻ — copy link vào clipboard
  async function handleChiaSe(diaDanh) {
    try {
      const url = `${window.location.origin}/#${diaDanh.id}`;
      await navigator.clipboard.writeText(url);
      alert(`Đã copy link chia sẻ: ${url}`);
    } catch (err) {
      alert('Không thể copy — trình duyệt chặn clipboard.');
    }
  }

  return (
    <section
      className="bai7-section"
      onClickCapture={handleBatSuKienCapture}
    >
      <h2>
  <span className="so-thu-tu">3</span>
  Khám phá chi tiết địa danh
</h2>

      <div style={{ marginBottom: 12 }}>
  <span className="stat-badge">
    Tương tác <strong>{soTuongTac}</strong>
  </span>
  <span className="stat-badge">
    Yêu thích <strong>{dsYeuThich.length}</strong>
  </span>
</div>
      <p>
        Đã yêu thích: <strong>{dsYeuThich.length}</strong> địa danh
      </p>

      <div className="danh-sach">
        {diaDanhHue.map((dd) => (
          <TheDiaDanhMoRong
            key={dd.id}
            diaDanh={dd}
            dangMo={idDangMo === dd.id}
            dangYeuThich={dsYeuThich.includes(dd.id)}
            onMoThu={handleMoThu}
            onYeuThich={handleYeuThich}
            onChiaSe={handleChiaSe}
          />
        ))}
      </div>
    </section>
  );
}