export const languages = {
    vi: "Tiếng Việt",
};

export const defaultLang = "vi";
export const currentYear = new Date().getFullYear();

export const sloganVariations = ["Fight!", "ガンバレ!", "尽你所能!"];

export const ui = {
    vi: {
        "navbar.about": "Giới Thiệu",
        "navbar.signin": "Đăng Nhập",

        "footer.copyright": `© ${currentYear} Folks.`,
        "footer.privacy": "Quyền Riêng Tư",
        "footer.terms": "Điều Khoản",
        "footer.slogan": "Vững Tài Chính, Chắc Tương Lai",
        "footer.contact.facebook": "Trang Facebook của nhóm Folks",
        "footer.contact.github": "Trang mã nguồn Github của Rainboot",
        "footer.contact.email": "Email liên lạc của nhóm Folks",
        "footer.contact.phone": "Số điện thoại liên lạc của trưởng nhóm nhóm Folks",

        "about.folks.slogan": "Cố lên!",
        "about.folks.title": "FOLKS",
        "about.folks.description": "Chào mừng bạn đến với trang web của nhóm Folks! Chúng tôi là một nhóm đồng chí đầy tình thương mến, đầy đầy đam mê và nhiệt huyết, cùng nhau chung tay tạo ra những giải pháp sáng tạo để giúp sinh viên tiết kiệm tiền một cách hiệu quả. Với sự đa dạng về kỹ năng và nền tảng học vấn, mỗi thành viên trong nhóm chúng tôi đều đóng góp những giá trị riêng biệt, tạo nên một đội ngũ mạnh mẽ và gắn kết.",
        "about.folks.subtitle": "Chúng tôi là nhóm Folks - người bạn đồng hành của sinh viên trên con đường tiết kiệm và quản lý tài chính",
        "about.project.name": "Ready for a Rainy Day",
        "about.project.slogan": "Vững Tài Chính, Chắc Tương Lai!",
        "about.project.cause": "RainBoot là một trang web là giúp các bạn sinh viên quản lý tài chính cá nhân một cách thông minh và hiệu quả hơn. Chúng tôi hiểu rằng việc tiết kiệm tiền trong thời gian học đại học là một thách thức không nhỏ. Do đó, chúng tôi đã phát triển một dự án đặc biệt này nhằm cung cấp các công cụ và tài nguyên hỗ trợ sinh viên trong việc quản lý và tối ưu hóa chi tiêu",
        "about.project.goal": "Tại Rainboot, chúng tôi tin rằng việc tiết kiệm tiền là một kỹ năng quan trọng mà mọi sinh viên cần phải học và phát triển. Mục tiêu của chúng tôi là cung cấp cho các bạn những công cụ và kiến thức cần thiết để quản lý tài chính một cách thông minh, từ việc lập kế hoạch ngân sách đến việc đầu tư và tiết kiệm cho tương lai, đồng thời trang bị cho các bạn các kiến thức cần thiết để có thể kiểm soát được nguồn tài chính của bản thân.",
        "about.members.title": "Thành Viên",
        "about.member.avatar.alt": "Ảnh đại diện của",

        "signin.title": "Đăng Nhập",
        "signin.header.title": "Chào mừng trở lại",
        "signin.header.subtitle": "Đăng nhập vào tài khoản của bạn",
        "signin.email": "Email",
        "signin.email.placeholder": "nguyenvana@example.com",
        "signin.password": "Mật khẩu",
        "signin.password.placeholder": "Mật khẩu",
        "signin.error": "Thông tin đăng nhập không chính xác.",
        "signin.login-button.text": "Đăng Nhập",
        "signin.login-button.hint": "Đăng nhập vào tài khoản chi tiêu",
        "signin.legal.by-continuing": "Bằng việc tiếp tục, bạn đồng ý với",
        "signin.legal.of-rainboot": "của Rainboot.",

        "dashboard.nav.home": "Trang Chủ",
        "dashboard.nav.transactions": "Giao Dịch",
        "dashboard.nav.accounts": "Tài Khoản",
        "dashboard.nav.categories": "Danh Mục",
        "dashboard.nav.savings": "Tiết Kiệm",
        "dashboard.nav.help": "Trợ Giúp",
        "dashboard.nav.settings": "Cài Đặt",
        "dashboard.nav.signout": "Đăng Xuất",

        "dashboard.search.placeholder": "Tìm kiếm giao dịch",
        "dashboard.search.mobile-button": "Tìm kiếm",
        "dashboard.search.mobile-cancel": "Hủy",
        "dashboard.sidebar.close": "Đóng thanh công cụ",

        "dashboard.home.total": "Tổng tài sản",
        "dashboard.home.income": "Tổng thu nhập",
        "dashboard.home.expense": "Tổng chi tiêu",
        "dashboard.home.saving": "Mục tiêu tiết kiệm",
        "dashboard.home.recent-transactions": "Giao dịch gần đây",
        "dashboard.home.spending-categories": "Chi tiêu theo danh mục",

        "dashboard.see-more": "Xem thêm",
        "dashboard.create": "Tạo Mới",
        "dashboard.edit": "Chỉnh Sửa",
        "dashboard.word.income": "Thu Nhập",
        "dashboard.word.expense": "Chi Tiêu",

        "dashboard.select.account": "Lựa chọn tài khoản",
        "dashboard.select.category": "Lựa chọn danh mục",
        "dashboard.info.transaction": "Thông tin giao dịch",
        "dashboard.info.account": "Thông tin tài khoản",

        "dashboard.new.transaction": "Tạo giao dịch mới",
        "dashboard.new.transaction.name": "Tên giao dịch",
        "dashboard.new.transaction.value": "Giá trị",
        "dashboard.new.transaction.description": "Mô tả",

        "dashboard.new.account": "Tạo tài khoản mới",
        "dashboard.new.account.name": "Tên tài khoản",
        "dashboard.new.account.balance": "Số tiền",
        "dashboard.new.account.is-saving": "Là sổ tiết kiệm",
        "dashboard.new.account.set-default": "Đặt làm tài khoản mặc định",

        "dashboard.edit.transaction": "Chỉnh sửa giao dịch",
        "dashboard.edit.account": "Chỉnh sửa tài khoản",

        "error.return": "Trang Chủ",
        "error.report": "Báo Lỗi",
        "error.404.title": "Vỡ Nợ :<",
        "error.404.subtitle": "Nội dung bạn đang tìm kiếm hiện không tồn tại.",

        "error.500.title": "Phá Sản >:(",
        "error.500.subtitle": "Trang web của chúng tôi hiện đang gặp phải một số vấn đề kỹ thuật. Mong bạn thông cảm.",

        "oauth.google": "Đăng nhập với Google",
        "oauth.facebook": "Đăng nhập với Facebook",

        "legal.last-updated": "Cập nhật lần cuối:",
        "privacy": "Chính Sách Quyền Riêng Tư",
        "terms": "Điều Khoản Sử Dụng",
    },
}
