export function translate(strings: TemplateStringsArray, ...keys: (string | number)[]) {
  return function (...values: any[]) {
    const dict = values[0] || {} // incase we pass in an record object
    const result = [strings[0]]
    keys.forEach((key, i) => {
      // @ts-expect-error
      const value = typeof key === 'number' ? values[key] : dict[key]
      result.push(value, strings[i + 1])
    })
    return result.join('')
  }
}

export const textMap = {
  appTitle: {
    long: 'Hệ thống quản lý học tập',
    abbr: 'LMS'
  },
  nouns: {
    phone: 'Điện thoại',
    content: 'Nội dung',
    dashboard: 'Tổng hợp',
    business: 'Kinh doanh',
    learning: 'Học tập',
    management: 'Quản trị',
    setting: 'Cấu hình',
    password: 'Mật khẩu',
    email: 'Email',
    user: 'Người dùng',
    course: 'Khóa học',
    lesson: 'Bài học',
    assignment: 'Bài tập',
    grade: 'Điểm số',
    report: 'Báo cáo',
    notification: 'Thông báo',
    profile: 'Hồ sơ',
    attendance: 'Điểm danh',
    schedule: 'Lịch học',
    student: 'Học viên',
    staff: 'Nhân viên',
    teacher: 'Giảng viên',
    admin: 'Quản lý',
    firstName: 'Họ',
    lastName: 'Tên',
    fullName: 'Họ và tên',
    type: 'Phân loại',
    educationBackground: 'Học vấn',
    highschool: 'Học sinh cấp 3',
    under_graduate: 'Sinh viên',
    graduate: 'Tốt nghiệp đại học'
  },
  validations: {
    required: 'Bắt buộc',
    min: translate`Giá trị tối thiểu là ${'min'}`,
    max: translate`Giá trị tối đa là ${'max'}`,
    email: 'Địa chỉ email không hợp lệ',
    url: 'Địa chỉ URL không hợp lệ',
    date: 'Ngày không hợp lệ',
    dateRange: 'Khoảng ngày không hợp lệ',
    number: 'Số không hợp lệ',
    numeric: 'Chỉ chứa chữ số',
    integer: 'Số nguyên không hợp lệ',
    decimal: 'Số thập phân không hợp lệ',
    alphanum: 'Chỉ chứa chữ cái và số',
    minLength: translate`Tối thiểu ${'minLength'} ký tự`,
    maxLength: translate`Tối đa ${'maxLength'} ký tự`,
    duplicated: translate`${'item'} đã được sử dụng`
  },
  verbs: {
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    submit: 'Gửi',
    cancel: 'Hủy',
    create: 'Tạo',
    update: 'Cập nhật',
    delete: 'Xóa',
    search: 'Tìm kiếm',
    save: 'Lưu',
    edit: 'Chỉnh sửa',
    view: 'Xem',
    enroll: 'Ghi danh',
    complete: 'Hoàn thành',
    start: 'Bắt đầu',
    finish: 'Kết thúc'
  },
  messages: {
    badRequest: 'Thông tin gửi đi không hợp lệ',
    welcome: 'Chào mừng đến với Hệ thống quản lý học tập',
    welcomeBack: translate`Xin chào, ${'name'}. Chào mứng quay trở lại`,
    success: translate`${'action'} thành công`,
    error: 'Có lỗi bất ngờ xảy ra',
    errorLong:
      'Có lỗi bất ngờ xảy ra, vui lòng liên hệ quản trị viên để được hỗ trợ hoặc thử lại sau',
    loading: 'Đang tải...',
    noData: 'Không có dữ liệu',
    unauthorized: 'Không có quyền truy cập',
    forbidden: 'Truy cập bị từ chối',
    forbiddenLong:
      'Bạn không có quyền truy cập địa chỉ này, vui lòng liên hệ quản trị viên để được giúp đỡ',
    notFound: translate`Không tìm thấy ${'item'}`,
    notFoundLong: 'Nội dung bạn tìm kiếm không tồn tại hoặc đã bị xóa',
    pleaseLogin: 'Vui lòng đăng nhập',
    invalidEmailOrPassword: 'Email hoặc mật khẩu không đúng'
  }
}
