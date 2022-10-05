import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Nghe nhạc thư giãn não</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/U9qZjxzCJpg"
              title="Nhạc Giảm Căng Thẳng Nhẹ Nhàng Với Thiên Nhiên Tươi Đẹp 🍀 Chấm dứt lo âu, trầm cảm"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              ✔ Các bạn có thể làm chủ công nghệ, cũng như học được, biết được những kiến thức thực tế dùng tại các công
              ty hiện nay. Sau khi kết thúc khóa học này, mình tin chắc rằng dự án này đủ lớn, đủ thực tế để cho các bạn
              mới ra trường viết vào CV xin việc của mình ^^ ✔ Các bạn hiểu được 1 FullStack Web Developer thì cần chuẩn
              bị những gì. Ở đây, mình không dám chắc 100% các bạn sẽ trở thành Fullstack Developer, nhưng nếu bạn chọn
              Frontend hay Backend thì khóa học này cũng cung cấp cho bạn nhiều điều bổ ích
            </p>
          </div>
        </div>
      </div>
    );
  }
}

// map lấy biến từ Redux
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

// map đường dẫn cho props vào file này để dùng,
// do các props của React khác với Redux nên phải map và dispatch lại,
// không giống như props truyền từ cha sang con trong React.
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
