import { useState, useMemo, useCallback } from 'react';
import TheDiaDanh from './TheDiaDanh';
import danhSachGoc from '../../data/dia-danh.json';

function DanhSachDiaDanh() {
  const [boLoc, setBoLoc] = useState('');
  const [locTheoLoai, setLocTheoLoai] = useState('Tất cả');
  const [danhSachYeuThich, setDanhSachYeuThich] = useState([]);
  const [soLanClick, setSoLanClick] = useState(0);

  const danhSachLoai = useMemo(() => {
    const loaiSet = new Set(danhSachGoc.map((d) => d.loai));
    return ['Tất cả', ...Array.from(loaiSet)];
  }, []);

  const danhSachDaLoc = useMemo(() => {
    console.log(
      `🧠 [useMemo] Đang lọc... boLoc="${boLoc}" | loai="${locTheoLoai}"`
    );

    let ketQua = [...danhSachGoc];
    for (let i = 0; i < 10000; i++) {
      // Giả lập tính toán nặng
    }

    if (boLoc.trim()) {
      const kw = boLoc.toLowerCase().trim();
      ketQua = ketQua.filter(
        (d) =>
          d.ten.toLowerCase().includes(kw) ||
          d.khuVuc.toLowerCase().includes(kw) ||
          d.moTa.toLowerCase().includes(kw)
      );
    }

    if (locTheoLoai !== 'Tất cả') {
      ketQua = ketQua.filter((d) => d.loai === locTheoLoai);
    }

    return ketQua;
  }, [boLoc, locTheoLoai]);

  const themYeuThich = useCallback((id) => {
    console.log(`❤️ Toggle yêu thích: id=${id}`);
    setDanhSachYeuThich((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }, []);

  const handleReset = useCallback(() => {
    setBoLoc('');
    setLocTheoLoai('Tất cả');
    setDanhSachYeuThich([]);
  }, []);

  return (
    <div style={styles.wrap}>
      <h2 style={styles.tieuDe}>🏛️ Danh lam thắng cảnh Huế</h2>
      <p style={styles.phuDe}>
        Khám phá <strong>{danhSachGoc.length}</strong> địa danh nổi tiếng Cố đô
      </p>

      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            value={boLoc}
            onChange={(e) => setBoLoc(e.target.value)}
            placeholder="Tìm theo tên, khu vực, mô tả..."
            style={styles.input}
          />
          {boLoc && (
            <button onClick={() => setBoLoc('')} style={styles.clearBtn}>
              ✕
            </button>
          )}
        </div>

        <div style={styles.filterRow}>
          <span style={styles.filterLabel}>Loại:</span>
          {danhSachLoai.map((loai) => (
            <button
              key={loai}
              onClick={() => setLocTheoLoai(loai)}
              style={{
                ...styles.filterBtn,
                ...(locTheoLoai === loai ? styles.filterBtnActive : {}),
              }}
            >
              {loai}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.statsBar}>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>Kết quả</span>
          <span style={styles.statValue}>{danhSachDaLoc.length}</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>❤️ Yêu thích</span>
          <span style={styles.statValue}>{danhSachYeuThich.length}</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statLabel}>🧪 Test re-render</span>
          <button
            onClick={() => setSoLanClick((c) => c + 1)}
            style={styles.testBtn}
          >
            Click cha: {soLanClick}
          </button>
        </div>
        <button onClick={handleReset} style={styles.resetBtn}>
          ♻️ Reset
        </button>
      </div>

      {danhSachDaLoc.length === 0 ? (
        <div style={styles.empty}>
          😔 Không có địa danh nào phù hợp với bộ lọc hiện tại
        </div>
      ) : (
        <div style={styles.grid}>
          {danhSachDaLoc.map((d) => (
            <TheDiaDanh
              key={d.id}
              diaDanh={d}
              onYeuThich={themYeuThich}
              daYeuThich={danhSachYeuThich.includes(d.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    maxWidth: 1000,
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
  },
  tieuDe: {
    fontSize: 32,
    textAlign: 'center',
    color: '#8b0000',
    marginBottom: 6,
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: 700,
    letterSpacing: 1,
  },
  phuDe: {
    textAlign: 'center',
    color: '#a0522d',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 0,
    marginBottom: 24,
    fontFamily: '"Cormorant Garamond", Georgia, serif',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 18,
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: 12,
    padding: '2px 4px 2px 42px',
    border: '2px solid rgba(192,57,43,0.2)',
    boxShadow: '0 4px 16px rgba(139,0,0,0.06)',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    fontSize: 16,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '12px 8px',
    fontSize: 15,
    fontFamily: 'inherit',
    background: 'transparent',
    color: '#333',
  },
  clearBtn: {
    border: 'none',
    background: 'rgba(192,57,43,0.1)',
    color: '#8b0000',
    width: 28,
    height: 28,
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  filterRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterLabel: {
    fontSize: 13,
    color: '#a0522d',
    fontWeight: 600,
    marginRight: 4,
  },
  filterBtn: {
    padding: '6px 14px',
    background: '#fff',
    border: '1px solid rgba(192,57,43,0.2)',
    borderRadius: 18,
    cursor: 'pointer',
    fontSize: 13,
    color: '#8b0000',
    fontFamily: 'inherit',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #c0392b, #8b0000)',
    color: '#fff',
    borderColor: '#8b0000',
    boxShadow: '0 4px 12px rgba(139,0,0,0.3)',
  },
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr auto',
    gap: 10,
    alignItems: 'center',
    background: 'linear-gradient(135deg, #fffbf0, #fdf2d0)',
    padding: 12,
    borderRadius: 12,
    border: '1px solid rgba(212,180,131,0.5)',
    marginBottom: 20,
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '0 12px',
    borderRight: '1px solid rgba(212,180,131,0.5)',
  },
  statLabel: {
    fontSize: 10,
    color: '#a0522d',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 700,
  },
  statValue: {
    fontSize: 18,
    color: '#8b0000',
    fontWeight: 700,
    fontFamily: '"Playfair Display", Georgia, serif',
  },
  testBtn: {
    padding: '4px 12px',
    background: 'rgba(243,156,18,0.15)',
    border: '1px solid rgba(243,156,18,0.5)',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 12,
    color: '#8b6914',
    fontFamily: 'inherit',
    fontWeight: 600,
  },
  resetBtn: {
    padding: '6px 14px',
    background: '#fff',
    border: '1px solid rgba(192,57,43,0.3)',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 12,
    color: '#8b0000',
    fontFamily: 'inherit',
    fontWeight: 600,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 14,
  },
  empty: {
    padding: 40,
    textAlign: 'center',
    color: '#a0522d',
    fontStyle: 'italic',
    border: '2px dashed #d4b483',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.4)',
  },
};

export default DanhSachDiaDanh;