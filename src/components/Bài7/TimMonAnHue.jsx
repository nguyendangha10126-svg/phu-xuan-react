// src/components/Bài7/TimMonAnHue.jsx
// LAB 4 — Cha: giữ state tuKhoaDaTim, render FormTimMonAn + kết quả
import { useState } from 'react';
import monAnHue from '../../data/monAnHue';
import FormTimMonAn from './FormTimMonAn';

export default function TimMonAnHue() {
  const [tuKhoaDaTim, setTuKhoaDaTim] = useState('');

  // Lọc kết quả theo từ khóa đã tìm
  const dsKetQua =
    tuKhoaDaTim === ''
      ? monAnHue
      : monAnHue.filter((m) =>
          m.ten.toLowerCase().includes(tuKhoaDaTim.toLowerCase())
        );

  return (
    <section className="bai7-section">
      <h2>Lab 4 — Tìm món ăn Huế bằng bàn phím</h2>

      <FormTimMonAn onTimKiem={setTuKhoaDaTim} />

      <p style={{ marginTop: 16 }}>
        Từ khóa đã tìm: <strong>{tuKhoaDaTim || '(chưa tìm)'}</strong> — Kết
        quả: <strong>{dsKetQua.length}</strong> món
      </p>

      <ul>
        {dsKetQua.map((m) => (
          <li key={m.id}>
            <strong>{m.ten}</strong> — {m.gia.toLocaleString('vi-VN')}đ
          </li>
        ))}
      </ul>
    </section>
  );
}