import { useState, useEffect, useRef } from 'react';
import { fetchTatCaMonAn } from '../../data/fetchMonAn';
import useDebounce from '../../hooks/useDebounce';

function TimMonAn() {
  const [tuKhoa, setTuKhoa] = useState('');
  const [ketQua, setKetQua] = useState([]);

  // 🆕 DEBOUNCE: trì hoãn từ khóa 300ms
  const tuKhoaDaTre = useDebounce(tuKhoa, 300);

  const inputRef = useRef(null);
  const renderCountRef = useRef(0);
  const soLanGoRef = useRef(0);
  const soLanLocRef = useRef(0);

  renderCountRef.current += 1;

  useEffect(() => {
    console.log('🎯 Auto focus ô tìm kiếm');
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // ⚠️ DEPENDENCY: tuKhoaDaTre (KHÔNG phải tuKhoa)
  useEffect(() => {
    soLanLocRef.current += 1;
    console.log(
      `🔍 [FILTER LẦN ${soLanLocRef.current}] Lọc với từ khóa đã trễ: "${tuKhoaDaTre}"`
    );

    const danhSach = fetchTatCaMonAn();

    if (!tuKhoaDaTre.trim()) {
      setKetQua(danhSach);
      return;
    }

    const kw = tuKhoaDaTre.toLowerCase().trim();
    const loc = danhSach.filter(
      (mon) =>
        mon.ten.toLowerCase().includes(kw) ||
        mon.moTa.toLowerCase().includes(kw) ||
        mon.tags.some((t) => t.toLowerCase().includes(kw))
    );
    setKetQua(loc);
  }, [tuKhoaDaTre]);  // 👈 CHÚ Ý DÒNG NÀY!

  const handleChange = (e) => {
    soLanGoRef.current += 1;
    setTuKhoa(e.target.value);
  };

  const handleXoa = () => {
    setTuKhoa('');
    inputRef.current?.focus();
  };

  const dangChoDebounce = tuKhoa !== tuKhoaDaTre;

  return (
    <div style={styles.wrap}>
      <h2 style={styles.tieuDe}>🔍 Tìm món ăn Huế (Debounced)</h2>

      <div style={styles.searchBox}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={tuKhoa}
          onChange={handleChange}
          placeholder="Nhập tên món, nguyên liệu, tag..."
          style={styles.input}
        />
        {tuKhoa && (
          <button onClick={handleXoa} style={styles.clearBtn}>
            ✕
          </button>
        )}
      </div>

      <div style={styles.debounceStatus}>
        {dangChoDebounce ? (
          <span style={styles.statusWaiting}>
            ⏳ Đang chờ bạn ngừng gõ... (300ms)
          </span>
        ) : (
          <span style={styles.statusReady}>
            ✅ Đã lọc với từ khóa: "<strong>{tuKhoaDaTre || '(trống)'}</strong>"
          </span>
        )}
      </div>

      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>🔄 Số lần render</span>
          <span style={styles.statValue}>{renderCountRef.current}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>⌨️ Số lần gõ phím</span>
          <span style={styles.statValue}>{soLanGoRef.current}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>🔍 Số lần LỌC</span>
          <span
            style={{
              ...styles.statValue,
              color: soLanLocRef.current > 0 ? '#27ae60' : '#8b0000',
            }}
          >
            {soLanLocRef.current}
          </span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>🍜 Kết quả</span>
          <span style={styles.statValue}>{ketQua.length}</span>
        </div>
      </div>

      <div style={styles.tagRow}>
        <span style={styles.tagLabel}>Gợi ý:</span>
        {['Bún', 'Bánh', 'Hến', 'Tôm', 'Chè'].map((tag) => (
          <button
            key={tag}
            onClick={() => setTuKhoa(tag)}
            style={styles.tagBtn}
          >
            {tag}
          </button>
        ))}
      </div>

      <div style={styles.results}>
        {ketQua.length === 0 ? (
          <div style={styles.empty}>
            😔 Không tìm thấy món nào phù hợp với "{tuKhoaDaTre}"
          </div>
        ) : (
          ketQua.map((mon) => (
            <div key={mon.id} style={styles.item}>
              <span style={styles.itemEmoji}>{mon.emoji}</span>
              <div style={styles.itemBody}>
                <div style={styles.itemTen}>
                  {mon.ten}
                  {mon.dacSan && <span style={styles.itemSao}> ⭐</span>}
                </div>
                <div style={styles.itemMoTa}>{mon.moTa}</div>
                <div style={styles.itemTags}>
                  {mon.tags.map((t, i) => (
                    <span key={i} style={styles.itemTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div style={styles.itemGia}>{mon.gia}</div>
            </div>
          ))
        )}
      </div>

      <p style={styles.note}>
        💡 <strong>Thử nghiệm:</strong> Gõ liên tục "Bún Bò Huế" thật nhanh →
        log <code>⏱️</code> hiện nhiều lần, nhưng log <code>🔍 [FILTER]</code>{' '}
        chỉ chạy <strong>1 lần</strong> sau khi ngừng gõ.
      </p>
    </div>
  );
}

const styles = {
  wrap: {
    maxWidth: 900,
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
  },
  tieuDe: {
    fontSize: 28,
    color: '#8b0000',
    textAlign: 'center',
    fontFamily: '"Playfair Display", Georgia, serif',
    marginBottom: 20,
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: 14,
    padding: '4px 4px 4px 44px',
    border: '2px solid rgba(192,57,43,0.2)',
    boxShadow: '0 8px 24px rgba(139,0,0,0.08)',
    transition: 'border-color 0.3s',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    fontSize: 18,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '14px 8px',
    fontSize: 16,
    fontFamily: 'inherit',
    background: 'transparent',
    color: '#333',
  },
  clearBtn: {
    border: 'none',
    background: 'rgba(192,57,43,0.1)',
    color: '#8b0000',
    width: 32,
    height: 32,
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  debounceStatus: {
    marginTop: 10,
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: 13,
    textAlign: 'center',
  },
  statusWaiting: {
    display: 'inline-block',
    color: '#e67e22',
    fontWeight: 600,
  },
  statusReady: {
    display: 'inline-block',
    color: '#27ae60',
    fontWeight: 500,
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 10,
    marginTop: 16,
  },
  statItem: {
    background: 'linear-gradient(135deg, #fffbf0, #fdf2d0)',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid rgba(212,180,131,0.5)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  statLabel: {
    fontSize: 10.5,
    color: '#a0522d',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 700,
  },
  statValue: {
    fontSize: 20,
    color: '#8b0000',
    fontWeight: 700,
    fontFamily: '"Playfair Display", Georgia, serif',
  },
  tagRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tagLabel: {
    fontSize: 13,
    color: '#a0522d',
    fontStyle: 'italic',
    marginRight: 4,
  },
  tagBtn: {
    padding: '6px 14px',
    background: '#fff',
    border: '1px solid rgba(192,57,43,0.25)',
    borderRadius: 20,
    cursor: 'pointer',
    fontSize: 13,
    color: '#8b0000',
    fontFamily: 'inherit',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  results: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  empty: {
    padding: 32,
    textAlign: 'center',
    color: '#a0522d',
    fontStyle: 'italic',
    border: '2px dashed #d4b483',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.4)',
  },
  item: {
    display: 'flex',
    gap: 14,
    padding: '14px 18px',
    background: '#fff',
    borderRadius: 12,
    border: '1px solid rgba(192,57,43,0.1)',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  },
  itemEmoji: { fontSize: 32, flexShrink: 0 },
  itemBody: { flex: 1 },
  itemTen: {
    fontSize: 17,
    fontWeight: 700,
    color: '#8b0000',
    fontFamily: '"Playfair Display", Georgia, serif',
  },
  itemSao: { fontSize: 12 },
  itemMoTa: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 1.5,
  },
  itemTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  itemTag: {
    fontSize: 11,
    padding: '3px 10px',
    background: 'rgba(192,57,43,0.08)',
    color: '#8b0000',
    borderRadius: 12,
    fontWeight: 500,
  },
  itemGia: {
    fontSize: 16,
    fontWeight: 700,
    color: '#c0392b',
    flexShrink: 0,
    fontFamily: '"Playfair Display", Georgia, serif',
  },
  note: {
    marginTop: 24,
    padding: '12px 18px',
    background: 'rgba(243,156,18,0.08)',
    borderRadius: 10,
    fontSize: 13,
    color: '#8b6914',
    lineHeight: 1.6,
    borderLeft: '3px solid #f39c12',
  },
};

export default TimMonAn;