// src/components/Bài7/LuotThichMonAn.jsx
// BTVN 1 — Demo bug "+3 chỉ tăng 1" và cách sửa
import { useState } from 'react';

export default function LuotThichMonAn() {
  const [luotThich, setLuotThich] = useState(0);

  // ❌ SAI — dùng state hiện tại 3 lần
  function handleBamSai() {
    setLuotThich(luotThich + 1);
    setLuotThich(luotThich + 1);
    setLuotThich(luotThich + 1);
  }

  // ✅ ĐÚNG — dùng hàm cập nhật
  function handleBamDung() {
    setLuotThich((truoc) => truoc + 1);
    setLuotThich((truoc) => truoc + 1);
    setLuotThich((truoc) => truoc + 1);
  }

  return (
    <section className="bai7-section">
     <h2>
  <span className="so-thu-tu">4</span>
  Thử thách State — "Ảnh chụp"
</h2>
      <p>
        Lượt thích: <strong>{luotThich}</strong>
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={handleBamSai}>
          ❌ Bấm SAI (+3) — chỉ tăng 1
        </button>
        <button className="btn" onClick={handleBamDung}>
          ✅ Bấm ĐÚNG (+3) — tăng đúng 3
        </button>
      </div>
    </section>
  );
}