import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
  // fire event: children -> parent (props) lấy props của cha.
  // fire event: parent -> children (hook ref của React hoặc emitter của Nodejs)
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUsers('ALL');
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    //data là các state lấy từ con ModalUser thông qua drops
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        // fire event cho bên khác dùng
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    console.log('user date when onclick edit from parent :', user);
    // user từ cha qua onclick edit truyen vao component con
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUserFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //    Các khái niêm cần biết về react bên frontend:
  //   ** Life cycle ( vòng đời).
  //    Run component: ( Trình tự mà react sẽ chạy)
  //   1. Run construct -> init state (tạo các state).
  //   2. Did mount (gọi Api set state trước khi render)
  //   3. Render

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser} // Truyền drops vào Component con và sử dụng bên file con.
        />
        {this.state.isOpenModalEditUser && (
          //chỉ khi nào isOpen===true mới chạy component ModalEditUser để
          // tránh tình trạng bên component con componentDidMount không được
          // do component con đã chạy chung khi vừa mới chạy component cha.
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">MANAGE USER</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => {
                            this.handleEditUser(item);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
