// src/pages/Bài7Page.jsx
import '../styles/Bài7.css';
import ThuSuKien from '../components/Bài7/ThuSuKien';
import DanhSachDiaDanh from '../components/Bài7/DanhSachDiaDanh';
import KhamPhaDiaDanh from '../components/Bài7/KhamPhaDiaDanh';
import LuotThichMonAn from '../components/Bài7/LuotThichMonAn';
import TimMonAnHue from '../components/Bài7/TimMonAnHue';

export default function Bài7Page() {
  return (
    <main className="bai7-page">
      <h1>Bài 7 — Quản lý sự kiện trong React</h1>
      <p>
        Chủ đề: <strong>Địa danh Huế và món ăn Huế</strong>
      </p>

      <ThuSuKien />
      <DanhSachDiaDanh />
      <KhamPhaDiaDanh />
      <LuotThichMonAn />
      <TimMonAnHue />

    </main>
  );
}