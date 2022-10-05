import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoá phổ biến</span>
            <button className="btn-section">xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div>Cơ xương khớp 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div>Cơ xương khớp 3</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div>Cơ xương khớp 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div>Cơ xương khớp 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div>Cơ xương khớp 6</div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
