// src/pages/Bài7Page.jsx
import '../styles/Bài7.css';
import ThuSuKien from '../components/Bài7/ThuSuKien';
import DanhSachDiaDanh from '../components/Bài7/DanhSachDiaDanh';
import KhamPhaDiaDanh from '../components/Bài7/KhamPhaDiaDanh';
import LuotThichMonAn from '../components/Bài7/LuotThichMonAn';
import TimMonAnHue from '../components/Bài7/TimMonAnHue';
import MonAnYeuThich from '../components/Bài7/MonAnYeuThich';

export default function Bài7Page() {
  return (
    <main className="bai7-page">
      {/* ===== HERO HEADER ===== */}
      <header className="bai7-hero">
        <h1>Khám phá Xứ Huế</h1>
        <p className="phu-de">
          Hành trình tương tác cùng <strong>Địa danh & Món ăn</strong> cố đô
        </p>
        <span className="gach-trang-tri" />
      </header>

      <ThuSuKien />
      <DanhSachDiaDanh />
      <KhamPhaDiaDanh />
      <LuotThichMonAn />
      <TimMonAnHue />
      <MonAnYeuThich />
    </main>
  );
}