// Dữ liệu khóa học từ file JSON
import coursesData from './courses.json';
import usersData from './users.json';

// Export dữ liệu để sử dụng ở các trang
export const courses = coursesData.courses;
export const stats = coursesData.stats;
export const users = usersData.users;
export const recentActivities = usersData.recentActivities;
