# BẢNG TEST CASE — BÀI 7 (Quản lý sự kiện trong React)

**Ngày kiểm thử:** ___/___/______
**Người kiểm thử:** [Họ tên bạn]
**Nhánh Git:** feature/Bài7-su-kien

---

## PHẦN A — 13 TEST CASE CHÍNH

| # | Test case | Thao tác | Kết quả mong đợi | Kết quả thực tế | Pass/Fail |
|---|---|---|---|---|---|
| 1 | Nút đếm hoạt động | Bấm nút "Bấm tôi đi!" 1 lần | Số lần bấm = 1, nhật ký ghi "type=click" | | |
| 2 | Nhật ký giới hạn 5 dòng | Bấm nút liên tục 7 lần | Nhật ký chỉ giữ 5 dòng mới nhất (#7 → #3) | | |
| 3 | Đọc e.target vs e.currentTarget | Bấm vào chữ "Đại Nội Huế" | Nhật ký ghi `target=SPAN \| currentTarget=DIV` | | |
| 4 | Chọn 1 địa danh | Tick "Đại Nội Huế" trong Lab 2 | Đã chọn: 1, lộ trình hiện "Đại Nội Huế" | | |
| 5 | Bộ lọc loại | Bấm nút lọc "Chùa" | Hiện thị 1 thẻ (Chùa Thiên Mụ) | | |
| 6 | Chọn tất cả (chống trùng) | Bấm "Chọn tất cả đang hiện" 2 lần liên tiếp | Số đã chọn KHÔNG tăng thêm ở lần 2 | | |
| 7 | stopPropagation nút con | Bấm nút "Yêu thích" trong Lab 3 | Nút đổi "❤️ Đã thích", KHÔNG mở mô tả | | |
| 8 | onClickCapture đếm mọi bấm | Bấm nút "Chia sẻ" (đã stopPropagation) | "Số tương tác" vẫn tăng 1 | | |
| 9 | Bug "+3 sai" tăng 1 | Bấm nút "Bấm SAI (+3)" 1 lần | Lượt thích tăng đúng 1 (không phải 3) | | |
| 10 | Bug "+3 đúng" tăng 3 | Bấm nút "Bấm ĐÚNG (+3)" 1 lần | Lượt thích tăng đúng 3 | | |
| 11 | Form không reload | Gõ "bún" rồi bấm Enter trong Lab 4 | Trang KHÔNG reload, lọc còn "Bún bò Huế" | | |
| 12 | isComposing tiếng Việt | Bật Telex, gõ "bun" rồi "s" thành "bún" | Chữ hiện "bún", không mất dấu | | |
| 13 | Kéo thả + phím Alt | Kéo "Bún bò" xuống vị trí 3 (hoặc Alt+↓) | Thứ tự đổi, thông báo aria-live hiện | | |

---

## PHẦN B — TỔNG KẾT

- **Tổng số test case:** 13
- **Pass:** ___ / 13
- **Fail:** ___ / 13
- **Tỉ lệ:** ____%

### Test case FAIL (nếu có):
- #___ : [mô tả lỗi]
- #___ : [mô tả lỗi]

### Ghi chú:
- [Ghi chú thêm về môi trường test: trình duyệt, hệ điều hành, bộ gõ...]