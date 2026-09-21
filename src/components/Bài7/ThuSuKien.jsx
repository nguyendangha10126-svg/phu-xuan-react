// src/components/Bài7/ThuSuKien.jsx
// LAB 1 — Phiên bản hoàn chỉnh: nhật ký + e.target vs e.currentTarget
import { useRef, useState } from 'react';
import diaDanhHue from '../../data/diaDanhHue';

export default function ThuSuKien() {
  const [soLanBam, setSoLanBam] = useState(0);
  const [nhatKy, setNhatKy] = useState([]);

  // useRef để đếm id mà KHÔNG gây re-render
  const idNhatKy = useRef(0);

  // Ghi nhật ký — giữ tối đa 5 dòng, mới nhất lên đầu
  function ghiNhatKy(noiDung) {
    idNhatKy.current += 1;
    const dongMoi = `#${idNhatKy.current} — ${noiDung}`;
    setNhatKy((truoc) => [dongMoi, ...truoc].slice(0, 5));
  }

  // Sự kiện 1: bấm nút đếm
  function handleBamNut(e) {
    setSoLanBam(soLanBam + 1);
    ghiNhatKy(`Bấm nút — type=${e.type}`);
  }

  // Sự kiện 2: bấm vào thẻ địa danh — đọc target vs currentTarget
  function handleBamThe(diaDanh, e) {
    const tagTarget = e.target.tagName;
    const tagCurrent = e.currentTarget.tagName;
    ghiNhatKy(
      `Bấm thẻ "${diaDanh.ten}" — target=${tagTarget} | currentTarget=${tagCurrent}`
    );
  }

  // Lấy 1 địa danh đầu để minh hoạ
  const diaDanhMau = diaDanhHue[0];

  return (
    <section className="bai7-section">
      <h2>
  <span className="so-thu-tu">1</span>
  Nhật ký sự kiện
</h2>

      <p>
        Số lần bấm nút: <strong>{soLanBam}</strong>
      </p>

      <button className="btn" onClick={handleBamNut}>
        Bấm tôi đi!
      </button>

      <hr style={{ margin: '16px 0' }} />

      <p>
        <strong>Thử bấm vào chữ "Đại Nội Huế" bên trong thẻ</strong> — xem
        target là SPAN hay DIV?
      </p>

      {/* Thẻ địa danh — có onClick ở thẻ DIV cha */}
      <div
        className="the-dia-danh"
        onClick={(e) => handleBamThe(diaDanhMau, e)}
      >
        {/* Chữ bên trong là SPAN — khi bấm vào chữ, e.target sẽ là SPAN */}
        <span className="ten">{diaDanhMau.ten}</span>
        <span className="loai"> {diaDanhMau.loai}</span>
      </div>

      <h3 style={{ marginTop: 16 }}>Nhật ký sự kiện (tối đa 5 dòng):</h3>
      <div className="nhat-ky">
        {nhatKy.length === 0 ? (
          <div>(Chưa có sự kiện nào — hãy bấm thử!)</div>
        ) : (
          nhatKy.map((dong, i) => <div key={i}>{dong}</div>)
        )}
      </div>
    </section>
  );
}