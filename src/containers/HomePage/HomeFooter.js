import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; 2022 by Mr.Fermion. More information, please visit my channel
          <a target="_blank" href="https://www.youtube.com/watch?v=qxJK-2YBGMU">
            {' '}
            &#8594; Click here &#8592;
          </a>
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
