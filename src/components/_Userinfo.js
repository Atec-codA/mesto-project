export class UserInfo {
  constructor(id, name, job, avatar) {
    this._id = id;
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo() { 
    this.id = this._id.id;
    this.name = this._name.textContent; 
    this.job = this._job.textContent; 
    this.avatar = this._avatar.src; 
  
    return this;
  }
    
  setUserInfo(data) {
    this._id.id = data._id;
    this._name.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}