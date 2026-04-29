---
name: coursehub-rules
description: Core architectural rules and guidelines for the CourseHub frontend project. Use this skill automatically whenever generating new React components, pages, or refactoring code to ensure project consistency.
---

# CourseHub Frontend Architecture Rules

Khi làm việc với dự án này, bạn PHẢI tuân thủ nghiêm ngặt các quy tắc sau:

## Tổng quan quy tắc

| # | Quy tắc | Mô tả |
|---|---------|-------|
| 1 | **Framework** | React SPA + Vite (KHÔNG dùng Next.js) |
| 2 | **Routing** | react-router-dom |
| 3 | **Styling** | Tailwind CSS thuần túy |
| 4 | **Icons** | lucide-react |
| 5 | **State** | localStorage (fakeSession, wishlist, progress) |
| 6 | **Language** | Tiếng Việt cho tất cả UI text |
| 7 | **Notifications** | Toast system (KHÔNG dùng alert()) |
| 8 | **Responsive** | Mobile-first, horizontal scroll cho tables |

## Quick checklist trước khi commit code

- [ ] Không import bất kỳ thứ gì từ Next.js
- [ ] Sử dụng `<Link>` từ react-router-dom thay vì `<a>`
- [ ] Tất cả text hiển thị bằng tiếng Việt
- [ ] Import icons từ lucide-react
- [ ] Dùng Toast thay vì alert()
- [ ] Responsive layout cho mobile

## Additional resources

- Chi tiết từng quy tắc: [reference.md](reference.md)
- Ví dụ code patterns: [examples.md](examples.md)
- Checklist trước deploy: [checklist.md](checklist.md)